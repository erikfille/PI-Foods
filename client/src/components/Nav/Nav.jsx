import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "./nav.modules.css";

export default function Nav(props) {
  return (
    <nav className="navContainer">
      <Link to="/home">
        <img className="img" src={logo} alt="Logo/Home" />
      </Link>
      <br />
      <div className="pageLinks">
        <Link to="/about" className="link">
          About
        </Link>
      </div>
    </nav>
  );
}
