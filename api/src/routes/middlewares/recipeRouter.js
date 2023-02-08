require("dotenv").config();
const recipeRouter = require("express").Router();
const {
  getAPIRecipes,
  getDBRecipes,
  createRecipe,
  saveDiets,
  dietIdSearch,
  saveDishes,
  dishIdSearch,
  checkRecipe,
  getAPIRecipeById,
  getDBRecipesById,
} = require("../controllers/recipe.controllers");

const { API_KEY } = process.env;

recipeRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    let allRecipes = [];

    let apiRecipes = [] // Lo declaro antes para poder comentarlo y que no busque en la API
    let dbRecipes = []

    // Consulta la API
    // apiRecipes = await getAPIRecipes(name);

    // Consulta la DB
    dbRecipes = await getDBRecipes(name);

    if (!apiRecipes && !dbRecipes)
      throw Error("No hay recetas que coincidan con la búsqueda");

    allRecipes = apiRecipes.concat(dbRecipes);

    res.status(200).send(allRecipes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

recipeRouter.get("/:idRecipe", async (req, res) => {
  try {
    const { idRecipe } = req.params;

    let recipe = {};

    if (Number(idRecipe)) {
      recipe = await getAPIRecipeById(idRecipe);
    } else {
      recipe = await getDBRecipesById(idRecipe);
    }
    res.json(recipe);
  } catch (error) {
    res.status(404).send("No hay recetas con ese ID");
  }
});

recipeRouter.post("/", async (req, res) => {
  try {
    const {
      title,
      healthScore,
      summary,
      instructions,
      image,
      diets,
      dishTypes,
    } = req.body;

    if (!title || !summary)
      throw Error("Faltan datos super hiper mega relevantes");

    let dietArr = diets.split(",").map((e) => e.trim());
    let dishArr = dishTypes.split(",").map((e) => e.trim());

    let recipe = { title, healthScore, summary, instructions, image };

    if (await checkRecipe(title)) {
      let createdRecipe = await createRecipe(recipe);

      await saveDiets(dietArr);
      await saveDishes(dishArr);

      await createdRecipe.addDiets(await dietIdSearch(dietArr));
      await createdRecipe.addDishTypes(await dishIdSearch(dishArr));
    } else throw Error("La receta ya existe en la base de datos");

    res.status(201).send(`La receta ${title} se ha creado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = recipeRouter;
