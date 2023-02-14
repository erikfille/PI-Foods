export const GET_RECIPES = "GET_RECIPES";
export const GET_DAILY_RECIPES = "GET_DAILY_RECIPE";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const FILTER_DAILY_RECIPES = "FILTER_DAILY_RECIPES";

export function getAllRecipes(recipes) {
  return {
    type: GET_RECIPES,
    payload: recipes,
  };
}

export function getDailyRecipes(dailyRecipes) {
  return {
      type: GET_DAILY_RECIPES,
      payload: dailyRecipes,
    };
  };

export function deleteRecipe(id) {
  return {
    type: FILTER_RECIPES,
    payload: id,
  };
}

export function deleteDailyRecipe(id) {
  return {
    type: FILTER_DAILY_RECIPES,
    payload: id,
  };
}