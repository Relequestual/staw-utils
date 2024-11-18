import { reactive } from 'vue';

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
  captainSkill: 0,
  // This number stores 6 boolean values. Check the bit at the index to find the boolean value.
  reputationSlots: 0,
  crewReputation: 0,
  weaponReputation: 0,
  techReputation: 0,
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

export { globalState, captainSkillNumbers };
