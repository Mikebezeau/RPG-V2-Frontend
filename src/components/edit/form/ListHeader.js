const ListHeader = ({ formData }) => {
  return (
    <thead>
      <tr>
        {Object.keys(formData).map(
          (key, i) => formData[key] && <th key={i}>{formData[key].label} </th>
        )}
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default ListHeader;
