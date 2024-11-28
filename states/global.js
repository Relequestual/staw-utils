import { reactive, computed } from 'vue';

const globalState = reactive({
  captainName: '',
  talentSlots: {
    a: false,
    b: false,
    c: false,
    e: false,
    f: false,
    g: false,
  },
  // This number stores 6 boolean values. Check the bit at the index to find the boolean value.
  reputationSlots: 0,
  captainSkill: [].fill(false, 0, 14),
  crewReputation: [].fill(false, 0, 10),
  weaponReputation: [].fill(false, 0, 10),
  techReputation: [].fill(false, 0, 10),
});

const xpSpent = computed(() => {
  return globalState.captainSkill
    .concat(globalState.crewReputation)
    .concat(globalState.weaponReputation)
    .concat(globalState.techReputation)
    .filter((value) => value === true).length;
});

const captainSkillNumbers = [
  2,
  2,
  { 3: 1 },
  3,
  4,
  4,
  5,
  5,
  6,
  { 6: 1 },
  7,
  7,
  8,
  8,
  9,
];

export { globalState, captainSkillNumbers, xpSpent };
