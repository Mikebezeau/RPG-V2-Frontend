import DynamicObjInputs from "../form/DynamicObjInputs";
import { Row, Col } from "react-grid-system";
//import { Button } from "bootstrap";

const DynamicEffectModForm = ({
  modForm,
  effectModList,
  modKey,
  handleAddMod,
  handleChangeMod,
  handleDeleteMod,
}) => {
  return (
    <>
      <Row>
        <Col>{modForm.title}</Col>
        <Col>
          <button value={modKey} onClick={handleAddMod}>
            Add new
          </button>
        </Col>
      </Row>
      {effectModList &&
        effectModList.map((effectMod, i) => (
          <Row key={i}>
            <DynamicObjInputs
              obj={effectMod}
              inputData={modForm.formData}
              handleChange={(e) => handleChangeMod(e, modKey, i)}
            />
            <Col>
              <button onClick={(e) => handleDeleteMod(e, modKey, i)}>
                Remove
              </button>
            </Col>
          </Row>
        ))}
    </>
  );
};

export default DynamicEffectModForm;
