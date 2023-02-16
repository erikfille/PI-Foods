export const GET_RECIPES = "GET_RECIPES";
export const GET_DAILY_RECIPES = "GET_DAILY_RECIPE";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const ALL_RECIPES = "ALL_RECIPES";

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
}

export function filterRecipe(filter) {
  return {
    type: FILTER_RECIPES,
    payload: filter,
  };
}

export function unfilterRecipe() {
  return {
    type: ALL_RECIPES,
  };
}
