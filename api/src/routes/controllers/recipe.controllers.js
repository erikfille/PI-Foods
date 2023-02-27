require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diets, DishType } = require("../../db");

const { API_KEY } = process.env;

// Limpiar info innecesaria del get de recetas general

async function getAPIRecipes(name) {
  const responseAPI = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
  );

  let recipes = responseAPI.data.results.map((recipe) => {
    const diets =
      recipe.diets.length > 1
        ? recipe.diets.map((d) => `${d[0].toUpperCase()}${d.substring(1)}`)
        : ["Sin Especificar"];
    let newRecipe = {
      id: recipe.id,
      title: recipe.title,
      healthScore: recipe.healthScore,
      summary: recipe.summary,
      instructions: recipe.analyzedInstructions,
      image: recipe.image,
      diets: diets,
      dishTypes: recipe.dishTypes.map(
        (d) => `${d[0].toUpperCase()}${d.substring(1)}`
      ),
    };

    let instructions = newRecipe.instructions
      .map((i) => i.steps.map((s) => `${s.number}) ${s.step}`).join(" "))
      .join();

    newRecipe.instructions = instructions;

    return newRecipe;
  });

  if (name) {
    recipes = recipes.filter((e) => e.title.includes(name));
  }
  return recipes;
}

async function getDBRecipes(name) {
  let dbQuery = [];
  if (name) {
    dbQuery = await Recipe.findAll({
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
  } else {
    dbQuery = await Recipe.findAll({
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
  }

  return dbNormalizer(dbQuery);
}

async function createRecipe(obj) {
  let recipe = await Recipe.create({
    title: obj.title,
    healthScore: obj.healthScore,
    summary: obj.summary,
    analyzedInstructions: obj.instructions,
    image: obj.image,
  });
  return recipe;
}

async function checkAtt(att, str) {
  let check;
  if (str === "diet") {
    check = await Diets.findOne({
      where: {
        name: att,
      },
    });
  }
  if (str === "dish") {
    check = await DishType.findOne({
      where: {
        name: att,
      },
    });
  }
  if (str === "recipe") {
    check = await Recipe.findOne({
      where: {
        title: att,
      },
    });
  }
  if (!check) return true;
}

async function saveAtt(arr, str) {
  if (str === "diet") {
    for (let diet of arr) {
      if (await checkAtt(diet, "diet")) {
        await Diets.create({ name: diet });
      }
    }
    return;
  }
  if (str === "dish") {
    for (let dish of arr) {
      if (await checkAtt(dish, "dish")) {
        await DishType.create({ name: dish });
      }
    }
    return;
  }
}

async function attIdSearch(arr, str) {
  if (str === "dishId") {
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
  if (str === "dietId") {
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
}

async function getAPIRecipeById(id) {
  const responseAPI = await axios(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );

  let recipe = responseAPI.data;

  let instructions = recipe.analyzedInstructions
    .map((i) => i.steps.map((s) => `${s.number}) ${s.step}`).join(" "))
    .join();

  return {
    id: recipe.id,
    title: recipe.title,
    healthScore: recipe.healthScore,
    summary: recipe.summary,
    instructions: instructions,
    image: recipe.image,
    diets: recipe.diets || ["Sin Especificar"],
    dishTypes: recipe.dishTypes,
  };
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
  return dbNormalizer([recipes])[0]; // la ejecuto como un array y la devuelvo en su index 0 ya que es una busqueda de único elemento y necesito que se ejecute como un array para pasar por dbNormalizer()
}

function dbNormalizer(query) {
  // Normalizo mi query
  let recipes = query.map((recipe) => {
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

  // Convierto los atributos DishType y Diets en un array de strings
  recipes.forEach((recipe) => {
    let mapDiets = recipe.diets.map((e) => e.name);
    recipe.diets = mapDiets;
    let mapDishes = recipe.dishTypes.map((e) => e.name);
    recipe.dishTypes = mapDishes;
  });

  return recipes;
}

module.exports = {
  getAPIRecipes,
  getDBRecipes,
  getAPIRecipeById,
  getDBRecipesById,
  attIdSearch,
  checkAtt,
  saveAtt,
  createRecipe,
};
