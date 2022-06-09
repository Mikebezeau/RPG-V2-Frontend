import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { itemFormData } from "../form/dynamicObjFormData";
import ListHeader from "../form/ListHeader";
import ListBody from "../form/ListBody";

import { CONFIG } from "../../../data/constants/configConstants";

const ItemList = () => {
  const [allItem, setAllItem] = useState([]);

  useEffect(() => {
    getAllItem();
  }, []);

  const getAllItem = async () => {
    const response = await axios.get(`${CONFIG.api.url}/item`);
    setAllItem(response.data);
  };

  const deleteItem = async (id) => {
    await axios.delete(`${CONFIG.api.url}/item/${id}`);
    getAllItem();
  };

  return (
    <div>
      <Link to="/item/add">
        <button className="button">Add New</button>
      </Link>
      <table className="table">
        <ListHeader formData={itemFormData} />
        <ListBody
          formData={itemFormData}
          allItem={allItem}
          deleteHandler={deleteItem}
        />
      </table>
    </div>
  );
};

export default ItemList;
