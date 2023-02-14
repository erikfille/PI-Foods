import { Link, useNavigate } from "react-router-dom";

export default function Detail(props) {
  const {
    id,
    title,
    healthScore,
    summary,
    instructions,
    image,
    diets,
    dishTypes,
  } = props;

  const navigate = useNavigate();

  function goHome() {
    return navigate("/home");
  }

  return (
    <div>
      <button className="closeButton" onClick={() => goHome()}>
        Back to Recipes
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
        <>
          {dishTypes.map((d) => (
            <span>{d}</span>
          ))}
        </>
        <hr />
      </div>
      <h4>{summary}</h4>
      <p>{instructions}</p>
      <div>
        <img src={image} alt={title} />
        <h3>Health Score: {healthScore}</h3>
      </div>
    </div>
  );
}
