import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../../../data/constants/configConstants";

const AddItem = () => {
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  const saveItem = async (e) => {
    e.preventDefault();
    await axios.post(`${CONFIG.api.url}/item`, {
      item,
    });
    navigate("/item");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={saveItem}>
        <div className="field">
          <label className="label">Name</label>
          <input
            value={item.name}
            type="text"
            onChange={handleChange}
            name="name"
          />
        </div>

        <div className="field">
          <button className="button is-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
