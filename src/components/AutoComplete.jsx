import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AppContext from "../context/AppContext";
import finnHUB from "../apis/finnHUB";

const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { addStock } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnHUB.get("/search", {
          params: {
            q: search,
          },
        });
        console.log(response.data.result);
        setSearchResults(response.data.result);
      } catch (err) {}
    };
    if (search.length > 0) {
      fetchData();
    }
  }, [search]);
  const renderDropdown = () => {
    const dropDown = search ? "show" : null;
    return (
      <ul
        style={{
          height: "600px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropDown}`}
      >
        {searchResults.map((result) => {
          return (
            <li
              key={result.symbol}
              className="dropdown-item"
              onClick={() => {
                addStock(result.symbol);
                setSearch("");
              }}
            >
              {result.description}
              {result.symbol}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
          type="search"
          id="search"
          value={search || ""}
          placeholder="Search"
          className="form-control"
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
export default AutoComplete;
