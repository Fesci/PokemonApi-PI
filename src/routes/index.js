const { Router } = require("express");
// Importar todos los routers;
const pokeRouter = require("./pokeRouter");
const typeRouter = require("./typeRouter");

const router = Router();

// Configurar los routers
router.use("/poke", pokeRouter);
router.use("/type", typeRouter);
router.get("/favicon.ico", (req, res) => res.status(204));
router.get("/", async (req, res) => {
  res.send([
    {
      endpoint: "/poke",
      description: "Returns all available pokemons in the API",
      parameters: [
        {
          name: "pokemon",
          endpoint: "/poke/:id",
          description: "Returns information about a specific pokemon",
        },
        {
          name: "name",
          endpoint: "/poke?name=:name",
          description: "Returns information about a specific pokemon",
        },
      ],
    },
    {
      endpoint: "/type",
      description: "Returns all available pokemon's types in the API",
      parameters: [
        {
          name: "type",
          endpoint: "/type/:id",
          description: "Returns information about a specific type of pokemon",
        },
      ],
    },
  ]);
});
module.exports = router;
