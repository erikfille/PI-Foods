import {
  GET_DAILY_RECIPES,
  GET_RECIPES,
  FILTER_RECIPES,
  FILTER_DAILY_RECIPES,
  CHANGE_PAGE
} from "./actions";

const initialState = {
  recipes: [],
  filteredRecipes: [],
  dailyRecipes: [],
  filteredDailyRecipes: [],
  recipePage: 1,
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
        filteredRecipes: state.recipes.filter((c) => c.id !== payload),
      };
    case FILTER_DAILY_RECIPES:
      return {
        ...state,
        filteredDailyRecipes: state.filteredDailyRecipes.filter(
          (c) => c.id !== payload
        ),
      };
    case CHANGE_PAGE:
      return {
        ...state,
        recipePage: payload,
      };
    default:
      return state;
  }
}
