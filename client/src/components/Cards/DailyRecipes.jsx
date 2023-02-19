import Card from "./Card";

export default function DailyRecipes(props) {
  const { dailyRecipes } = props;

  return (
    <div className="recipesContainer">
      <h1>Daily Meals</h1>
      {dailyRecipes.map((r, idx) => (
        <Card
          key={r.id + Math.random() * 100}
          id={r.id}
          title={r.title}
          healthScore={r.healthScore}
          summary={r.summary}
          instructions={r.instructions}
          image={r.image}
          diets={r.diets}
          dishTypes={r.dishTypes}
          type="dailyRecipe"
        />
      ))}
    </div>
  );
}
