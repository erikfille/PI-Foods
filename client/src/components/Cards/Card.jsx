import { Link } from "react-router-dom";

export default function Card(props) {
  const { id, title, image, diets, dishTypes, onClose, type } = props;

  const recipeCard = (
    <div>
      <button className="closeButton" onClick={() => onClose(id, type)}>
        X
      </button>
      <div>
        <Link to={`/recipes/${id}`}>
          <h1>{title}</h1>
        </Link>
        <>
          {diets.map((d) => (
            <span>{d}</span>
          ))}
        </>
        <hr />
      </div>
      <div>
        <img src={image} alt={title} />
      </div>
    </div>
  );

  const dailyRecipeCard = (
    <div>
      <button className="closeButton" onClick={() => onClose(id, type)}>
        X
      </button>
      <div>
        <Link to={`/recipes/${id}`}>
          <h1>{title}</h1>
        </Link>
        <>
          {dishTypes.map((d) => (
            <span>{d}</span>
          ))}
        </>
        <hr />
      </div>
      <div>
        <img src={image} alt={title} />
      </div>
    </div>
  );

  return type === "recipe" ? recipeCard : dailyRecipeCard;
}
