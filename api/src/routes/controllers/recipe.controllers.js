require("dotenv").config();
const axios = require("axios");
const { Op, literal, fn } = require("sequelize");
const { Recipe, Diets, DishType } = require("../../db");

const { API_KEY } = process.env;

async function getAPIRecipes(name) {
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
  return recipes;
}

async function getDBRecipes(name) {
  const recipes = await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [
      {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: DishType,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return recipes;
}

async function createRecipe(obj) {
  let recipe = await Recipe.create({
    title: obj.title,
    healthScore: obj.healthScore,
    summary: obj.summary,
    instructions: obj.instructions,
    image: obj.image,
  });
  return recipe;
}

async function checkDiet(diet) {
  let check = await Diets.findOne({
    where: {
      name: diet,
    },
  });
  if (!check) return true;
}

async function checkRecipe(name) {
  let check = await Recipe.findOne({
    where: {
      title: name,
    },
  });
  if (!check) return true;
}

async function checkDish(dish) {
  let check = await DishType.findOne({
    where: {
      name: dish,
    },
  });
  if (!check) return true;
}

async function saveDiets(arr) {
  for (let diet of arr) {
    if (await checkDiet(diet)) {
      await Diets.create({ name: diet });
    }
  }
  return;
}

async function saveDishes(arr) {
  for (let dish of arr) {
    if (await checkDish(dish)) {
      await DishType.create({ name: dish });
    }
  }
  return;
}

async function dietIdSearch(arr) {
  let dietIds = [];
  for (let diet of arr) {
    let id = await Diets.findOne({
      attributes: ["id"],
      where: {
        name: diet,
      },
    });
    dietIds.push(id);
  }
  return dietIds;
}

async function dishIdSearch(arr) {
  let dishIds = [];
  for (dish of arr) {
    let id = await DishType.findOne({
      attributes: ["id"],
      where: {
        name: dish,
      },
    });
    dishIds.push(id);
  }
  return dishIds;
}

async function getAPIRecipeById(id) {
  const responseAPI = await axios(
    `https://api.spoonacular.com/recipes/${id}/information&apiKey=${API_KEY}`
  );

  let recipes = responseAPI.data.map((recipe) => {
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
  return recipes;
}

async function getDBRecipesById(id) {
  const recipes = await Recipe.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: DishType,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return recipes;
}

module.exports = {
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
};
