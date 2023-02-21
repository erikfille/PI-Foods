import React from "react";

export default function Paginate({ recipesPerPage, allRecipes, paginator }) {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="paginateDiv">
      {pageNumbers.map((number) => (
            <button onClick={() => paginator(number)}>{number}</button>
        ))}
    </div>
  );
}
