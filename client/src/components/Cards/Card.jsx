import { Link } from "react-router-dom";
import "./card.modules.css";

export default function Card(props) {
  const { id, title, image, diets, dishTypes, type } = props;

  const recipeCard = (
    <div className="cardContainer">
      <div className="infoContainer">
        <div className="titleDiv">
          <hr className="topHr" />
          <Link to={`/recipes/${id}`}>
            <h1>{title}</h1>
          </Link>
          <hr className="botHr" />
          <hr className="elemHr" />
          {diets.map((d) => (
            <>
              <span>{d}</span>
              <hr className="elemHr" />
            </>
          ))}
          <hr className="elemHr" />
        </div>
        <div className="imgContainer" style={`background-image: url(${image})`}>
          {/* <img className="image" src={image} alt={title} /> */}
        </div>
      </div>
    </div>
  );

  const dailyRecipeCard = (
    <div className="cardContainer">
      <div className="infoContainer">
        <div className="titleDiv">
          <hr className="topHr" />
          <Link to={`/recipes/${id}`}>
            <h1>{title}</h1>
          </Link>
          <hr className="botHr" />
          <hr className="elemHr" />
          {dishTypes.map((d) => (
            <>
              <span>{d}</span>
              <hr className="elemHr" />
            </>
          ))}
        </div>
        <div className="imgContainer" style={`background-image: url(${image})`}>
          // <img className="image" src={image} alt={title} />
        </div>
      </div>
    </div>
  );

  return type === "recipe" ? recipeCard : dailyRecipeCard;
}
