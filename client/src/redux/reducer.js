import {
  GET_DAILY_RECIPES,
  GET_RECIPES,
  FILTER_RECIPES,
  UNFILTER_RECIPES,
  ORDER_RECIPES,
  ORDER_DAILY_RECIPES,
} from "./actions";

const initialState = {
  recipes: [],
  filteredRecipes: [],
  dailyRecipes: [],
  filteredDailyRecipes: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        filteredRecipes: payload,
      };
    case GET_DAILY_RECIPES:
      return {
        ...state,
        dailyRecipes: payload,
        filteredDailyRecipes: payload,
      };
    case FILTER_RECIPES:
      return {
        ...state,
        filteredRecipes: state.recipes.filter((r) => r.diets.includes(payload)),
        filteredDailyRecipes: state.dailyRecipes.filter((r) =>
          r.diets.includes(payload)
        ),
      };
    case UNFILTER_RECIPES:
      return {
        ...state,
        filteredRecipes: state.recipes,
        filteredDailyRecipes: state.dailyRecipes,
      };
    case ORDER_RECIPES:
      return {
        ...state,
        filteredRecipes: payload,
      };
    case ORDER_DAILY_RECIPES:
      return {
        ...state,
        filteredDailyRecipes: payload,
      };
    default:
      return state;
  }
}
