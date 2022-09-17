import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import finnHUB from "../apis/finnHUB";
const StockDetailPage = () => {
  const { symbol } = useParams();

  useEffect(() => {
    const fetchStockData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);

      const oneDay = currentTime - 24 * 60 * 60;
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;
      try {
        const response = await Promise.all([
          finnHUB.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnHUB.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnHUB.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        console.log(response);
      } catch (err) {}
    };
    fetchStockData();
  }, []);
  return (
    <div className="container">
      <h1 className="mt-3"> Details of {symbol} stocks</h1>
    </div>
  );
};
export default StockDetailPage;
