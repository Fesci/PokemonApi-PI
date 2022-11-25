const { Router } = require("express");
// Importar todos los routers;
const pokeRouter = require("./pokeRouter");
const typeRouter = require("./typeRouter");

const router = Router();

// Configurar los routers
router.use("/poke", pokeRouter);
router.use("/type", typeRouter);

module.exports = router;
