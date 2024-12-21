<script setup>

import { useRouter, useRoute } from 'vue-router'
import { globalState, captainSkillNumbers, xpSpent } from '#states/global.js';
import { generateDataURL, decodeURLData } from '#utils/compressor.js';

const config = useRuntimeConfig();

const router = useRouter()
const route = useRoute()

var gs = globalState;

const baseURL = config.app.baseURL;
const scribbleImageURL = `${baseURL}img/scribble.svg`;

const props = defineProps({
  hash: String
});

watch(
  () => gs,
  (oldGState, newGState) => {
    const hash = generateDataURL(newGState);
    router.replace({ hash: `#${hash}` });
  },
  { deep: true },
);

onBeforeMount(() => {
  const hashPart = route.hash.substring(1)
  if (hashPart != '') {

    const decoded = decodeURLData(hashPart);
    const loadedState = JSON.parse(decoded);
    Object.assign(gs, loadedState);
  }
});

const reputationImageURL = (type) =>
  `${baseURL}img/upgrade_${type}_transparent.png`;

const reputationSlotURLs = ['crew', 'weapon', 'tech'].reduce(
  (acc, cur) => Object.assign(acc, { [cur]: reputationImageURL(cur) }),
  {},
);

const toggleState = (type, index) => {
  if (type === 'captainSkill') {
    if (index === 14) {
      return;
    }
  } else { // All the others are the same
    if (index === 10) {
      return;
    }
  }
  gs[type][index] = !(gs[type].at(index));
};

const setTalentState = (slot, value) => {
  gs.talentSlots[slot] = value;
};

// Get the value of a specific boolean
const getReputationSlot = (index) => {
  return (gs.reputationSlots & (1 << index)) !== 0;
};

// Set the value of a specific boolean
const setReputationSlot = (index, value) => {
  if (value) {
    gs.reputationSlots |= (1 << index);
  } else {
    gs.reputationSlots &= ~(1 << index);
  }
};

const hasRepSlotA = computed(() => {
  // Create a mask with the first 3 bits set to 1
  const mask = 0b111;
  return (gs.reputationSlots & mask) !== 0;
});

const hasRepSlotB = computed(() => {
  // Create a mask with the last 3 bits set to 1
  const mask = 0b111000;
  return (gs.reputationSlots & mask) !== 0;
});

</script>

<template>
  <div class="card-container">
    <!-- Black circle with grey border -->
    <div class="fed-circle" :style="{'background-image': `url(${baseURL}img/faction-federation.png)`}" />

    <!-- Name Input Section -->
    <div class="name-input-section">
      <div class="name-label">
        <p>captain<br>name</p>
      </div>
      <input type="text" class="name-input" v-model="gs.captainName">
      <div class="name-label xp">
        <p>XP<br>spent</p>
      </div>
      <div class="name-end grey-box">
        <p>{{ xpSpent }}</p>
      </div>
    </div>

    <!-- Rows as a table -->
    <table class="rows-table skill-table">
      <tbody>
        <!-- Top row -->
        <tr>
          <td class="orange-box skill-text" rowspan="4">skill</td>
          <td class="clickable" @click="setTalentState('a', !gs.talentSlots.a)">
            <div v-if="gs.talentSlots.a"><img :src="scribbleImageURL" /></div>
          </td>
          <td class="orange-box talent-slot" colspan="3"><span>+</span><img
              src="/img/upgrade_elite_talent_transparent.png">
          </td>
          <td v-for="alpha in ['b','c']" class="clickable" @click="setTalentState(alpha, !gs.talentSlots[alpha])">
            <div v-if="gs.talentSlots[alpha]"><img :src="scribbleImageURL" /></div>
          </td>
          <td class="orange-box talent-slot" colspan="4"><span>+</span><img
              src="/img/upgrade_elite_talent_transparent.png">
          </td>
          <td v-for="alpha in ['d','e', 'f']" class="clickable" @click="setTalentState(alpha, !gs.talentSlots[alpha])">
            <div v-if="gs.talentSlots[alpha]"><img :src="scribbleImageURL" /></div>
          </td>
          <td class="orange-box talent-slot" colspan="2"><span>+</span><img
              src="/img/upgrade_elite_talent_transparent.png">
          </td>
        </tr>

        <!-- Middle row -->
        <tr>
          <td v-for="(num, index) in captainSkillNumbers" @click="toggleState('captainSkill', index)" :class="[
            'clickable',
            typeof num === 'object' ? 'underscored' : '',
            num === 9 ? 'orange-box' : ''
            ]">
            <div v-if="gs.captainSkill[index] === true"><img :src="scribbleImageURL" /></div>
            <div v-else>{{ typeof num === 'object' ? Object.keys(num)[0] : num }}</div>
          </td>
        </tr>

        <!-- Bottom row -->
        <tr class="reputationSlots">
          <td class="grey-box" />
          <td v-if="reputationSlotURLs" colspan="6">
            + <div v-for="(value, key, index) in reputationSlotURLs">
              <img class="clickable" :src="getReputationSlot(index) ? scribbleImageURL : value"
                @click="setReputationSlot(index,!getReputationSlot(index))" />
              {{ index === 2 ? "" : "/"}}
            </div>

          </td>
          <td class="grey-box" />
          <td v-if="reputationSlotURLs" colspan="6">
            + <div v-for="(value, key, index) in reputationSlotURLs">
              <img class="clickable" :src="getReputationSlot(index+3) ? scribbleImageURL : value"
                @click="setReputationSlot(index+3,!getReputationSlot(index+3))" />
              {{ index === 2 ? "" : "/"}}
            </div>

          </td>
          <td class="grey-box" />
        </tr>
        <tr class="orange-line">
          <td colspan="15" />
        </tr>
      </tbody>
    </table>
    <table class="rows-table reputation-table">
      <tbody>
        <tr>
          <td class="crew-blue">
            <img src="/img/upgrade_crew_transparent.png">
          </td>
          <td v-for="(item,i) in Array(11)" :class="[i === 10 ? 'crew-blue' : '', 'clickable']"
            @click="toggleState('crewReputation', i)">
            <div v-if="gs.crewReputation[i] === true"><img :src="scribbleImageURL" /></div>
            <div v-else>{{ i }}</div>
          </td>
        </tr>
        <tr>
          <td class="weapon-red">
            <img src="/img/upgrade_weapon_transparent.png">
          </td>
          <td v-for="(item,i) in Array(11)" :class="[i === 10 ? 'weapon-red' : '', 'clickable']"
            @click="toggleState('weaponReputation', i)">
            <div v-if="gs.weaponReputation[i] === true"><img :src="scribbleImageURL" /></div>
            <div v-else>{{ i }}</div>
          </td>
        </tr>
        <tr>
          <td class="tech-purple">
            <img src="/img/upgrade_tech_transparent.png">
          </td>
          <td v-for="(item,i) in Array(11)" :class="[i === 10 ? 'tech-purple' : '', 'clickable']"
            @click="toggleState('techReputation', i)">
            <div v-if="gs.techReputation[i] === true"><img :src="scribbleImageURL" /></div>
            <div v-else>{{ i }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>