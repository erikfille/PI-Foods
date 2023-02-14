import Card from "./Card";

export default function Cards(props) {
  const { recipes, onClose } = props;

  return recipes.map((r) => (
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
  ));
}
