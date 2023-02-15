import { useState } from "react";
import Card from "./Card";
import DailyRecipes from "./DailyRecipes";
import Paginate from "./Paginate";

export default function Renderer(props) {
  const { dailyRecipes, recipes, onClose } = props;


  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9; // este estado local setea cuantas cartas entran por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  function paginator(n){
    setCurrentPage(n)
  }

  return (
    <div>
      {!currentRecipe.length && (
        <div className="dailyMealsContainer">
          <DailyRecipes dailyRecipes={dailyRecipes} onClose={onClose} />
        </div>
      )}
      <div>
      <Paginate
        recipesPerPage={recipesPerPage}
        allRecipes={recipes.length}
        paginator={paginator}
      />
      </div>
      <hr />
      <div className="recipesContainer">
        {currentRecipe.map((r) => (
          <Card
            key={r.id}
            id={r.id}
            title={r.title}
            healthScore={r.healthScore}
            summary={r.summary}
            instructions={r.instructions}
            image={r.image}
            diets={r.diets}
            dishTypes={r.dishTypes}
            onClose={onClose}
            type="recipe"
          />
        ))}
      </div>
      ;
    </div>
  );
}
