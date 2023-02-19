import { useNavigate } from "react-router-dom";
import "./landing.modules.css";
import logo from "../../assets/img/logo.png";

export default function Landing() {
  const navigate = useNavigate();

  function enterSite() {
    navigate("/home");
  }

  return (
    <div className="landing">
      <h1 className="welcome">Welcome To</h1>
      <img className="logo" src={logo} alt="Logo/Home" />
      <br/>
      <button className="enter" onClick={() => enterSite()}>
        <span>Enter Site</span>
      </button>
    </div>
  );
}
