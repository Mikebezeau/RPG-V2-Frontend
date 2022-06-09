//import { Sprite } from "../classes/sprite";

export class Character {
  constructor(char) {
    Object.assign(this, char);
    this.attributes = [];
  }

  getAttribute = (attributeId) => {
    let total = 10;
    this.character_attribute_boosts.forEach(
      (attributeBoost) =>
        (total += attributeBoost.attribute_id === attributeId ? 2 : 0)
    );
    return total;
  };

  //skill
  getSkillRank = (skillId) => {
    const result = this.character_skills.find(
      (skill) => skill.skill_id === skillId
    );
    if (result) return result.skill_rank;
    return 0;
  };

  //calculate HP
  getHp = () => {
    const hp =
      this.heritage.ancestry.ancestry_hp + this.class.hp_per_level * this.level; // + getAttributeBonus(this);
    return hp;
  };
}
