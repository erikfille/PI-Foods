import React from "react";

export default function Paginate({ recipesPerPage, allRecipes, paginator }) {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="paginado">
      <ul>
        {pageNumbers.map((number) => (
          <li>
            <a href="#" onClick={() => paginator(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
