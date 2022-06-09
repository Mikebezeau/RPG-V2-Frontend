import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../../../data/constants/configConstants";

const AddCharacter = () => {
  const [character, setCharacter] = useState({});
  const navigate = useNavigate();

  const saveCharacter = async (e) => {
    e.preventDefault();
    await axios.post(`${CONFIG.api.url}/character`, {
      character,
    });
    navigate("/edit/character");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={saveCharacter}>
        <div className="field">
          <label className="label">Name</label>
          <input
            value={character.name}
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

export default AddCharacter;
