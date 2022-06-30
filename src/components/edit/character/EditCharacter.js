import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import { useDbStore } from "../../../data/stores/dbStore";
import { useCharacterStore } from "../../../data/stores/characterStore";
import {
  SelectAttributeBoost,
  ShowAncestryAttributeBoostFlaw,
} from "./SelectAttributeBoost";
import DynamicObjInputs from "../form/DynamicObjInputs";
import { getInputValue, FormatText } from "../../../util/utilFunctions";
import * as C from "../../../data/constants/dataDictionaryConstants";

import { Modal } from "../../modal";

const EditCharacter = () => {
  const { character, characterMenu } = useCharacterStore((state) => state);
  const { ancestryList, backgroundList, heritageList, classList, skillList } =
    useDbStore((state) => state);

  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [modalContents, setModalContents] = useState(<></>);

  const openModal = (title, content) => {
    setModalContents(
      <div style={{ fontFamily: "Arial" }}>
        <u>{title}</u>
        <br />
        {FormatText(content)}
      </div>
    );
    setShowModal(true);
  };

  useEffect(() => {
    characterMenu.getCharacterById(id);
  }, [characterMenu, id]);

  const updateCharacter = async (e) => {
    e.preventDefault();
    characterMenu.updateCharacter(id);
  };

  const updateAttributeBoosts = (characterAttributeBoosts) => {
    characterMenu.setProp(
      "character_attribute_boosts",
      characterAttributeBoosts
    );
  };

  const removeAttributeBoostSelection = (attributeBoostType, returnList) => {
    const characterAttributeBoosts =
      character.character_attribute_boosts.filter(
        (boost) => boost.boost_type_const_value !== attributeBoostType
      );
    //return list if further actions are to be taken
    if (returnList) return characterAttributeBoosts;
    updateAttributeBoosts(characterAttributeBoosts);
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const val = getInputValue(e);
    characterMenu.setProp(name, val);
  };

  const handleClassChange = (e) => {
    handleChange(e);
    const classId = Number(e.target.value);
    const newClass = classList.find(
      (thisClass) => thisClass.class_id === classId
    );
    characterMenu.setProp("class", newClass);
    console.log(newClass);
    const characterAttributeBoosts = removeAttributeBoostSelection(
      C.ATTRIBUTE_BOOST_TYPE.class_optional,
      true
    );
    //if only one option for class boost, add it to character's list
    if (newClass?.class_attribute_boosts?.length === 1) {
      characterAttributeBoosts.push({
        character_id: Number(id),
        attribute_id: newClass.class_attribute_boosts[0].attribute_id,
        boost_type_const_value: C.ATTRIBUTE_BOOST_TYPE.class_optional,
        level: 1,
      });
      updateAttributeBoosts(characterAttributeBoosts);
    }
    characterMenu.setProp("class_specialty_id", 0);
    characterMenu.setProp("class_specialty", null);
    console.log(
      classList.find((charClass) => charClass.class_id === character.class_id)
        .class_specialties
    );
  };

  const handleClassSpecialtyChange = (e) => {
    handleChange(e);
    const classSpecialtyId = Number(e.target.value);
    const newClassSpecialty = classList
      .find((thisClass) => thisClass.class_id === character.class_id)
      .class_specialties.find(
        (thisSpecialtyClass) =>
          thisSpecialtyClass.class_specialty_id === classSpecialtyId
      );
    console.log(newClassSpecialty);
    characterMenu.setProp("class_specialty", newClassSpecialty);
  };

  const handleAncestryChange = (e) => {
    handleChange(e);
    const ancestryId = Number(e.target.value);
    characterMenu.setProp(
      "ancestry",
      ancestryList.find((ancestry) => ancestry.ancestry_id === ancestryId)
    );
    removeAttributeBoostSelection(C.ATTRIBUTE_BOOST_TYPE.free_ancestry);
    //reset heritage selection
    characterMenu.setProp("heritage_id", 0);
    characterMenu.setProp("heritage", null);
  };

  const handleBackgroundChange = (e) => {
    handleChange(e);
    const backgroundId = Number(e.target.value);
    characterMenu.setProp(
      "background",
      backgroundList.find(
        (background) => background.background_id === backgroundId
      )
    );
    removeAttributeBoostSelection(C.ATTRIBUTE_BOOST_TYPE.background);
    removeAttributeBoostSelection(C.ATTRIBUTE_BOOST_TYPE.free_background);
  };

  const handleHeritageChange = (e) => {
    handleChange(e);
    const heritageId = Number(e.target.value);
    characterMenu.setProp(
      "heritage",
      heritageList.find((heritage) => heritage.heritage_id === heritageId)
    );
  };

  const handleAttributeBoostChange = () => {
    //get list of all attribute boosts listed on page
    const characterAttributeBoosts = [];
    //for each
    const selectBoosts = document.getElementsByClassName("attribute-boost");
    for (let i = 0; i < selectBoosts.length; i++) {
      if (Number(selectBoosts[i].value) !== 0)
        characterAttributeBoosts.push({
          character_id: Number(id),
          attribute_id: Number(selectBoosts[i].value),
          boost_type_const_value: Number(
            selectBoosts[i].dataset.boost_type_const_value
          ),
          level: Number(selectBoosts[i].dataset.level),
        });
    }
    updateAttributeBoosts(characterAttributeBoosts);
  };

  const getAttribute = (attributeId) => {
    const combinedBoostList = character.character_attribute_boosts.concat(
      character.ancestry.ancestry_attribute_boost_flaws
    );
    const numBoosts = combinedBoostList.filter(
      (boost) => boost.attribute_id === attributeId && !boost.is_flaw
    ).length;
    const numFlaw = character.ancestry.ancestry_attribute_boost_flaws.filter(
      (boost) => boost.attribute_id === attributeId && boost.is_flaw === 1
    ).length;
    const totalBoost = numBoosts - numFlaw;
    return totalBoost <= 4 ? totalBoost * 2 + 10 : totalBoost - 4 + 18;
  };

  const formData1 = {
    name: { label: "Name", type: C.INPUT_TYPE.TEXT },
    level: { label: "Level", type: C.INPUT_TYPE.NUMBER },
    description: { label: "Description", type: C.INPUT_TYPE.TEXTAREA },
    gender: false,
    height: { label: "Height", type: C.INPUT_TYPE.TEXT },
    weight: { label: "Weight", type: C.INPUT_TYPE.NUMBER },
    age: { label: "Age", type: C.INPUT_TYPE.NUMBER },
  };
  const formData2 = {
    class_id: {
      label: "Class",
      type: C.INPUT_TYPE.SELECT,
      dataDictionary: classList,
      dLabel: "class_name",
      dVal: "class_id",
      onChange: handleClassChange,
    },
  };
  /*
  const formData2 = {
    character_id: false,
    npc_template_id: false,
    character_type: false,
    campaign_id: false,
    name: { label: "Name", type: C.INPUT_TYPE.TEXT },
    heritage_id: false,
    background_id: false,
    level: { label: "Level", type: C.INPUT_TYPE.NUMBER },
    experience: false,
    description: { label: "Description", type: C.INPUT_TYPE.TEXTAREA },
    gender: false,
    height: { label: "Height", type: C.INPUT_TYPE.TEXT },
    weight: { label: "Weight", type: C.INPUT_TYPE.NUMBER },
    age: { label: "Age", type: C.INPUT_TYPE.NUMBER },
    deity_id: false,
    sprite_id: false,
    thumb_pic_num: false,
    portrait_pic_num: false,
    full_pic_num: false,
    start_area_id: false,
    start_x: false,
    start_y: false,
    //objects created by query
    ancestry: false,
    heritage: false,
    class: false,
  };
*/
  return (
    <>
      {showModal ? (
        <Modal setShowModal={setShowModal} contents={modalContents} />
      ) : null}
      <Container>
        <Row>
          <Col>
            <button onClick={updateCharacter}>Update</button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={5} lg={5}>
            <DynamicObjInputs
              obj={character}
              inputData={formData1}
              handleChange={handleChange}
            />
            <hr />
            <DynamicObjInputs
              obj={character}
              inputData={formData2}
              handleChange={handleChange}
            />
            <Row>
              <Col>Specialty</Col>
              {classList[0]?.class_specialties && (
                <Col>
                  <select
                    name="class_specialty_id"
                    onChange={handleClassSpecialtyChange}
                    value={character.class_specialty_id}
                  >
                    <option value={0}>Select Class Specialty</option>

                    {classList
                      .find(
                        (charClass) => charClass.class_id === character.class_id
                      )
                      ?.class_specialties.map((specialty, i) => (
                        <option key={i} value={specialty.class_specialty_id}>
                          {specialty.class_specialty_name}
                        </option>
                      ))}
                  </select>
                </Col>
              )}
            </Row>
            <Row>
              <Col>Ancestry</Col>
              {ancestryList[0] && (
                <Col>
                  <select
                    name="ancestry_id"
                    onChange={handleAncestryChange}
                    value={character.ancestry_id}
                  >
                    <option value={0}>Select Ancestry</option>
                    {ancestryList.map((ancestry, i) => (
                      <option key={i} value={ancestry.ancestry_id}>
                        {ancestry.ancestry_name}
                      </option>
                    ))}
                  </select>
                </Col>
              )}
            </Row>
            <Row>
              <Col>Heritage</Col>
              {heritageList[0] && (
                <Col>
                  <select
                    name="heritage_id"
                    onChange={handleHeritageChange}
                    value={character.heritage_id}
                  >
                    <option value={0}>Select Heritage</option>
                    {heritageList
                      .filter(
                        (heritage) =>
                          heritage.ancestry_id === character.ancestry_id
                      )
                      .map((heritage, i) => (
                        <option key={i} value={heritage.heritage_id}>
                          {heritage.heritage_name}
                        </option>
                      ))}
                  </select>
                </Col>
              )}
            </Row>
            <Row>
              <Col>Background</Col>
              {backgroundList[0] && (
                <Col>
                  <select
                    name="background_id"
                    onChange={handleBackgroundChange}
                    value={character.background_id}
                  >
                    <option value={0}>Select Background</option>
                    {backgroundList.map((background, i) => (
                      <option key={i} value={background.background_id}>
                        {background.background_name}
                      </option>
                    ))}
                  </select>
                </Col>
              )}
            </Row>
            <hr />
            {character.character_attribute_boosts &&
              Object.values(C.ATTRIBUTE_TYPE).map((attribute, i) => (
                <Row key={i}>
                  <Col>{attribute.name}:</Col>
                  <Col>{getAttribute(attribute.id)}</Col>
                </Row>
              ))}
            <hr />
            {character.character_skill_increases &&
              Object.values(skillList)
                .filter((skill) => skill.skill_id <= 17)
                .map((skill, i) => {
                  return (
                    <Row key={i}>
                      <Col>{skill.skill_name}</Col>
                      <Col>
                        {
                          C.PROFICIENCY[character.getSkillRank(skill.skill_id)]
                            .name
                        }
                      </Col>
                    </Row>
                  );
                })}
          </Col>
          <Col md={3} lg={3}>
            <Row>
              <Col>Attribute Boosts</Col>
            </Row>
            <hr />

            <Row>
              <Col>Ancestry</Col>
            </Row>

            <Row>
              <Col>
                {character.ancestry?.num_free_attr_boost && (
                  <>
                    <SelectAttributeBoost
                      num_boosts={character.ancestry.num_free_attr_boost}
                      boost_type_const_value={
                        C.ATTRIBUTE_BOOST_TYPE.free_ancestry
                      }
                      handleChange={handleAttributeBoostChange}
                      level={1}
                      character={character}
                    />
                    <ShowAncestryAttributeBoostFlaw character={character} />
                  </>
                )}
              </Col>
            </Row>

            <Row>
              <Col>Background</Col>
            </Row>
            <Row>
              <Col>
                {character.background?.background_attribute_boosts && (
                  <>
                    <SelectAttributeBoost
                      num_boosts={1}
                      boost_type_const_value={
                        C.ATTRIBUTE_BOOST_TYPE.free_background
                      }
                      handleChange={handleAttributeBoostChange}
                      level={1}
                      character={character}
                    />
                    <SelectAttributeBoost
                      num_boosts={1}
                      attribute_list={
                        character.background.background_attribute_boosts
                      }
                      boost_type_const_value={C.ATTRIBUTE_BOOST_TYPE.background}
                      handleChange={handleAttributeBoostChange}
                      level={1}
                      character={character}
                    />
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <Col>Class</Col>
            </Row>
            <Row>
              <Col>
                {character.class?.class_attribute_boosts && (
                  <SelectAttributeBoost
                    num_boosts={1}
                    attribute_list={character.class.class_attribute_boosts}
                    boost_type_const_value={
                      C.ATTRIBUTE_BOOST_TYPE.class_optional
                    }
                    handleChange={handleAttributeBoostChange}
                    level={1}
                    character={character}
                  />
                )}
              </Col>
            </Row>

            <Row>
              <Col>Starting Boosts</Col>
            </Row>
            <Row>
              <Col>
                {character.character_attribute_boosts && (
                  <SelectAttributeBoost
                    num_boosts={4}
                    boost_type_const_value={C.ATTRIBUTE_BOOST_TYPE.level}
                    handleChange={handleAttributeBoostChange}
                    level={1}
                    character={character}
                  />
                )}
              </Col>
            </Row>
            {character.level &&
              [...Array(character.level)].map((el, i) => (
                <div key={i}>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                  <Row>
                    <Col>Level {i + 1}</Col>
                  </Row>

                  {
                    //FIND ALL CLASS SPECIALTY ABILITIES FOR THIS LEVEL
                    character.class?.abilities
                      ?.filter(
                        (ability) =>
                          ability.class_ability.level_gained === i + 1
                      )
                      .map((ability, j) => {
                        return (
                          <div key={j}>
                            {j === 0 && <br />}

                            <Row>
                              <Col>
                                <button
                                  onClick={() =>
                                    openModal(
                                      ability.ability_name,
                                      ability.ability_description
                                    )
                                  }
                                >
                                  {ability.ability_name}
                                </button>
                              </Col>
                            </Row>
                          </div>
                        );
                      })
                  }
                  {
                    //FIND ALL CLASS SPECIALTY ABILITIES FOR THIS LEVEL
                    character.class_specialty?.abilities
                      ?.filter(
                        (ability) =>
                          ability.class_specialty_ability.level_gained === i + 1
                      )
                      .map((ability, j) => {
                        return (
                          <div key={j}>
                            {j === 0 && <br />}
                            <Row>
                              <Col>
                                <button
                                  onClick={() =>
                                    openModal(
                                      ability.ability_name,
                                      ability.ability_description
                                    )
                                  }
                                >
                                  {ability.ability_name}
                                </button>
                              </Col>
                            </Row>
                          </div>
                        );
                      })
                  }
                </div>
              ))}
          </Col>

          <Col
            md={4}
            lg={4}
            style={{ fontFamily: "Arial, sans-serif", fontSize: 18 }}
          >
            {process.env.NODE_ENV === "development" ? (
              <Row>
                <Col>{JSON.stringify(character, null, 4)}</Col>
              </Row>
            ) : (
              <>
                <Row>
                  <Col>{character.heritage?.heritage_name}</Col>
                </Row>
                <Row>
                  <Col>{character.heritage?.heritage_description}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>{character.class?.class_name}</Col>
                </Row>
                <Row>
                  <Col>{character.class?.class_description}</Col>
                </Row>
                <hr />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditCharacter;
