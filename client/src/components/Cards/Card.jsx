import { Link } from "react-router-dom";
import "./card.modules.css";

export default function Card(props) {
  const { id, title, image, diets, dishTypes, type } = props;

  const recipeCard = (
    <div className="cardContainer">
      <div className="infoContainer">
        <hr className="topHr" />
        <Link to={`/recipes/${id}`}>
          <h1>{title}</h1>
        </Link>
        <hr className="botHr" />
        {diets.map((d) => (
          <>
            <span className="diet">{d}</span>
            <br />
          </>
        ))}
      </div>
      <div className="imgContainer">
        <img className="image" src={image} alt={title} />
      </div>
    </div>
  );

  const dailyRecipeCard = (
    <div className="cardContainer">
      <div className="infoContainer">
        <hr className="topHr" />
        <Link to={`/recipes/${id}`}>
          <h1>{title}</h1>
        </Link>
        <hr className="botHr" />
        {dishTypes.map((d) => (
          <>
            <span>{d}</span>
            <br />
          </>
        ))}
      </div>
      <div className="imgContainer">
        <img className="image" src={image} alt={title} />
      </div>
    </div>
  );

  return type === "recipe" ? recipeCard : dailyRecipeCard;
}
