import { useState } from "react";

export default function SearchBar(props) {
  const { onSearch } = props;

  const [search, setSearch] = useState("");

  const [orderBy, setOrderBy] = useState({
    by: "Alphabetical",
    order: "Ascendant",
  });

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  function onSelect(e) {
    setOrderBy({ ...orderBy, [e.target.name]: e.target.value });
  }

  return (
    <div className="inputContainer">
      <div className="searchDiv">
        <label htmlFor="search"></label>
        <input
          value={search}
          type="text"
          name="search"
          id="search"
          className="input"
          placeholder="Search for a Recipe"
          onChange={handleInputChange}
        />
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
