import DailyRecipes from "./DailyRecipes";
import Recipes from "./Recipes";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import Loader from "../AuxComps/Loader";

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

  let cardsContainer = (
    <div>
      {!currentRecipe.length && <DailyRecipes dailyRecipes={dailyRecipes} />}
      <Recipes recipes={currentRecipe} />
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
