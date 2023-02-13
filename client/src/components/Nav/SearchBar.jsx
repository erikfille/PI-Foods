import { useState } from "react";

export default function SearchBar(props) {
  const { onSearch } = props;

  const [search, setSearch] = useState("");

  const [orderBy, setOrderBy] = useState("alphabetical");

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  function onSelect(e) {
    setOrderBy(e.target.value);
  }

  return (
    <div className="inputContainer">
      <div className="searchDiv">
        <label htmlFor="search"></label>
        <input
          value={!search ? "Search a Recipe" : search}
          type="text"
          name="search"
          id="search"
          className="input"
          placeholder="What do you want to search?"
          onChange={handleInputChange}
        />
        <button className="button" onClick={() => onSearch(search, orderBy)}>
          Search
        </button>
      </div>
      <div>
        <span>Order By</span>
        <select name="type" className="input" onChange={onSelect}>
          <option value="HealthScore">Health Score</option>
          <option value="Alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
  );
}
