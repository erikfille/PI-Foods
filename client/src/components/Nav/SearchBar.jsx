import { useState, useEffect } from "react";

export default function SearchBar(props) {
  const { onSearch, filterRecipes } = props;

  const [search, setSearch] = useState("");

  const [orderBy, setOrderBy] = useState({
    by: "Alphabetical",
    order: "Ascendant",
  });

  const [filter, setFilter] = useState([]);

  const [useFilter, setUseFilter] = useState("All");

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
        setFilter(data);
      });
    return () => {
      setFilter([]);
    };
  }, []);

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  function onSelect(e) {
    setOrderBy({ ...orderBy, [e.target.name]: e.target.value });
  }

  function onFilterSelect(e) {
    setUseFilter(e.target.value);
  }

  return (
    <div className="inputContainer">
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
        <label htmlFor="diets">Filter By Diets</label>
        <select name="diets" className="input" onChange={onFilterSelect}>
          {filter.map((d) => (
            <option value={`${d}`}>{d}</option>
          ))}
        </select>
        <button className="button" onClick={() => filterRecipes(useFilter)}>
          Filter
        </button>
        <span>Order By</span>
        <select name="by" className="input" onChange={onSelect}>
          <option value="Alphabetical">Alphabetical</option>
          <option value="HealthScore">Health Score</option>
        </select>
        <select name="order" className="input" onChange={onSelect}>
          <option value="Ascendant">Ascendant</option>
          <option value="Descendant">Descendant</option>
        </select>
        <button className="button" onClick={() => onSearch(search, orderBy)}>
          Search
        </button>
      </div>
    </div>
  );
}
