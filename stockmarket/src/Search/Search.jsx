import React, { useState } from "react";
import "./Search.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=97FIQVS9RASX6N7I`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      if (data.bestMatches && data.bestMatches.length > 0) {
        setStockData(data.bestMatches);
        setError(null); // Clear any previous errors
      } else {
        setStockData(null);
        setError("No results found. Please try another keyword.");
      }
    } catch (err) {
      setError(err.message);
      setStockData(null);
    }
  };

  return (
    <div className="search">
      <h1 className="search-title">Search for any Stock</h1>
      <div className="searchbar-section">
        <input
          type="text"
          placeholder="Search for any stock..."
          className="searchbar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <div className="searchbutton-section">
          <button className="searchbutton" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      {stockData && (
        <div className="results">
          <h2 className="result-title">Results</h2>
          <ul className="result-grid">
            {stockData.map((stock, index, matchscore) => (
              <li key={index} className="individual-result">
                <div>{stock["1. symbol"]}</div>{" "}
                {stock["2. name"]} {matchscore["9. matchscore"]}
                <button>Add to Portfolio</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
