import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import "./Dashboard.css";

function Dashboard() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const portfolioRef = ref(db, "portfolio");

    // Fetch saved stocks from Firebase
    onValue(portfolioRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const stockList = Object.keys(data).map((key) => ({
          symbol: key,
          ...data[key],
        }));
        setPortfolio(stockList);
      } else {
        setPortfolio([]);
      }
    });
  }, []);

  // Function to remove a stock from the portfolio
  const removeStock = (symbol) => {
    remove(ref(db, `portfolio/${symbol}`));
  };

  return (
    <div className="dashboard">
      <h1>Your Portfolio</h1>

      {portfolio.length === 0 ? (
        <p className="nostocks-sentence">No stocks in portfolio.</p>
      ) : (
        <ul className="portfolio-list">
          {portfolio.map((stock) => (
            <li key={stock.symbol} className="portfolio-item">
              <strong>{stock.symbol}</strong>: {stock.name}
              <p><strong>Industry:</strong> {stock.industry}</p>
              <p><strong>Market Cap:</strong> {stock.marketCap}</p>
              <p><strong>52 Week High:</strong> {stock.weekHigh}</p>
              <p><strong>52 Week Low:</strong> {stock.weekLow}</p>
              <button onClick={() => removeStock(stock.symbol)} className="remove-button">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
