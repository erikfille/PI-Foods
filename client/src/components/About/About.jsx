import profilePic from "../../assets/img/profilePic.jpg";
import "./about.modules.css";

export default function About(props) {
  return (
    <div className="aboutContainer">
      <div className="titleContainer">
        <div className="profilePic">
          <img src={profilePic} alt="Foto de Erik" />
        </div>
        <h1>
          Created by <br />
          Erik Filleaudeau
        </h1>
      </div>
      <hr className="divisor" />
      <div className="aboutMe">
        <p>
          Hi! My name is Erik, and I'm <b>your future Fullstack Dev</b>.{" "}
        </p>
        <p>
          I'm a <b>highly motivated learner</b>, with <b>great comprehension</b>{" "}
          and <b>communication skills</b> and <b>team leading experience</b> as <b>Project Manager</b> &{" "}
          <b>Creative Director</b>.
        </p>{" "}
        <p>
          I'm really good at <b>troubleshooting</b> and{" "}
          <b>resource optimization</b> through both <b>logical</b> and{" "}
          <b>creative thinking</b>.
        </p>
      </div>
    </div>
  );
}
