import React from "react";
import "./paginate.modules.css";

export default function Paginate({ recipesPerPage, allRecipes, paginator, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(currentPage)

  return pageNumbers.length ? (
    <div className="paginateDiv">
      <button className="pageButton" onClick={() => paginator(-1)}>
        ←
      </button>
      {pageNumbers.map((number) => (
        <button className={currentPage === number ? "pageButtonActive" : "pageButton"} onClick={() => paginator(number, "nro")}>
          {number}
        </button>
      ))}
      <button className="pageButton" onClick={() => paginator(1)}>
        →
      </button>
    </div>
  ) : (
    ""
  );
}
