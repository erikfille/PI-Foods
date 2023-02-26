import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../AuxComps/Loader";
import "./detail.modules.css";

export default function Detail() {
  const [recipe, setRecipe] = useState({
    id: "",
    title: "",
    healthScore: 0,
    summary: "",
    instructions: "",
    image: "",
    diets: [],
    dishTypes: [],
  });

  const navigate = useNavigate();

  const { recipeId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"));

    return () => setRecipe({});
  }, [recipeId]);

  function goHome() {
    return navigate("/home");
  }

  let formattedInstructions = recipe.instructions.split(".");

  let summary;

  if (Boolean(Number(recipeId))) {
    summary = (
      <h4
        className={recipe.summary.length > 140 ? "tinySummary" : "summary"}
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      ></h4>
    );
  } else {
    summary = <h4 className={recipe.summary.length > 140 ? "tinySummary" : "summary"}>{recipe.summary}</h4>;
  }

  return recipe.id ? (
    <div className="detail">
      <div className="detailContainer">
        <div className="recipeContainer">
          <div>
            <h1 className="title">{recipe.title}</h1>
            {summary}
          </div>
          <hr className="topHr" />
          {formattedInstructions.map((e) => (
            <p className={recipe.instructions.length > 140 ? "tinyInstructions" : "instructions"}>
              {e}
              <br />
            </p>
          ))}
          <hr className="botHr" />
          <div className="characteristics">
            <div className="dietsMap">
              <h4>Diets</h4>
              {recipe.diets.map((d) => (
                <span className={recipe.summary.length > 140 ? "tinySpan" : "span"}>
                  {d}
                  <br />
                </span>
              ))}
            </div>
            <div className="dishMap">
              <h4>Type of Dish</h4>
              {recipe.dishTypes.map((d) => (
                <span className={recipe.summary.length > 140 ? "tinySpan" : "span"}>
                  {d}
                  <br />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="imgContainer">
          <img className="recipe" src={recipe.image} alt={recipe.title} />
          <h3 className="healthScore">Health <br/> Score <br/> {recipe.healthScore}%</h3>
        </div>
      </div>
      <br />
      <button className="button" onClick={() => goHome()}>
        <span>Back to Recipes</span>
      </button>
    </div>
  ) : (
    <Loader />
  );
}
