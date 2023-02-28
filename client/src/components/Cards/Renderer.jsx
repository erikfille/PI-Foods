import DailyRecipes from "./DailyRecipes";
import Recipes from "./Recipes";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import Loader from "../Loader/Loader.jsx";

import "./renderer.modules.css";

export default function Renderer(props) {
  const {
    recipes,
    dailyRecipes,
    goToRecipeCreator,
    loading,
    onSearch,
    diets,
    handleInputChange,
    onFilterSelect,
    onSelect,
    search,
    currentRecipe,
    recipesPerPage,
    paginator,
    currentPage,
  } = props;

  function showRecipes() {
    if(!recipes.length && !dailyRecipes.length) return <h1 className="errorH1">There are no recipes with that specifications</h1>
    if(!recipes.length) return <DailyRecipes dailyRecipes={dailyRecipes} />
    else return <Recipes recipes={currentRecipe} />
  }

  let cardsContainer = (
    <div>
      {showRecipes()}
      <Paginate
        recipesPerPage={recipesPerPage}
        allRecipes={recipes.length}
        paginator={paginator}
        currentPage={currentPage}
      />
    </div>
  );

  return (
    <div className="rendererContainer">
      <SearchBar
        diets={diets}
        onSearch={onSearch}
        recipes={recipes}
        dailyRecipes={dailyRecipes}
        handleInputChange={handleInputChange}
        onFilterSelect={onFilterSelect}
        onSelect={onSelect}
        search={search}
      />
      <br />
      {loading ? <Loader /> : cardsContainer}
      <button className="roundButton" onClick={() => goToRecipeCreator()}>
        <span>
          Create <br /> Your <br /> Recipe
        </span>
      </button>
    </div>
  );
}
