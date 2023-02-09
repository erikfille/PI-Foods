require("dotenv").config();
const axios = require("axios");
const { Op, literal, fn } = require("sequelize");
const { Recipe, Diets, DishType } = require("../../db");

const { API_KEY } = process.env;

async function createDiets() {
  let dbDiets = await getDbDiets();

  if (dbDiets.length === 0) {
    let basicDiets = [
      { name: "Gluten free" },
      { name: "Ketogenic" },
      { name: "Vegan" },
      { name: "Vegetarian" },
      { name: "Lacto-Vegetarian" },
      { name: "Ovo-Vegetarian" },
      { name: "Pescatarian" },
      { name: "Paleo" },
      { name: "Primal" },
      { name: "Low FODMAP" },
      { name: "Whole30" },
    ];
    return await Diets.bulkCreate(basicDiets);
  } else return;
}

async function getApiDiets() {
  const responseAPI = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
  );
  let diets = responseAPI.data.results.map((recipe) => recipe.diets).flat(2).map(d => `${d[0].toUpperCase()}${d.substring(1)}`);

  normDiets = diets.map(d => `${d[0].toUpperCase()}${d.substring(1)}`)

  return normDiets;
}

async function getDbDiets() {
  let dbQuery = await Diets.findAll({
    attributes: ["name"],
  });

  let diets = dbQuery.map((diet) => diet.dataValues.name);

  return diets;
}

async function getDiets() {
  const apiDiets = await getApiDiets();
  const dbDiets = await getDbDiets();

  let diets = apiDiets.concat(dbDiets).flat(2);

  for (let diet in diets) {
    diet[0] = diet[0].toUpperCase();
  }

  let setDiets = new Set(diets);

  return [...setDiets];
}

module.exports = {
  getDiets,
  createDiets,
};
