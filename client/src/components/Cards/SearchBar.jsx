import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./searchBar.modules.css";

export default function SearchBar(props) {
  const { onSearch, diets, filterRecipes, orderCards } = props;

  const location = useLocation();

  const [search, setSearch] = useState("");

  const [orderBy, setOrderBy] = useState({
    by: "Alphabetical",
    order: "Ascendant",
  });

  const [filterByDiet, setFilterByDiet] = useState("All");

  let [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    orderCards(orderBy);
  }, [orderBy]);

  useEffect(() => {
    filterRecipes(filterByDiet);
  }, [filterByDiet]);

  // Modifica la query segun el estado.
  useEffect(() => {
    let by = orderBy.by;
    let order = orderBy.order;
    setSearchParams({ filterByDiet, by, order });
  }, [orderBy, filterByDiet]);

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  function onFilterSelect(e) {
    e.preventDefault();
    if (e.target.value !== filterByDiet) {
      setFilterByDiet(e.target.value);
    }
  }

  function onSelect(e) {
    e.preventDefault();
    setOrderBy({ ...orderBy, [e.target.name]: e.target.value });
  }

  return (
    <div className="searchContainer">
      <div className="searchDiv">
        <label htmlFor="search">Search</label>
        <input
          value={search}
          type="text"
          name="search"
          id="search"
          className="input"
          placeholder="Search for a Recipe"
          onChange={handleInputChange}
        />
        <button className="button" onClick={() => onSearch(search)}>
          <span>Search</span>
        </button>
      </div>
      <div className="filterDiv">
        <span>Order By</span>
        <select name="by" className="input" onChange={onSelect}>
          <option value="Alphabetical">Alphabetical</option>
          <option value="HealthScore">Health Score</option>
        </select>
        <select name="order" className="input" onChange={onSelect}>
          <option value="Ascendant">Ascendant</option>
          <option value="Descendant">Descendant</option>
        </select>
        <label htmlFor="diets">Filter By Diets</label>
        <select name="diets" className="input" onChange={onFilterSelect}>
          {diets.map((d, i) => (
            <option key={i} value={`${d}`}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
