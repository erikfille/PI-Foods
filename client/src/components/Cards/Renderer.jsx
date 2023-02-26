import { useState } from "react";
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
    filterRecipes,
    orderCards,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9; // este estado local setea cuantas cartas entran por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  function paginator(n, str) {
    if (str) {
      setCurrentPage(n);
    } else {
      setCurrentPage(currentPage + n);
    }
  }

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
        setCurrentPage={setCurrentPage}
        recipes={recipes}
        dailyRecipes={dailyRecipes}
        orderCards={orderCards}
        filterRecipes={filterRecipes}
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
