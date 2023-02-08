require("dotenv").config();
const recipeRouter = require("express").Router();
const axios = require("axios");
const { response } = require("express");
const { Recipe, Diets, DishType } = require("../../db");

const { API_KEY } = process.env;

recipeRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    // Consulta la API
    const responseAPI = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    );
    let recipes = responseAPI.data.results.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        healthScore: recipe.healthScore,
        summary: recipe.summary,
        instructions: recipe.analyzedInstructions,
        image: recipe.image,
        diets: recipe.diets,
        dishTypes: recipe.dishTypes,
      };
    });

    // Consulta la DB
    // const responseDB = await Recipe.findAll({
    //   where: {
    //     title: {
    //       [Op.iLike]: `%${name}%`,
    //     },
    //   },
    //   include: [{
    //     model: DishType,
    //     through: {
    //       attributes: [name]
    //     }
    //   }],
    // });
    // condicional de que exista o no responseDB, teniendo en cuenta que la funcion previa pasa por un await
    // recipes = recipes.concat(responseDB);

    res.status(200).send(recipes);
  } catch (error) {
    res.status(404).json({error: error});
  }
});


// recipeRouter.get("/", async (req, res) => {
//     try {

//     } catch (error) {
//       res.status(404).send("");
//     }
//   });

module.exports = recipeRouter;
