import React from "react";

import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";

const StockOverviewPage = () => {
  return (
    <div className="container">
      <div
        className="float-center mt-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1> Stock Overview</h1>
      </div>
      <AutoComplete />
      <StockList />
    </div>
  );
};
export default StockOverviewPage;
