import "./App.css";
import StockDetailPage from "./pages/StockDetailPage";
import StockOverviewPage from "./pages/StockOverviewpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route path="/detail/:symbol" element={<StockDetailPage />} />
          <Route path="/" element={<StockOverviewPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
