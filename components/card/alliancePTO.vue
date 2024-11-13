<script setup>

import { globalState, captainSkillNumbers, reputationSlotURLs } from '../../states/global.js';

const gs = globalState;

const scribbleImg = '/img/scribble';

const setState = (key, value) => {
  gs[key] = value;
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

const scribbleImageURL = '/img/scribble.svg';

</script>

<template>
  <div class="card-container">
    <!-- Black circle with grey border -->
    <div class="circle" />

    <!-- Name Input Section -->
    <div class="name-input-section">
      <div class="name-label">
        <p>captain<br>name</p>
      </div>
      <input type="text" class="name-input">
      <div class="name-end grey-box" />
    </div>

    <!-- Rows as a table -->
    <table class="rows-table skill-table">
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
        <td v-for="(num, index) in captainSkillNumbers" @click="setState('captainSkill', index)" :class="[
            'clickable',
            typeof num === 'object' ? 'underscored' : '',
            num === 9 ? 'orange-box' : ''
            ]">
          <div v-if="index < gs.captainSkill"><img :src="scribbleImageURL" /></div>
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
    </table>
    <table class="rows-table reputation-table">
      <tr>
        <td class="crew-blue">
          <img src="/img/upgrade_crew_transparent.png">
        </td>
        <td v-for="(item,i) in Array(11)" :class="[i === 10 ? 'crew-blue' : '', 'clickable']"
          @click="setState('crewReputation', i)">
          <div v-if="i < gs.crewReputation"><img :src="scribbleImageURL" /></div>
          <div v-else>{{ i }}</div>
        </td>
      </tr>
      <tr>
        <td class="weapon-red">
          <img src="/img/upgrade_weapon_transparent.png">
        </td>
        <td v-for="(item,i) in Array(11)" :class="[i === 10 ? 'weapon-red' : '', 'clickable']"
          @click="setState('weaponReputation', i)">
          <div v-if="i < gs.weaponReputation"><img :src="scribbleImageURL" /></div>
          <div v-else>{{ i }}</div>
        </td>
      </tr>
      <tr>
        <td class="tech-purple">
          <img src="/img/upgrade_tech_transparent.png">
        </td>
        <td v-for="(item,i) in Array(11)" :class="[i === 10 ? 'tech-purple' : '', 'clickable']"
          @click="setState('techReputation', i)">
          <div v-if="i < gs.techReputation"><img :src="scribbleImageURL" /></div>
          <div v-else>{{ i }}</div>
        </td>
      </tr>
    </table>
  </div>
</template>