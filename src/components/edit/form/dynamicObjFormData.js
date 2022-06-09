import * as C from "../../../data/constants/dataDictionaryConstants";

export const INPUT_TYPE = {
  TEXT: 0,
  TEXTAREA: 1,
  CHECKBOX: 2,
  NUMBER: 3,
  SELECT: 4,
  ICON: 5,
};

export const itemFormData = {
  item_id: false,
  name: { label: "Name", type: INPUT_TYPE.TEXT },
  description: { label: "Description", type: INPUT_TYPE.TEXTAREA },
  item_type_const_value: {
    label: "Item Type",
    type: INPUT_TYPE.SELECT,
    dataDictionary: C.ITEM_TYPE,
  },
  is_magical: { label: "Magical?", type: INPUT_TYPE.CHECKBOX },
  cost: { label: "Cost (gp)", type: INPUT_TYPE.NUMBER, min: 0 },
  hp: { label: "Hit Points", type: INPUT_TYPE.NUMBER, min: 0 },
  hardness: { label: "Hardness", type: INPUT_TYPE.NUMBER, min: 0 },
  is_shoddy: { label: "Shoddy?", type: INPUT_TYPE.CHECKBOX },
  bulk: { label: "Bulk", type: INPUT_TYPE.NUMBER, min: 0 },
  req_hands_const_value: {
    label: "Num. Hands",
    type: INPUT_TYPE.SELECT,
    dataDictionary: C.REQ_HANDS_TYPE,
  },
  size_const_value: {
    label: "Size",
    type: INPUT_TYPE.SELECT,
    dataDictionary: C.SIZE_TYPE,
  },
  icon: { label: "Icon", type: INPUT_TYPE.ICON },
};
