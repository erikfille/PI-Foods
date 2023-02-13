import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  function enterSite() {
    navigate("/home")
  }

  return (
    <div>
      <h1>The Good Cook Book</h1>
      <button className="enter" onClick={()=>enterSite()}>
        Enter Site
      </button>
    </div>
  );
}
