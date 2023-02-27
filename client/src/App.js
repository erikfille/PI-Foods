import "./App.css";
import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  getDailyRecipes,
  unfilterRecipe,
  filterRecipe,
  orderRecipes,
  orderDailyRecipes,
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
  const dailyRecipes = useSelector((state) => state.filteredDailyRecipes);

  const [loading, setLoading] = useState(false);
  const [diets, setDiets] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState({
    by: "Alphabetical",
    order: "Ascendant",
  });
  const [filterByDiet, setFilterByDiet] = useState("All");

  const recipesPerPage = 9; // este estado local setea cuantas cartas entran por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    let search = searchParams.get("search");
    let page = searchParams.get("page");
    let by = searchParams.get("by");
    let order = searchParams.get("order");
    let filter = searchParams.get("filter");

    if (search) {
      setSearch(search);
      onSearch(search);
    }
    if (page) {
      paginator(page, "num");
    }
    orderCards({ by, order });
    filterRecipes(filter);
  }, []);

  // Modifica la query segun el estado.
  useEffect(() => {
    let by = orderBy.by || "Alphabetical";
    let order = orderBy.order || "Ascendant";
    let searchParam = search || "";
    let filter = filterByDiet || "All";
    setSearchParams({
      search: searchParam,
      page: currentPage,
      filter,
      by,
      order,
    });
  }, [search, currentPage, orderBy, filterByDiet]);

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/all`)
      .then((response) => response.json())
      .then((data) => {
        let dailyMeals = [];

        let breakfast = data.find((r) => r.dishTypes.includes("Breakfast"));
        let lunch =
          data.find((r) => r.dishTypes.includes("Lunch") && r !== breakfast) ||
          data.find((r) => r.dishTypes.includes("Lunch"));
        let brunch =
          data.find(
            (r) =>
              r.dishTypes.includes("Brunch") && r !== breakfast && r !== lunch
          ) || data.find((r) => r.dishTypes.includes("Brunch"));
        let dinner =
          data.find(
            (r) =>
              r.dishTypes.includes("Dinner") &&
              r !== breakfast &&
              r !== lunch &&
              r !== brunch
          ) || data.find((r) => r.dishTypes.includes("Dinner"));

        dailyMeals.push(breakfast, lunch, brunch, dinner);

        dispatch(getDailyRecipes(dailyMeals));
      });
  }, [dispatch]);

  useEffect(() => {
    fetch("http://localhost:3001/diet/")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        data.unshift("All");
        setDiets(data);
      });
    return () => {
      setDiets([]);
    };
  }, []);

  function paginator(n, str) {
    if (str) {
      setCurrentPage(n);
    } else {
      setCurrentPage(currentPage + n);
    }
  }

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  function onFilterSelect(e) {
    e.preventDefault();
    if (e.target.value !== filterByDiet) {
      setFilterByDiet(e.target.value);
      filterRecipes(e.target.value);
    }
  }

  function onSelect(e) {
    e.preventDefault();
    setOrderBy({ ...orderBy, [e.target.name]: e.target.value });
    orderCards({ ...orderBy, [e.target.name]: e.target.value });
  }

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
    let data = await response.json();
    setLoading(false);
    return window.alert(data.res);
  }

  async function onSearch(name) {
    setLoading(true);
    await fetch(`http://localhost:3001/recipes?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(getAllRecipes(data));
        setLoading(false);
      });
  }

  function filterRecipes(filter) {
    if (filter === "All") dispatch(unfilterRecipe());
    else if (filter !== "All") dispatch(filterRecipe(filter));
  }

  function orderCards(order) {
    let orderedRecipes = [];
    let orderedDailyRecipes = [];
    if (order.by === "Alphabetical") {
      orderedRecipes = [...recipes].sort((a, b) =>
        sortTitle(a, b, order.order)
      );
      orderedDailyRecipes = [...dailyRecipes].sort((a, b) =>
        sortTitle(a, b, order.order)
      );
    } else if (order.by === "HealthScore") {
      orderedRecipes = [...recipes].sort((a, b) =>
        sortHealthScore(a, b, order.order)
      );
      orderedDailyRecipes = [...dailyRecipes].sort((a, b) =>
        sortHealthScore(a, b, order.order)
      );
    }
    if (orderedRecipes.length) dispatch(orderRecipes(orderedRecipes));
    if (orderedDailyRecipes.length)
      dispatch(orderDailyRecipes(orderedDailyRecipes));
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

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <Renderer
              recipes={recipes}
              onSearch={onSearch}
              goToRecipeCreator={goToRecipeCreator}
              loading={loading}
              dailyRecipes={dailyRecipes}
              diets={diets}
              handleInputChange={handleInputChange}
              onFilterSelect={onFilterSelect}
              onSelect={onSelect}
              search={search}
              currentRecipe={currentRecipe}
              recipesPerPage={recipesPerPage}
              paginator={paginator}
              currentPage={currentPage}
            />
          }
        />
        <Route path="/recipes/:recipeId" element={<Detail />} />
        <Route
          path="/createRecipe"
          element={<Form createRecipe={createRecipe} loading={loading} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
