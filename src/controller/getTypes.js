const axios = require("axios");
const url = "https://pokeapi.co/api/v2/type";
const { Type } = require("../db.js");
const getTypes = async () => {
  const response = await axios.get(url);
  const poblate = response.data.results.forEach(element => {
    Type.findOrCreate({
      where: { name: element.name },
    });
  });
  return poblate;
};
module.exports = {
  getTypes,
};
