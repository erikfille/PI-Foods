import { useSelector } from "react-redux";
import Card from "./Card";
import DailyRecipes from "./DailyRecipes";

export default function Renderer(props) {
  const { dailyRecipes, recipes, onClose } = props;

  const pageNumbers = Math.ceil(
    useSelector((state) => state.recipes).length / 9
  );

  console.log(pageNumbers);

  return (
    <div>
      {!recipes.length && (
        <div className="dailyMealsContainer">
          <DailyRecipes dailyRecipes={dailyRecipes} onClose={onClose} />
        </div>
      )}
      <div></div>
      <hr />
      <div className="recipesContainer">
        {recipes.map((r) => (
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
