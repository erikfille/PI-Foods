import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getDailyRecipes } from "./redux/actions";
import Nav from "./components/Nav/Nav";
import Landing from "./components/Landing/Landing";
import DailyRecipes from "./components/Cards/DailyRecipes";
import Cards from "./components/Cards/Cards";
import Detail from "./components/Cards/Detail";
import Form from "./components/Creation/Form";
import About from "./components/About/About";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const recipes = useSelector((state) => state.recipes);
  const dailyRecipes = useSelector((state) => state.dailyRecipes);

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

  function createRecipe(userData) {}

  async function onSearch(name, order) {}

  function onClose(e) {}

  return (
    <div className="App">
      {location.pathname !== "/" && (
        <Nav goToRecipeCreator={goToRecipeCreator} />
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <DailyRecipes dailyRecipes={dailyRecipes} onClose={onClose} />
          }
        />
        <Route
          path="/search"
          element={<Cards recipes={recipes} onClose={onClose} />}
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
