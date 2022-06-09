import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import { useSpecialEffectStore } from "../../../data/stores/editSpecialEffectStore";
import DynamicObjInputs from "../form/DynamicObjInputs";
import EditEffect from "../effect/EditEffect";
import { getInputValue } from "../../../util/utilFunctions";
import * as C from "../../../data/constants/dataDictionaryConstants";

const EditAbility = () => {
  const { ability, abilityMenu, effects, effectMenu } = useSpecialEffectStore(
    (state) => state
  );

  const { id } = useParams();
  useEffect(() => {
    abilityMenu.getAbilityById(id);
  }, [abilityMenu, id]);

  const handleChange = (e) => {
    const { name } = e.target;
    const val = getInputValue(e);
    abilityMenu.setProp(name, val);
  };

  const abilityFormData = {
    ability_name: { label: "Name", type: C.INPUT_TYPE.TEXT },
    ability_description: { label: "Description", type: C.INPUT_TYPE.TEXTAREA },
    icon_name: { label: "Icon", type: C.INPUT_TYPE.TEXT },
    action_type_const_value: {
      label: "Activate Action",
      type: C.INPUT_TYPE.NUMBER,
    },
    is_harmless: { label: "Harmless", type: C.INPUT_TYPE.CHECKBOX },
    save_type_const_value: { label: "Name", type: C.INPUT_TYPE.NUMBER },
    save_every_round: { label: "Name", type: C.INPUT_TYPE.NUMBER },
    duration_type_const_value: { label: "Duration", type: C.INPUT_TYPE.NUMBER },
    cancel_at_will: { label: "Cancel at Will", type: C.INPUT_TYPE.NUMBER },
    maintain_every_round: {
      label: "Maintain Each Round",
      type: C.INPUT_TYPE.NUMBER,
    },
    require_action_every_round: {
      label: "Action Required Each Round",
      type: C.INPUT_TYPE.NUMBER,
    },
    effect_id_save_crit: {
      label: "effect_id_save_crit",
      type: C.INPUT_TYPE.NUMBER,
    },
    effect_id_save: { label: "effect_id_save", type: C.INPUT_TYPE.NUMBER },
    effect_id_save_fail: {
      label: "effect_id_save_fail",
      type: C.INPUT_TYPE.NUMBER,
    },
    effect_id_save_crit_fail: {
      label: "effect_id_save_crit_fail",
      type: C.INPUT_TYPE.NUMBER,
    },
  };

  return (
    <Container>
      <Row>
        <Col>
          <button onClick={abilityMenu.saveAbility}>Update</button>
        </Col>
      </Row>
      <Row>
        <Col>
          <DynamicObjInputs
            obj={ability}
            inputData={abilityFormData}
            handleChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <button onClick={effectMenu.addEffect}>Add Effect</button>
        </Col>
      </Row>
      {effects.map((effect, i) => {
        return (
          <Row key={i}>
            <hr />
            <EditEffect effect={effect} effectIndex={i}></EditEffect>
            <Col>
              <button onClick={() => effectMenu.deleteEffect(i)}>
                Remove Effect
              </button>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default EditAbility;
