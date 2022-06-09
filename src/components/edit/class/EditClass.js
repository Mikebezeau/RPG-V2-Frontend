import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import DynamicObjInputs from "../form/DynamicObjInputs";
import * as C from "../../../data/constants/dataDictionaryConstants";
import { CONFIG } from "../../../data/constants/configConstants";

const EditClass = () => {
  const { id } = useParams();

  const [charClass, setCharClass] = useState({});

  const getClassById = async () => {
    const response = await axios.get(`${CONFIG.api.url}/class/${id}`);
    setCharClass(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getClassById(id);
  }, [id]);

  const formData1 = {
    class_id: false,
    class_name: { label: "Name", type: C.INPUT_TYPE.TEXT },
    class_description: { label: "Description", type: C.INPUT_TYPE.TEXTAREA },
    magic_attribute_id: false,
    magic_type_id: false,
    fort_rank: false,
    ref_rank: false,
    will_rank: false,
    hp_per_level: false,
    num_skill_first_level: false,
    perception_rank: false,
    magic_tradition_trait_id: false,
  };

  return (
    <Container>
      <Row>
        <Col>
          <DynamicObjInputs
            obj={charClass}
            inputData={formData1}
            handleChange={() => {
              return 0;
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EditClass;
