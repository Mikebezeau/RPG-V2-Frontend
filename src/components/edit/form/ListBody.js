import { Link } from "react-router-dom";

const ListBody = ({ formData, allItem, deleteHandler }) => {
  return (
    <tbody>
      {allItem.map((item) => (
        <tr key={item.item_id}>
          {Object.keys(formData).map(
            (key, i) =>
              formData[key] && (
                <td key={i}>
                  {(formData[key].dataDictionary && (
                    <>{formData[key].dataDictionary[item[key]].name}</>
                  )) || <>{item[key]}</>}
                </td>
              )
          )}
          <td>
            <Link to={`/item/edit/${item.item_id}`}>
              <button className="button">Edit</button>
            </Link>
            <button
              onClick={() => deleteHandler(item.item_id)}
              className="button"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ListBody;
