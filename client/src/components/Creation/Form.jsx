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
          <div className="options">
            <label htmlFor="title">Title: </label>
            <br />
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
              className={errors.title && "danger"}
            />
            {errors.title && <span>{errors.title}</span>}
          </div>
          <div className="options">
            <label htmlFor="healthScore">Health Score: </label>
            <br />
            <input
              type="number"
              name="healthScore"
              value={inputs.healthScore}
              onChange={handleInputChange}
              className={errors.healthScore && "danger"}
            />
            {errors.healthScore && <span>{errors.healthScore}</span>}
          </div>
          <div className="options">
            <label htmlFor="summary">Summary: </label>
            <br />
            <textarea
              type="text"
              name="summary"
              value={inputs.summary}
              onChange={handleInputChange}
              className={errors.summary && "danger"}
            />
            {errors.summary && <span>{errors.summary}</span>}
          </div>
          <div className="options">
            <label htmlFor="instructions">Instructions: </label>
            <br />
            <input
              type="text"
              name="instructions"
              value={inputs.instructions}
              onChange={handleInputChange}
              className={errors.instructions && "danger"}
            />
            {errors.instructions && <span>{errors.instructions}</span>}
          </div>
          <div className="options">
            <label htmlFor="diets">Diets: </label>
            <br />
            <input
              type="text"
              name="diets"
              value={inputs.diets}
              onChange={handleInputChange}
              className={errors.diets && "danger"}
            />
            {errors.diets && <span>{errors.diets}</span>}
          </div>
          <div className="options">
            <label htmlFor="dishTypes">Dish Type: </label>
            <br />
            <input
              type="text"
              name="dishTypes"
              value={inputs.dishTypes}
              onChange={handleInputChange}
              className={errors.dishTypes && "danger"}
            />
            {errors.dishTypes && <span>{errors.dishTypes}</span>}
          </div>
          <UploadWidget onUpload={onUpload} /> <br />
          {/* <div className="options">
            <label htmlFor="file">Image: </label>
            <br />
            <input
              type="file"
              name="file"
              value={inputs.image}
              onChange={uploadImage}
              className={errors.image && "danger"}
            />
            {errors.image && <span>{errors.image}</span>}
          </div> */}
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
