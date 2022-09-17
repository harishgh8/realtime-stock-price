import "./App.css";
import StockDetailPage from "./pages/StockDetailPage";
import StockOverviewPage from "./pages/StockOverviewpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <main className="container">
        <Router>
          <h1>learn react</h1>
          <Routes>
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
            <Route path="/" element={<StockOverviewPage />} />
          </Routes>
        </Router>
      </main>
    </AppProvider>
  );
}

export default App;
