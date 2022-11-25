const { Router } = require("express");
const { getTypes } = require("../controller/getTypes");
const { Type } = require("../db.js");
const typeRouter = Router();

typeRouter.get("/", async (req, res) => {
  try {
    await getTypes();
    const types = await Type.findAll();
    res.status(200).send(types);
  } catch (error) {
    res.send(error.message);
  }
});
typeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  await getTypes();
  let type = await Type.findByPk(id);
  type ? res.status(200).send(type) : res.status(400).send({ error: "No type found" });
});
module.exports = typeRouter;
