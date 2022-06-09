import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { characterFormData } from "../../form/dynamicObjFormData";
import { CONFIG } from "../../../data/constants/configConstants";

const CharacterList = () => {
  const [allCharacter, setAllCharacter] = useState([]);

  useEffect(() => {
    getAllCharacter();
  }, []);

  const getAllCharacter = async () => {
    const response = await axios.get(`${CONFIG.api.url}/character`);
    setAllCharacter(response.data);
  };

  const deleteCharacter = async (id) => {
    await axios.delete(`${CONFIG.api.url}/character/${id}`);
    getAllCharacter();
  };

  return (
    <div>
      <Link to="/edit/character/add">
        <button className="button">Add New</button>
      </Link>
      <table className="table">
        <thead>
          <tr>
            {Object.keys(characterFormData).map((key, i) => (
              <>
                {characterFormData[key] && (
                  <th key={i}> {characterFormData[key].label} </th>
                )}
              </>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allCharacter.map((character) => (
            <tr key={character.character_id}>
              {Object.keys(characterFormData).map((key, i) => (
                <>
                  {characterFormData[key] && (
                    <td key={i}>
                      {(characterFormData[key].dataDictionary && (
                        <>
                          {
                            characterFormData[key].dataDictionary[
                              character[key]
                            ]
                          }
                        </>
                      )) || <>{character[key]}</>}
                    </td>
                  )}
                </>
              ))}
              <td>
                <Link to={`/edit/character/${character.character_id}`}>
                  <button className="button">Edit</button>
                </Link>
                <button
                  onClick={() => {
                    /*deleteCharacter(character.character_id)*/
                  }}
                  className="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterList;
