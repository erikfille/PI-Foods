const dietRouter = require("express").Router();
const { getDiets, createDiets } = require("../controllers/diets.controllers");

dietRouter.get("/", async (req, res) => {
  try {
    await createDiets();
    const response = await getDiets();

    res.json(response);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = dietRouter;
