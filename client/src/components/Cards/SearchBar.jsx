import { useState, useEffect } from "react";
import "./searchBar.modules.css";

export default function SearchBar(props) {
  const { onSearch, diets, filterRecipes, orderCards } = props;

  const [search, setSearch] = useState("");

  const [orderBy, setOrderBy] = useState({
    by: "Alphabetical",
    order: "Ascendant",
  });

  const [filterByDiet, setFilterByDiet] = useState("All");

  useEffect(() => {
    orderCards(orderBy);
  }, [orderBy]);

  useEffect(() => {
    filterRecipes(filterByDiet);
  }, [filterByDiet]);

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
        <button className="button" onClick={() => onSearch(search, orderBy)}>
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
