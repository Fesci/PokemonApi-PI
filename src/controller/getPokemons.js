const axios = require("axios");
const { Pokemon, Type } = require("../db");

const baseUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=120`;
const getApiPokemons = async () => {
  const response = await axios.get(baseUrl);
  const pokemons = response.data.results.map(({ name, url }) => ({ name, url }));
  return pokemons;
};

const getApiPokemonsInfo = async () => {
  const pokemons = await getApiPokemons();
  return Promise.all(
    pokemons.map(async ({ url }) => {
      const response = await axios.get(url);
      return {
        id: response.data.id,
        name: response.data.name,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        deffense: response.data.stats[2].base_stat,
        speed: response.data.stats[3].base_stat,
        height: response.data.height,
        weight: response.data.weight,
        image: response.data.sprites.other.dream_world.front_default,
        types: response.data.types.map(({ type }) => ({ name: type.name })),
      };
    })
  );
};
const orderById = array => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index].id;
    element.sort();
  }
};
const getDbPokemons = async () => {
  try {
    let pokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return pokemons;
  } catch (error) {
    console.log(error.message);
  }
};
const getAllPokemons = async () => {
  let dbPokemons = await getDbPokemons();
  let pokemons = await getApiPokemonsInfo();

  let allPokemons = [...dbPokemons, ...pokemons];
  return allPokemons;
};
const getPokeByName = async name => {
  let poke = await getAllPokemons();

  if (name) {
    poke = poke.filter(p => p.name.includes(name.toLowerCase()));
    if (poke.length > 0) {
      return poke;
    } else {
      return { error: "No pokemon found with that name" };
    }
  }
};
const checkPostData = (req, res, next) => {
  const { name, hp, attack, deffense, speed, height, weight } = req.body;
  if (!name) res.status(400).send({ error: "Missing name" });
  if (!hp) res.status(400).send({ error: "Missing hp" });
  if (!attack) res.status(400).send({ error: "Missing attack" });
  if (!deffense) res.status(400).send({ error: "Missing deffense" });
  if (!speed) res.status(400).send({ error: "Missing speed" });
  if (!height) res.status(400).send({ error: "Missing height" });
  if (!weight) res.status(400).send({ error: "Missing weight" });
  next();
};
module.exports = {
  checkPostData,
  getAllPokemons,
  getPokeByName,
};
