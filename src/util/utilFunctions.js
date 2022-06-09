export const getKeyByValue = (obj, value) =>
  Object.keys(obj).find((key) => obj[key] === value);

export const getInputValue = (e) => {
  const { type, value, checked } = e.target;
  let val = null;
  //console.log(type);
  switch (type) {
    case "checkbox":
      val = checked;
      break;
    case "number":
    case "select-one":
      val = Number(value);
      break;
    default:
      val = value;
      break;
  }
  return val;
};
