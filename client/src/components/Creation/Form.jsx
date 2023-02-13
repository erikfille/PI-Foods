import { useState } from "react";
import validation from "./validation.js";

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
    image: "",
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

  return (
    <>
    <h1>¡Create Your Recipe!</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleInputChange}
            className={errors.title && "danger"}
          />
          {errors.title && <span>{errors.title}</span>}
          <label htmlFor="healthScore">Health Score: </label>
          <input
            type="number"
            name="healthScore"
            value={inputs.healthScore}
            onChange={handleInputChange}
            className={errors.healthScore && "danger"}
          />
          {errors.healthScore && <span>{errors.healthScore}</span>}
          <label htmlFor="summary">Summary: </label>
          <input
            type="text"
            name="summary"
            value={inputs.summary}
            onChange={handleInputChange}
            className={errors.summary && "danger"}
          />
          {errors.summary && <span>{errors.summary}</span>}
          <label htmlFor="instructions">Instructions: </label>
          <input
            type="text"
            name="instructions"
            value={inputs.instructions}
            onChange={handleInputChange}
            className={errors.instructions && "danger"}
          />
          {errors.instructions && <span>{errors.instructions}</span>}
          <label htmlFor="image">Image Link: </label>
          <input
            type="text"
            name="image"
            value={inputs.image}
            onChange={handleInputChange}
            className={errors.image && "danger"}
          />
          {errors.image && <span>{errors.image}</span>}
          <label htmlFor="diets">Diets: </label>
          <input
            type="text"
            name="diets"
            value={inputs.diets}
            onChange={handleInputChange}
            className={errors.diets && "danger"}
          />
          {errors.diets && <span>{errors.diets}</span>}
          <label htmlFor="dishTypes">Dish Type: </label>
          <input
            type="text"
            name="dishTypes"
            value={inputs.dishTypes}
            onChange={handleInputChange}
            className={errors.dishTypes && "danger"}
          />
          {errors.dishTypes && <span>{errors.dishTypes}</span>}
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
