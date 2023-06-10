const getUpdatedFields = (req) => {
  const keys = Object.keys(req.body);
  let fieldString = "";
  const values = [];
  keys.forEach((key) => {
    fieldString += `${key}=?, `;
    values.push(req.body[key]);
  });
  const fields = fieldString.slice(0, -2);
  return {
    fields,
    values,
  };
};

const trimFields = (req) => {
  const keys = Object.keys(req.body);
  const data = req.body;
  keys.forEach((key) => {
    if (typeof data[key] == "string") {
      data[key] = data[key].trim();
    }
  });
  return data;
};

module.exports = { getUpdatedFields, trimFields };
