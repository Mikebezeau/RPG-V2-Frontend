import { Container, Row, Col } from "react-grid-system";
import { useSpecialEffectStore } from "../../../data/stores/editSpecialEffectStore";
import DynamicObjInputs from "../form/DynamicObjInputs";
import DynamicEffectModForm from "./DynamicEffectModForm";
import { getInputValue } from "../../../util/utilFunctions";
import * as C from "../../../data/constants/dataDictionaryConstants";
//import { Button } from "bootstrap";

const EditEffect = ({ effect, effectIndex }) => {
  const { effectMenu } = useSpecialEffectStore((state) => state);

  const handleChange = (e) => {
    const { name } = e.target;
    const val = getInputValue(e);
    effectMenu.setProp(effectIndex, name, val);
  };

  const handleChangeMod = (e, modListKey, modIndex) => {
    const { name } = e.target;
    const val = getInputValue(e);
    effectMenu.setModProp(effectIndex, modListKey, modIndex, name, val);
  };

  const handleAddMod = (e) => {
    e.preventDefault();
    const modListKey = e.target.value;
    effectMenu.addMod(effectIndex, modListKey);
  };

  const handleDeleteMod = (e, modListKey, modIndex) => {
    e.preventDefault();
    effectMenu.deleteMod(effectIndex, modListKey, modIndex);
  };

  const effectFormData = {
    effect_name: { label: "Name", type: C.INPUT_TYPE.TEXT },
    effect_description: { label: "Description", type: C.INPUT_TYPE.TEXTAREA },
  };

  const effectModFormData = {
    effect_acs: {
      title: "Armor Class Modifier",
      formData: {
        value: { label: "AC Bonus", type: C.INPUT_TYPE.NUMBER },
      },
    },
    effect_actions: {
      title: "Action Modifier",
      formData: {
        action_bonus_const_value: {
          label: "Action Bonus",
          type: C.INPUT_TYPE.SELECT,
          dataDictionary: C.ACTION_TYPE,
        },
        action_penalty_const_value: {
          label: "Action Penalty",
          type: C.INPUT_TYPE.SELECT,
          dataDictionary: C.ACTION_TYPE,
        },
      },
    },
  };

  return (
    <Container>
      <Row>
        <Col>
          <DynamicObjInputs
            obj={effect}
            inputData={effectFormData}
            handleChange={handleChange}
          />
        </Col>
        <Col>
          {Object.keys(effectModFormData).map((key, i) => (
            <DynamicEffectModForm
              key={i}
              modForm={effectModFormData[key]}
              effectModList={effect[key]}
              modKey={key}
              handleAddMod={handleAddMod}
              handleChangeMod={handleChangeMod}
              handleDeleteMod={handleDeleteMod}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default EditEffect;
