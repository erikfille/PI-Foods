import Card from "./Card";

export default function DailyRecipes(props) {
  const { dailyRecipes, onClose } = props;

  return (
    <div className="dailyMealsContainer">
      <h1>Daily Meals</h1>
      <hr />
      {dailyRecipes.map((r) => (
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
        />
      ))}
    </div>
  );
}
