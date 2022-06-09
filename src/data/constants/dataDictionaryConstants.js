//FORMS

export const INPUT_TYPE = {
  TEXT: 0,
  TEXTAREA: 1,
  CHECKBOX: 2,
  NUMBER: 3,
  SELECT: 4,
  ICON: 5,
};

// UNIVERSAL

export const CHARACTER_TYPE = {
  PLAYER: 0,
  NPC: 1,
  MONSTER: 2,
};

//ACTIONS

export const ACTION_VALUE = {
  none: 0,
  free: 1,
  reaction: 2,
  single: 3,
  double: 4,
  triple: 5,
  stride: 6,
  strike: 7,
};
export const ACTION_TYPE = {
  [ACTION_VALUE.none]: { name: "None", value: 0 },
  [ACTION_VALUE.free]: { name: "Free", value: 1 },
  [ACTION_VALUE.reaction]: { name: "Reaction", value: 2 },
  [ACTION_VALUE.single]: { name: "Single", value: 3 },
  [ACTION_VALUE.double]: { name: "Double", value: 4 },
  [ACTION_VALUE.triple]: { name: "Triple", value: 5 },
  [ACTION_VALUE.stride]: { name: "Stride", value: 6 },
  [ACTION_VALUE.strike]: { name: "Strike", value: 7 },
};

//PROFICIENCY
export const PROFICIENCY = {
  0: { name: "Untrained", value: 0 },
  1: { name: "Trained", value: 2 },
  2: { name: "Expert", value: 4 },
  3: { name: "Master", value: 6 },
  4: { name: "Legendary", value: 8 },
};

//size_const
export const SIZE_VALUE = {
  none: 0,
  tiny: 1,
  small: 2,
  medium: 3,
  large: 4,
  huge: 5,
  gargantuan: 6,
};

export const SIZE_TYPE = {
  0: { name: "n/a", value: SIZE_VALUE.none, spaceReach: 0 },
  1: { name: "Tiny", value: SIZE_VALUE.tiny, spaceReach: 5 },
  2: { name: "Small", value: SIZE_VALUE.small, spaceReach: 5 },
  3: { name: "Medium", value: SIZE_VALUE.medium, spaceReach: 5 },
  4: { name: "Large", value: SIZE_VALUE.large, spaceReach: 10 },
  5: { name: "Huge", value: SIZE_VALUE.huge, spaceReach: 15 },
  6: { name: "Gargantuan", value: SIZE_VALUE.gargantuan, spaceReach: 30 },
};

// ATTRIBUTE

export const ATTRIBUTE_ID = {
  str: 1,
  dex: 2,
  con: 3,
  int: 4,
  wiz: 5,
  cha: 6,
};
export const ATTRIBUTE_TYPE = {
  [ATTRIBUTE_ID.str]: {
    id: ATTRIBUTE_ID.str,
    name: "Strength",
    shortName: "STR",
  },
  [ATTRIBUTE_ID.dex]: {
    id: ATTRIBUTE_ID.dex,
    name: "Dexterity",
    shortName: "DEX",
  },
  [ATTRIBUTE_ID.con]: {
    id: ATTRIBUTE_ID.con,
    name: "Constitution",
    shortName: "CON",
  },
  [ATTRIBUTE_ID.int]: {
    id: ATTRIBUTE_ID.int,
    name: "Intelligence",
    shortName: "INT",
  },
  [ATTRIBUTE_ID.wiz]: {
    id: ATTRIBUTE_ID.wiz,
    name: "Wizdom",
    shortName: "WIZ",
  },
  [ATTRIBUTE_ID.cha]: {
    id: ATTRIBUTE_ID.cha,
    name: "Charisma",
    shortName: "CHA",
  },
};
export const ATTRIBUTE_BOOST_TYPE = {
  free_ancestry: 1,
  free_background: 2,
  background: 3,
  class_optional: 4,
  level: 5,
};

// FEAT

//	feat_req_type_const_value
export const FEAT_REQ_VALUE = {
  attribute: 1,
  feat: 2,
  skill: 3,
  trait: 4,
  perception: 5,
  ability: 6,
};
export const FEAT_REQ_TYPE = {
  0: "n/a",
  [FEAT_REQ_VALUE.attribute]: "Attribute",
  [FEAT_REQ_VALUE.feat]: "Feat",
  [FEAT_REQ_VALUE.skill]: "Skill",
  [FEAT_REQ_VALUE.trait]: "Trait",
  [FEAT_REQ_VALUE.perception]: "Perception",
  [FEAT_REQ_VALUE.ability]: "Ability",
};

// ITEM
//item_type_const_value
export const ITEM_TYPE_VALUE = {
  none: 0,
  weapon: 1,
  armor: 2,
  equipment: 3,
  ammo: 4,
  story: 5,
  other: 6,
};

export const ITEM_TYPE = {
  0: { name: "none", value: ITEM_TYPE_VALUE.none },
  1: { name: "Weapon", value: ITEM_TYPE_VALUE.weapon },
  2: { name: "Armor", value: ITEM_TYPE_VALUE.armor },
  3: { name: "Equipment", value: ITEM_TYPE_VALUE.equipment },
  4: { name: "Ammo", value: ITEM_TYPE_VALUE.ammo },
  5: { name: "Story", value: ITEM_TYPE_VALUE.story },
  6: { name: "Other", value: ITEM_TYPE_VALUE.other },
};

//req_hands_const_value
export const REQ_HANDS_VALUE = {
  none: 0,
  one: 1,
  onep: 2,
  two: 3,
};

export const REQ_HANDS_TYPE = {
  0: { name: "none", value: REQ_HANDS_VALUE.none },
  1: { name: "One", value: REQ_HANDS_VALUE.one },
  2: { name: "One+", value: REQ_HANDS_VALUE.onep },
  3: { name: "Two", value: REQ_HANDS_VALUE.two },
};
//size_const_value: universal

//ITEM ARMOR

/*
armor_category_const_value
1   Unarmored
2   Light
3   Medium
4   Heavy
5   Shield

armor_group_const_value
1   Cloth
2   Leather
3   Chain
4   Composite
5   Plate


*/
