import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDbStore } from "../../../data/stores/dbStore";
import {
  ATTRIBUTE_TYPE,
  FEAT_REQ_VALUE,
  PROFICIENCY,
} from "../../../data/constants/dataDictionaryConstants";
import { CONFIG } from "../../../data/constants/configConstants";

const FeatList = () => {
  const { skillList } = useDbStore((state) => state);
  const [allFeat, setAllFeat] = useState([]);

  useEffect(() => {
    getAllFeat();
  }, []);

  const getAllFeat = async () => {
    const response = await axios.get(`${CONFIG.api.url}/feat`);
    setAllFeat(response.data);
    console.log(response.data);
  };

  /*
  const deleteFeat = async (id) => {
    await axios.delete(`${CONFIG.api.url}/feat/${id}`);
    getAllFeat();
  };
  */

  const renderFeatRequirement = (req) => {
    //const label = FEAT_REQ_TYPE[req.feat_req_type_const_value];
    switch (req.feat_req_type_const_value) {
      case FEAT_REQ_VALUE.attribute:
        return (
          <div>
            {ATTRIBUTE_TYPE[req.req_id].name} {req.req_val}
          </div>
        );
      case FEAT_REQ_VALUE.skill:
        return (
          <div>
            {skillList[req.req_id].skill_name} {PROFICIENCY[req.req_val].name}
          </div>
        );
      default:
        return "";
    }
    //feat_require.req_is_or
  };

  return (
    <div>
      <Link to="/add">
        <button className="button">Add New</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Traits</th>
            <th>Name</th>
            <th>Req. Level</th>
            <th>Description</th>
            <th>Requirments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allFeat.map((feat) => (
            <tr key={feat.feat_id}>
              <td>
                {feat.traits && (
                  <>
                    {feat.traits.map((trait, i) => (
                      <div key={i}>{trait.trait_name}</div>
                    ))}
                  </>
                )}
              </td>
              <td>{feat.feat_name}</td>
              <td>{feat.req_level}</td>
              <td>{feat.feat_description}</td>
              <td>
                {feat.feat_requires && (
                  <>
                    {feat.feat_requires.map((featRequire, i) => (
                      <div key={i}>{renderFeatRequirement(featRequire)}</div>
                    ))}
                  </>
                )}
              </td>
              <td>
                <Link to={`/feat/edit/${feat.feat_id}`}>
                  <button className="button">Edit</button>
                </Link>
                {/*
                <button
                  onClick={() => deleteFeat(feat.feat_id)}
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

export default FeatList;
