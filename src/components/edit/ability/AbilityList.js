import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CONFIG } from "../../../data/constants/configConstants";

const AbilityList = () => {
  const [allAbility, setAllAbility] = useState([]);

  useEffect(() => {
    getAllAbility();
  }, []);

  const getAllAbility = async () => {
    const response = await axios.get(`${CONFIG.api.url}/ability`);
    setAllAbility(response.data);
  };

  /*
  const deleteAbility = async (id) => {
    await axios.delete(`${CONFIG.api.url}/ability/${id}`);
    getAllAbility();
  };
  */

  return (
    <div>
      <Link to="/add">Add New</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allAbility.map((ability, index) => (
            <tr key={ability.ability_id}>
              <td>{ability.ability_name}</td>
              <td>{ability.ability_description}</td>
              <td>
                <Link to={`/ability/${ability.ability_id}`}>Edit</Link>
                {/*}
                <button
                  onClick={() => deleteAbility(ability.ability_id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
                */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbilityList;
