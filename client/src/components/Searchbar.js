import React, { useState } from "react";

const Searchbar = (props) => {
  const [searched, setSearched] = useState("");
  const searchHandler = function (e) {
    e.preventDefault();
    if (searched.trim() == "") return;
    const createdId = `${searched.slice(0, 2).toUpperCase()}${searched.slice(
      2
    )}`;
    props.onSearch(createdId);
  };
  const searchInputHandler = (e) => {
    setSearched(e.target.value);
  };
  return (
    <div className="input-group-order-search">
      <form onSubmit={searchHandler}>
        <div className="form-outline">
          <input
            type="search"
            id="search"
            className="form-control"
            value={searched}
            onChange={searchInputHandler}
            placeholder="Search"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
