<script setup>

import { globalState } from '../../states/global.js';

const gs = globalState;

const scribbleImg = '/img/scribble';

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
        <td />
        <td class="orange-box talent-slot" colspan="3"><span>+</span><img
            src="/img/upgrade_elite_talent_transparent.png">
        </td>
        <td />
        <td />
        <td class="orange-box talent-slot" colspan="4"><span>+</span><img
            src="/img/upgrade_elite_talent_transparent.png">
        </td>
        <td />
        <td />
        <td />
        <td class="orange-box talent-slot" colspan="2"><span>+</span><img
            src="/img/upgrade_elite_talent_transparent.png">
        </td>
      </tr>

      <!-- Middle row -->
      <tr>
        <td>2</td>
        <td>2</td>
        <td class="underscored">3</td>
        <td>3</td>
        <td>4</td>
        <td>4</td>
        <td>5</td>
        <td>5</td>
        <td>6</td>
        <td class="underscored">6</td>
        <td>7</td>
        <td>7</td>
        <td>8</td>
        <td>8</td>
        <td class="orange-box">9</td>
      </tr>

      <!-- Bottom row -->
      <tr>
        <td class="grey-box" />
        <td colspan="6">
          + <img v-if="!hasRepSlotA && !getReputationSlot(0)" @click="setReputationSlot(0,!getReputationSlot(0))"
            src="/img/upgrade_crew_transparent.png">
          <img v-else @click="setReputationSlot(0,!getReputationSlot(0))" src="/img/scribble.svg">/
          <img src="/img/upgrade_weapon_transparent.png">/
          <img src="/img/upgrade_tech_transparent.png">
        </td>
        <td class="grey-box" />
        <td colspan="6">
          + <img src="/img/upgrade_crew_transparent.png">/
          <img src="/img/upgrade_weapon_transparent.png">/
          <img src="/img/upgrade_tech_transparent.png">
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
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td class="crew-blue">10</td>
      </tr>
      <tr>
        <td class="weapon-red">
          <img src="/img/upgrade_weapon_transparent.png">
        </td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td class="weapon-red">10</td>
      </tr>
      <tr>
        <td class="tech-purple">
          <img src="/img/upgrade_tech_transparent.png">
        </td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td class="tech-purple">10</td>
      </tr>
    </table>
  </div>
</template>