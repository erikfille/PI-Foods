import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  getDailyRecipes,
  filterRecipe,
  unfilterRecipe,
} from "./redux/actions";
import Nav from "./components/Nav/Nav";
import Landing from "./components/Landing/Landing";
import Renderer from "./components/Cards/Renderer";
import Detail from "./components/Cards/Detail";
import Form from "./components/Creation/Form";
import About from "./components/About/About";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const recipes = useSelector((state) => state.filteredRecipes);
  const dailyRecipes = useSelector((state) => state.dailyRecipes);

  const [loading, setLoading] = useState(false);

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
  }, [dispatch]);

  function goToRecipeCreator() {
    return navigate("/createRecipe");
  }

  async function createRecipe(userData) {
    setLoading(true);
    const response = await fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    setLoading(false);
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
    setLoading(true);
    await fetch(`http://localhost:3001/recipes?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        let recipes = [];
        if (order.by === "Alphabetical") {
          recipes = data.sort((a, b) => sortTitle(a, b, order.order));
        }
        if (order.by === "HealthScore") {
          recipes = data.sort((a, b) => sortHealthScore(a, b, order.order));
        }
        setLoading(false);
        dispatch(getAllRecipes(recipes));
      });
  }

  function filterRecipes(filter) {
    if (filter === "All") dispatch(unfilterRecipe());
    if (filter !== "All") dispatch(filterRecipe(filter));
  }

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <Renderer
              dailyRecipes={dailyRecipes}
              recipes={recipes}
              onSearch={onSearch}
              filterRecipes={filterRecipes}
              goToRecipeCreator={goToRecipeCreator}
              loading={loading}
            />
          }
        />
        <Route path="/recipes/:recipeId" element={<Detail />} />
        <Route
          path="/createRecipe"
          element={<Form createRecipe={createRecipe} loading={loading}/>}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
