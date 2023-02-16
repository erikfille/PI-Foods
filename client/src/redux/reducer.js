import {
  GET_DAILY_RECIPES,
  GET_RECIPES,
  FILTER_RECIPES,
  ALL_RECIPES,
} from "./actions";

const initialState = {
  recipes: [],
  filteredRecipes: [],
  dailyRecipes: [],
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
      };
    case FILTER_RECIPES:
      return {
        ...state,
        filteredRecipes: state.recipes.filter((r) => r.diets.includes(payload)),
      };
    case ALL_RECIPES:
      return {
        ...state,
        filteredRecipes: state.recipes,
      };
    default:
      return state;
  }
}
