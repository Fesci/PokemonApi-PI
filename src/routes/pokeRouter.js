const { Router } = require("express");
const pokeRouter = Router();
const { Pokemon, Type } = require("../db");
const { checkPostData, getAllPokemons, getPokeByName } = require("../controller/getPokemons");
pokeRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const poke = await getPokeByName(name);
      res.status(200).send(poke);
    }
    let allPokemons = await getAllPokemons();

    res.status(200).send(allPokemons);
  } catch (error) {
    res.status(404).send({ error: "No pokemon found" });
  }
});
pokeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  let allPokemons = await getAllPokemons();
  if (id) {
    const poke = allPokemons.find(p => id == p.id);
    poke != undefined ? res.status(200).send(poke) : res.status(404).send({ error: "No pokemon found" });
  }
});
pokeRouter.post("/", checkPostData, async (req, res) => {
  const { types } = req.body;
  try {
    const newPoke = await Pokemon.create(req.body);
    let typeRelation = await Type.findAll({
      where: { name: types },
    });
    await newPoke.addTypes(typeRelation);
    res.status(201).send(newPoke);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

pokeRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const poke = Pokemon.findOne({
    where: { id: id },
  });
  if (poke) {
    await Pokemon.destroy({
      where: { id: id },
    });
    res.status(200).send({ message: "Pokemon deleted" });
  } else {
    res.status(404).send({ error: "Pokemon not found" });
  }
});

//TODO
pokeRouter.put("/:id", async (req, res) => {
  const data = req.body;
  if (data) {
  }
});
module.exports = pokeRouter;
