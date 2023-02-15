import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  getDailyRecipes,
  deleteRecipe,
  deleteDailyRecipe,
  changePage,
} from "./redux/actions";
import Nav from "./components/Nav/Nav";
import Landing from "./components/Landing/Landing";
import DailyRecipes from "./components/Cards/DailyRecipes";
import Renderer from "./components/Cards/Renderer";
import Detail from "./components/Cards/Detail";
import Form from "./components/Creation/Form";
import About from "./components/About/About";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const recipes = useSelector((state) => state.recipes);
  const dailyRecipes = useSelector((state) => state.filteredDailyRecipes);

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/all`)
      .then((response) => response.json())
      .then((data) => {
        let dailyMeals = [];

        let breakfast = data.find((r) => r.dishTypes.includes("Breakfast"));
        let lunch = data.find((r) => r.dishTypes.includes("Lunch"));
        let brunch = data.find((r) => r.dishTypes.includes("Brunch"));
        let dinner = data.find((r) => r.dishTypes.includes("Dinner"));

        dailyMeals.push(breakfast, lunch, brunch, dinner);

        dispatch(getDailyRecipes(dailyMeals));
      });
  }, []);

  function goToRecipeCreator() {
    return navigate("/createRecipe");
  }

  async function createRecipe(userData) {
    console.log(userData);
    const response = await fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return window.alert(response);
  }

  function sortTitle(a, b, order) {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    if (order === "Ascendant") {
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    } else if (order === "Descendant") {
      if (titleB < titleA) return -1;
      if (titleB > titleA) return 1;
      return 0;
    }
  }

  function sortHealthScore(a, b, order) {
    if (order === "Ascendant") return a.healthScore - b.healthScore;
    else if (order === "Descendant") return b.healthScore - a.healthScore;
  }

  async function onSearch(name, order) {
    await fetch(`http://localhost:3001/recipes?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let recipes = [];
        if (order.by === "Alphabetical") {
          recipes = data.sort((a, b) => sortTitle(a, b, order.order));
        }
        if (order.by === "HealthScore") {
          recipes = data.sort((a, b) => sortHealthScore(a, b, order.order));
        }
        console.log(recipes);
        dispatch(getAllRecipes(recipes));
      });
  }

  function onPageChange() {}

  function onClose(id, type) {
    if (type === "recipe") {
      dispatch(deleteRecipe(id));
    }
    if (type === "dailyRecipe") {
      dispatch(deleteDailyRecipe(id));
    }
  }

  return (
    <div className="App">
      {location.pathname !== "/" && (
        <Nav onSearch={onSearch} goToRecipeCreator={goToRecipeCreator} />
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <Renderer
              dailyRecipes={dailyRecipes}
              recipes={recipes}
              onPageChange={onPageChange}
              onClose={onClose}
            />
          }
        />
        <Route path="/recipe/:recipeId" element={<Detail />} />
        <Route
          path="/createRecipe"
          element={<Form createRecipe={createRecipe} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
