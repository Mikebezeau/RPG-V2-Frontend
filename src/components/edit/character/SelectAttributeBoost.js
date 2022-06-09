import {
  ATTRIBUTE_TYPE,
  ATTRIBUTE_BOOST_TYPE,
} from "../../../data/constants/dataDictionaryConstants";

export const SelectAttributeBoost = (props) => {
  let attributeList = [
    { id: 1, disable: 0 },
    { id: 2, disable: 0 },
    { id: 3, disable: 0 },
    { id: 4, disable: 0 },
    { id: 5, disable: 0 },
    { id: 6, disable: 0 },
  ];
  if (props.attribute_list) {
    attributeList = props.attribute_list.map((attribute) => {
      return { id: attribute.attribute_id, disable: 0 };
    });
  }
  //list of character selected boosts for this level, to give values
  const boosts = props.character.character_attribute_boosts.filter(
    (boost) =>
      boost.boost_type_const_value === props.boost_type_const_value &&
      boost.level === props.level
  );

  //disable options that have already een selected by other boosts for this level/category
  //don't forget to include ancestry boosts (ignore flaws) if selecting ancestry free boost
  let selectedBoosts = boosts;

  if (props.boost_type_const_value === ATTRIBUTE_BOOST_TYPE.free_ancestry)
    selectedBoosts = selectedBoosts.concat(
      props.character.ancestry.ancestry_attribute_boost_flaws.filter(
        (boost) => !boost.is_flaw
      )
    );

  //different for background boosts
  if (
    props.boost_type_const_value === ATTRIBUTE_BOOST_TYPE.background ||
    props.boost_type_const_value === ATTRIBUTE_BOOST_TYPE.free_background
  )
    selectedBoosts = props.character.character_attribute_boosts.filter(
      (boost) =>
        boost.boost_type_const_value === ATTRIBUTE_BOOST_TYPE.background ||
        boost.boost_type_const_value === ATTRIBUTE_BOOST_TYPE.free_background
    );

  attributeList = attributeList.map((attribute) => {
    if (selectedBoosts.find((boost) => boost.attribute_id === attribute.id))
      attribute.disable = 1;
    return attribute;
  });

  //repeat given number of times
  const boostSelect = [...Array(props.num_boosts)].map((el, i) => {
    //find value of selected boost based on element index
    const attibuteId = boosts[i] ? boosts[i].attribute_id : 0;
    return (
      <select
        key={i}
        className="attribute-boost"
        onChange={props.handleChange}
        data-boost_type_const_value={props.boost_type_const_value}
        data-level={props.level}
        value={attibuteId}
        disabled={attributeList.length === 1 ? 1 : 0}
      >
        <option value={0}>Select Boost</option>
        {attributeList.map((attribute, i) => (
          <option
            key={i}
            value={attribute.id}
            disabled={attribute.disable === 1 ? 1 : 0}
          >
            {ATTRIBUTE_TYPE[attribute.id].name}
          </option>
        ))}
      </select>
    );
  });

  return <>{boostSelect}</>;
};

export const ShowAncestryAttributeBoostFlaw = ({ character }) => {
  const ancestryBoostFlaw =
    character.ancestry.ancestry_attribute_boost_flaws.map((boostFlaw, i) => {
      return (
        <select key={i} disabled>
          <option>
            {ATTRIBUTE_TYPE[boostFlaw.attribute_id].name}{" "}
            {boostFlaw.is_flaw ? "Flaw" : "Boost"}
          </option>
        </select>
      );
    });

  return <>{ancestryBoostFlaw}</>;
};
