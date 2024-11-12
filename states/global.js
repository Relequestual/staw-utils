import { reactive } from 'vue';

export const globalState = reactive({
  captainName: '',
  talentSlots: 0,
  captainXP: 0,
  // This number stores 6 boolean values. Check the bit at the index to find the boolean value.
  reputationSlots: 0,
  crewReputation: 0,
  weaponReputation: 0,
  techReputation: 0,
});
