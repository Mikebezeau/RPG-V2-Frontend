/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DynamicObjInputs from "../form/DynamicObjInputs";
import { itemFormData } from "../form/dynamicObjFormData";
import { CONFIG } from "../../../data/constants/configConstants";

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    getItemById();
  }, []);

  const getItemById = async () => {
    const response = await axios.get(`${CONFIG.api.url}/item/${id}`);
    setItem(response.data);
  };

  const updateItem = async (e) => {
    e.preventDefault();
    await axios.patch(`${CONFIG.api.url}/item/${id}`, {
      item,
    });
    navigate("/item");
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox") {
      setItem((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (type === "number") {
      setItem((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    } else {
      setItem((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <form onSubmit={updateItem}>
        <DynamicObjInputs
          obj={item}
          inputData={itemFormData}
          handleChange={handleChange}
        />
        <div className="field">
          <button className="button is-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
