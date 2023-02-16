import { Link } from "react-router-dom";

export default function Card(props) {
  const { id, title, image, diets, dishTypes, type } = props;

  const recipeCard = (
    <div>
      <div>
        <Link to={`/recipes/${id}`}>
          <h1 className="title">{title}</h1>
        </Link>
        <>
          {diets.map((d) => (
            <span>{d}</span>
          ))}
        </>
        <hr />
      </div>
      <div className="imgContainer">
        <img src={image} alt={title} />
      </div>
    </div>
  );

  const dailyRecipeCard = (
    <div>
      <div>
        <Link to={`/recipes/${id}`}>
          <h1 className="title">{title}</h1>
        </Link>
        <>
          {dishTypes.map((d) => (
            <span>{d}</span>
          ))}
        </>
        <hr />
      </div>
      <div className="imgContainer">
        <img src={image} alt={title} />
      </div>
    </div>
  );

  return type === "recipe" ? recipeCard : dailyRecipeCard;
}
