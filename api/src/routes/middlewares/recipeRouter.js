const recipeRouter = require("express").Router();

const {
  getAPIRecipes,
  getDBRecipes,
  createRecipe,
  saveAtt,
  attIdSearch,
  checkAtt,
  getAPIRecipeById,
  getDBRecipesById,
} = require("../controllers/recipe.controllers");

recipeRouter.get("/all", async (req, res) => {
  try {
    let apiRecipes = [];
    // Consulta la API
    // let apiRecipes = await getAPIRecipes();

    // Consulta la DB
    let dbRecipes = await getDBRecipes();

    if (!apiRecipes && !dbRecipes)
      throw Error("No hay recetas que coincidan con la búsqueda");

    let allRecipes = apiRecipes.concat(dbRecipes);

    res.status(200).send(allRecipes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

recipeRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    let apiRecipes=[]
    // Consulta la API
    // let apiRecipes = await getAPIRecipes(name);

    // Consulta la DB
    let dbRecipes = await getDBRecipes(name);

    if (!apiRecipes && !dbRecipes)
      throw Error("No hay recetas que coincidan con la búsqueda");

    let allRecipes = apiRecipes.concat(dbRecipes);

    res.status(200).send(allRecipes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

recipeRouter.get("/:idRecipe", async (req, res) => {
  try {
    const { idRecipe } = req.params;

    let recipe = {};

    if (Boolean(Number(idRecipe))) {
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

    if (!title || !summary) throw Error("Faltan datos importantes");

    let dietArr = diets.split(",").map((e) => e.trim());
    let dishArr = dishTypes.split(",").map((e) => e.trim());

    let recipe = { title, healthScore, summary, instructions, image };

    if (await checkAtt(title, "recipe")) {
      let createdRecipe = await createRecipe(recipe);

      await saveAtt(dietArr, "diet");
      await saveAtt(dishArr, "dish");

      await createdRecipe.addDiets(await attIdSearch(dietArr, "dietId"));
      await createdRecipe.addDishTypes(await attIdSearch(dishArr, "dishId"));
    } else throw Error("La receta ya existe en la base de datos");

    res.status(201).send(`La receta ${title} se ha creado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = recipeRouter;
