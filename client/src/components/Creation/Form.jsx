import { useState } from "react";
import validation from "./validation.js";
import UploadWidget from "./UploadWidget.jsx";
import "./form.modules.css";

export default function Form(props) {
  const { createRecipe } = props;

  const [inputs, setInputs] = useState({
    title: "",
    healthScore: 0,
    summary: "",
    instructions: "",
    image: "",
    diets: "",
    dishTypes: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    healthScore: "",
    summary: "",
    instructions: "",
    diets: "",
    dishTypes: "",
    state: true
  });

  function handleInputChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    createRecipe(inputs);
  }

  function onUpload(url) {
    setInputs({ ...inputs, image: url });
  }

  return (
    <div className="formContainer">
      <h1>¡Create Your Recipe!</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="inputsContainer">
            <label htmlFor="title">Title: </label>
            <br />
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
              className={errors.title ? "danger" : "formInput"}
            />
            {errors.title && <span className="errorSpan">{errors.title}<br/></span>}
            <label htmlFor="healthScore">Health Score: </label>
            <br />
            <input
              type="number"
              name="healthScore"
              value={inputs.healthScore}
              onChange={handleInputChange}
              className={errors.healthScore ? "danger" : "formInput"}
            />
            {errors.healthScore && <span className="errorSpan">{errors.healthScore}<br/></span>}
            <label htmlFor="summary">Summary: </label>
            <br />
            <textarea
              type="text"
              name="summary"
              value={inputs.summary}
              onChange={handleInputChange}
              className={errors.summary ? "danger" : "formInput"}
            />
            {errors.summary && <span className={(inputs.summary.length < 1 || inputs.summary.length >= 140) ? "errorSpan" : "charactersLeft"}>{errors.summary}<br/></span>}
            <label htmlFor="instructions">Instructions: </label>
            <br />
            <input
              type="text"
              name="instructions"
              value={inputs.instructions}
              onChange={handleInputChange}
              className={errors.instructions ? "danger" : "formInput"}
            />
            {errors.instructions && <span className="errorSpan">{errors.instructions}<br/></span>}
            <label htmlFor="diets">Diets: </label>
            <br />
            <input
              type="text"
              name="diets"
              value={inputs.diets}
              onChange={handleInputChange}
              className={errors.diets ? "danger" : "formInput"}
            />
            {errors.diets && <span className="errorSpan">{errors.diets}<br/></span>}
            <label htmlFor="dishTypes">Dish Type: </label>
            <br />
            <input
              type="text"
              name="dishTypes"
              value={inputs.dishTypes}
              onChange={handleInputChange}
              className={errors.dishTypes ? "danger" : "formInput"}
            />
            {errors.dishTypes && <span className="errorSpan">{errors.dishTypes}<br/></span>}
          </div>
          <div className="imgContainer">
            <div className="widgetButton">
              <UploadWidget onUpload={onUpload} />
              <br />
              {inputs.image && (
                <div className="uploadedImage">
                  <img src={inputs.image} alt="Uploaded" width="1vw" />
                </div>
              )}
            </div>
            {errors.state ? (
              <button className="disabledButton" disabled>
                <span>Submit Recipe</span>
              </button>
            ) : (
              <button className="submitButton">
                <span>Submit Recipe</span>
              </button>
            )}
          </div>
          <div className="floatClear"></div>
        </form>
      </div>
    </div>
  );
}
