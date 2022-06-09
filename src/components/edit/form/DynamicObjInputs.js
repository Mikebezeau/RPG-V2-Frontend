/*

-Description-
Creates inputs for a given object, for each object property.
Used to edit object data and save to database.
Manage the order input fields are displayed by changing order of properties in inputData object.

-Parameters-
obj:
the object that the form inputs is based on

inputData: 
gives specific information for each input based on obj property names.
data stored in './util/dynamicObjFormData.js'
Example:
const inputData = {
    item_id: false, <-- false means that no input field will be generated for this property
    name: { label: "Name", type: "text" },
    size_const_value: { 
      label: "Size", 
      type: "select", 
      dataDictionary: DATA_CONST }, <-- labels and values  provided as object library DATA_CONST={0:"typea", 1:"typeb", 2:"typec"}
      dLabel: "class_name", <-- alternate text name field in not just "name"
      dVal: "class_id", <-- alternate id field in not just "id"
      onChange: handleClassChange, <-- specialized event handler
}

handleChange:
function used to set state of object being edited

*/

//import { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import { INPUT_TYPE } from "./dynamicObjFormData";

const DynamicObjInputs = ({ obj, inputData, handleChange }) => {
  /*
  const [missingFieldError, setMissingFieldError] = useState([]);

  useEffect(() => {
    Object.keys(obj).map((key) => {
      if (typeof inputData[key] === "undefined") {
        setMissingFieldError((prevState) => [...prevState, key]);
      }
    });
  }, [obj, inputData]);

  if (missingFieldError.length > 0) {
    return (
      <>
        MISSING FIELDS IN inputData:
        {missingFieldError.map((key, i) => (
          <p key={i}>{key}</p>
        ))}
      </>
    );
  }

  if (typeof obj !== "object") {
    console.log("UNDEFINED obj");
  }
  if (typeof inputData !== "object") {
    console.log("UNDEFINED inputData");
  }
*/
  return (
    <Row>
      <Col>
        {Object.keys(inputData).map(
          (key, i) =>
            inputData[key] && (
              <Row key={i}>
                <Col>
                  <label>{inputData[key].label}</label>
                </Col>
                <Col>
                  {inputData[key].type === INPUT_TYPE.TEXT && (
                    <input
                      type="text"
                      value={obj[key] || ""}
                      onChange={inputData[key].onChange ?? handleChange}
                      name={key}
                    />
                  )}

                  {inputData[key].type === INPUT_TYPE.TEXTAREA && (
                    <textarea
                      onChange={inputData[key].onChange ?? handleChange}
                      name={key}
                      value={obj[key] || ""}
                    />
                  )}
                  {inputData[key].type === INPUT_TYPE.CHECKBOX && (
                    <input
                      type="checkbox"
                      onChange={inputData[key].onChange ?? handleChange}
                      name={key}
                      checked={obj[key] || 0}
                    />
                  )}
                  {inputData[key].type === INPUT_TYPE.NUMBER && (
                    <input
                      type="number"
                      onChange={inputData[key].onChange ?? handleChange}
                      name={key}
                      value={obj[key] || 0}
                      min={inputData[key].min || 0}
                      max={inputData[key].min || 1000}
                    />
                  )}
                  {inputData[key].type === INPUT_TYPE.SELECT && (
                    <select
                      name={key}
                      onChange={inputData[key].onChange ?? handleChange}
                      value={obj[key]}
                    >
                      <option value={0}>Select {inputData[key].label}</option>
                      {Object.values(inputData[key].dataDictionary).map(
                        (dataDictionary, j) => (
                          <option
                            key={j}
                            value={
                              inputData[key].dVal
                                ? dataDictionary[inputData[key].dVal]
                                : dataDictionary.value
                            }
                          >
                            {dataDictionary.name
                              ? dataDictionary.name
                              : dataDictionary[inputData[key].dLabel]}
                          </option>
                        )
                      )}
                    </select>
                  )}
                </Col>
              </Row>
            )
        )}
      </Col>
    </Row>
  );
};

export default DynamicObjInputs;
