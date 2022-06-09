import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CONFIG } from "../../../data/constants/configConstants";

const TraitList = () => {
  const [allTrait, setAllTrait] = useState([]);

  useEffect(() => {
    getAllTrait();
  }, []);

  const getAllTrait = async () => {
    const response = await axios.get(`${CONFIG.api.url}/trait`);
    setAllTrait(response.data);
    console.log(response.data[0]);
  };

  /*
  const deleteTrait = async (id) => {
    await axios.delete(`${CONFIG.api.url}/trait/${id}`);
    getAllTrait();
  };
  */

  return (
    <div>
      <Link to="/add" className="button is-primary mt-2">
        Add New
      </Link>
      <table className="is-striped is-fullwidth table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {allTrait.map((trait, index) => (
            <tr key={index}>
              <td>{trait.trait_type.trait_type_name}</td>
              <td>{trait.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TraitList;
