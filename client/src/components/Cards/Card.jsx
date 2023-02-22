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
        <h4>Diets</h4>
        {diets.map((d) => (
          <>
            <span className="mapped">{d}</span>
            <br />
          </>
        ))}
      </div>
      <div className="cardImgContainer">
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
        <h4>Dish Type</h4>
        {dishTypes.map((d) => (
          <>
            <span className="mapped">{d}</span>
            <br />
          </>
        ))}
      </div>
      <div className="cardImgContainer">
        <img className="image" src={image} alt={title} />
      </div>
    </div>
  );

  return type === "recipe" ? recipeCard : dailyRecipeCard;
}
