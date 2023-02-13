import { Link } from "react-router-dom";

export default function Card(props) {
  const {
    id,
    title,
    healthScore,
    summary,
    instructions,
    image,
    diets,
    dishTypes,
    onClose,
  } = props;

  return (
    <div>
      <button className="closeButton" onClick={() => onClose(id)}>
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
