import profilePic from "../../assets/img/profilePic.jpg";

export default function About(props) {
  return (
    <div className="aboutContainer">
      <div>
        <img src={profilePic} alt="Foto de Erik" width="200px" height="auto" />
        <h1>
          Creado por <br />
          Erik Filleaudeau
        </h1>
      </div>
      <hr />
      <div>
        <p>
          <b>Diseñador Gráfico</b> y <b>Editor de Video</b> con base en la
          ciudad de La Plata, con <b> amplia experiencia</b> y{" "}
          <b> conocimientos</b> en dichas áreas.
        </p>
        <p>
          Son estos conocimientos y experiencia, mas el constante aprendizaje y
          ajuste de <b>habilidades blandas</b>, y una gran capacidad para la{" "}
          <b>organización</b>, <b>comunicación</b> y <b>aprendizaje rápido</b> a
          través de la investigación, los que me han permitido alcanzar el rango
          de <b>director creativo</b> en proyectos con{" "}
          <b>equipos de trabajo multidisciplinarios</b>.
        </p>
      </div>
    </div>
  );
}
