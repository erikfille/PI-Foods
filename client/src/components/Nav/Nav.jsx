import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo.jpg"

export default function Nav(props) {
  const { onSearch, goToRecipeCreator } = props;

  return (
    <div className="navContainer">
      <Link to="/home">
      <img className="img" src={logo} alt="Logo/Home" width="200px"/>
      </Link>
      <SearchBar onSearch={onSearch} />
      <Link to="/about" className="link">About</Link>
      <button className="createRecipe" onClick={() => goToRecipeCreator()}>Create Your Recipe</button>
    </div>
  );
}