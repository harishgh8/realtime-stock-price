import { createContext, useState, useEffect } from "react";
import finnHUB from "../apis/finnHUB";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(["GOOGl", "AMZN", "MSFT"]);

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock]);
    }
  };

  const deleteStock = (stock) => {
    setWatchList(
      watchList.filter((el) => {
        return el !== stock;
      })
    );
  };
  return (
    <AppContext.Provider
      value={{
        watchList,
        addStock,
        deleteStock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
