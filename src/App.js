import { useState } from "react";
import TradingChart from "./charts/TradingChart";
import DropdownMenu from "./menu/DropdownMenu";
import "./App.css";

function App() {
  const [interval, setInterval] = useState("1m");
  const [ticker, setTicker] = useState("BTCUSDT");

  const intervals = ['1m', '1d', '1w', '1M'];
  const crypto = ["BTCUSDT"];

  return (
    <div className="App">
      <header className="App-header">
        <h2>Candlestick Chart</h2>

        <div className="dropdowns-container">
          <DropdownMenu
            label="Interval"
            options={intervals}
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
          <DropdownMenu
            label="Crypto"
            options={crypto}
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
        </div>
      </header>
      <TradingChart interval={interval} symbol={ticker} />
    </div>
  );
}

export default App;
