export const GET_RECIPES = "GET_RECIPES";
export const GET_DAILY_RECIPES = "GET_DAILY_RECIPES";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const UNFILTER_RECIPES = "UNFILTER_RECIPES";
export const ORDER_RECIPES = "ORDER_RECIPES";
export const ORDER_DAILY_RECIPES = "ORDER_DAILY_RECIPES";

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
    type: UNFILTER_RECIPES,
  };
}

export function orderRecipes(orderedRecipes) {
  return {
    type: ORDER_RECIPES,
    payload: orderedRecipes,
  };
}

export function orderDailyRecipes(orderedRecipes) {
  return {
    type: ORDER_DAILY_RECIPES,
    payload: orderedRecipes,
  };
}
