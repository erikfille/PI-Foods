import { useState } from "react";
import DailyRecipes from "./DailyRecipes";
import Recipes from "./Recipes";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";

import "./renderer.modules.css";

export default function Renderer(props) {
  const { dailyRecipes, recipes, onSearch, filterRecipes, goToRecipeCreator } =
    props;

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9; // este estado local setea cuantas cartas entran por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  function paginator(n) {
    setCurrentPage(n);
  }

  return (
    <div className="rendererContainer">
      <div className="searchContainer">
        <SearchBar onSearch={onSearch} filterRecipes={filterRecipes} />
      </div>
      <br />
      {!currentRecipe.length && <DailyRecipes dailyRecipes={dailyRecipes} />}
      <Paginate
        recipesPerPage={recipesPerPage}
        allRecipes={recipes.length}
        paginator={paginator}
      />
      <hr />
      {<Recipes recipes={recipes} />}
      <button className="roundButton" onClick={() => goToRecipeCreator()}>
        <span>
          Create <br /> Your <br /> Recipe
        </span>
      </button>
    </div>
  );
}
