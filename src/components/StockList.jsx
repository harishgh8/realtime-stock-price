import React from "react";
import { BsFillCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import finnHUB from "../apis/finnHUB";
import { useNavigate } from "react-router-dom";
const StockList = () => {
  const [stock, setStock] = useState([]);
  const navigate = useNavigate();
  const { watchList } = useContext(AppContext);

  useEffect(() => {
    const fetchResp = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHUB.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });

        setStock(data);
      } catch (err) {}
    };

    fetchResp();
  }, [watchList]);

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };
  const renderIcon = (change) => {
    return change < 0 ? <BsCaretDownFill /> : <BsFillCaretUpFill />;
  };
  const handleSelectStock = (symbol) => {
    navigate(`/detail/${symbol}`);
  };
  return (
    <div className="container">
      <table className="table hover mat-5">
        <thead>
          <tr>
            <th scope="col">Name </th>
            <th scope="col">Last </th>
            <th scope="col">Chg </th>
            <th scope="col">Chg% </th>
            <th scope="col">High </th>
            <th scope="col">Low </th>
            <th scope="col">Open </th>
            <th scope="col">PClose </th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stocks) => (
            <tr
              style={{ cursor: "pointer" }}
              className="table-row"
              key={stocks.symbol}
              onClick={() => handleSelectStock(stocks.symbol)}
            >
              <th scope="row">{stocks.symbol}</th>
              <td>{stocks.data.c}</td>
              <td className={`text-${changeColor(stocks.data.d)}`}>
                {stocks.data.d}
                {renderIcon(stocks.data.d)}
              </td>
              <td className={`text-${changeColor(stocks.data.dp)}`}>
                {stocks.data.dp} {renderIcon(stocks.data.dp)}
              </td>
              <td>{stocks.data.h}</td>
              <td>{stocks.data.l}</td>
              <td>{stocks.data.o}</td>
              <td>{stocks.data.pc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StockList;
