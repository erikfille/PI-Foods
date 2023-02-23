import Card from "./Card";

export default function Recipes(props) {
  const { recipes } = props;

  return (
    <div className="recipesContainer">
      {recipes.length ? <h1>Recipes for Your Search</h1> : ""}
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
          type="recipe"
        />
      ))}
    </div>
  );
}
