import React, { useState, useContext, useEffect } from "react";
import Button from "../Button/Button";
import { UserInfoContext } from "../../App";

import "./searchBar.css";

const SearchBar = ({ textSearchFunc}) => {
  const userInfo = useContext(UserInfoContext);

  const [filter, setFilter] = useState("");
  const searchFunc = (e) => {
    if (filter !== "") {
      textSearchFunc(filter);
    }
  };

  useEffect(() => {
    if (filter === "") {
      textSearchFunc("");
    }
  }, [filter]);

  return (
    <div className="search-bar">
      <div hidden={userInfo?.value === null ? true : false}>
        <input
          type="text"
          className="input-search-bar"
          placeholder="Search product by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div hidden={userInfo?.value === null ? true : false}>
        <Button
          type={"search-button"}
          testo={"Search"}
          disable={false}
          operation={(e) => searchFunc(e)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
