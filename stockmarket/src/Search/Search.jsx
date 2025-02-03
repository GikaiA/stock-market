import React, { useState } from "react";
import { db } from "../firebase";
import { ref, set } from "firebase/database";
import "./Search.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockResults, setStockResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const API_KEY = "97FIQVS9RASX6N7I"; // Alpha Vantage API key 

  const handleSearch = async () => {
    setStockResults([]);
    setError(null);
    setLoading(true);

    try {
      const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.bestMatches && data.bestMatches.length > 0) {
        const detailedStocks = await Promise.all(
          data.bestMatches.map(async (stock) => {
            const symbol = stock["1. symbol"];
            const detailUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
            const detailResponse = await fetch(detailUrl);
            const detailData = await detailResponse.json();

            return {
              symbol: stock["1. symbol"],
              name: stock["2. name"],
              industry: detailData.Industry || "N/A",
              marketCap: detailData.MarketCapitalization || "N/A",
              peRatio: detailData.PERatio || "N/A",
              currency: detailData.Currency || "N/A",
              weekHigh: detailData["52WeekHigh"] || "N/A",
              weekLow: detailData["52WeekLow"] || "N/A",
            };
          })
        );

        setStockResults(detailedStocks);
      } else {
        setError("No results found. Try another search.");
      }
    } catch (err) {
      setError("Failed to fetch stock data.");
    }

    setLoading(false);
  };

  const saveStockToPortfolio = async (stock) => {
    setSaving(true);
    try {
      await set(ref(db, `portfolio/${stock.symbol}`), stock);
      console.log("Stock saved successfully!");
    } catch (error) {
      console.error("Error saving stock:", error);
    }
    setSaving(false);
  };

  return (
    <div className="search">
      <h1 className="search-title">Search for a Stock</h1>
      <div className="searchbar-section">
        <input
          type="text"
          placeholder="Search for a stock by name or ticker..."
          className="searchbar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="searchbutton"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {stockResults.length > 0 && (
        <div className="results">
          <h2>Results:</h2>
          <ul>
            {stockResults.map((stock, index) => (
              <li key={index} className="individual-result">
                <strong>{stock.symbol}</strong>: {stock.name}
                <p>
                  <strong>Industry:</strong> {stock.industry}
                </p>
                <p>
                  <strong>Market Cap:</strong> {stock.marketCap}
                </p>
                <p>
                  <strong>PE Ratio:</strong> {stock.peRatio}
                </p>
                <p>
                  <strong>52 Week High:</strong> {stock.weekHigh}
                </p>
                <p>
                  <strong>52 Week Low:</strong> {stock.weekLow}
                </p>
                <p>
                  <strong>Currency:</strong> {stock.currency}
                </p>
                <div className="buy-sell">
                  <button onClick={() => saveStockToPortfolio(stock)} className="add-button">
                    {saving ? "Saving..." : "Add to Portfolio"}
                  </button>  
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
