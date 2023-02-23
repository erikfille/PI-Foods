import React from "react";

export default function Paginate({ recipesPerPage, allRecipes, paginator }) {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return pageNumbers.length ? (
    <div className="paginateDiv">
      <button onClick={() => paginator(-1)}>←</button>
      {pageNumbers.map((number) => (
        <button onClick={() => paginator(number, "nro")}>{number}</button>
      ))}
      <button onClick={() => paginator(1)}>→</button>
    </div>
  ) : (
    ""
  );
}
