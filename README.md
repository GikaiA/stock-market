# stock-market

# The Stock Market

The Stock Market is a web application that allows users to search for active stocks, save stocks to their portfolio, and manage their account with user authentication.

## Features

- **User Authentication**: Register and log in securely to access your personalized portfolio.
- **Stock Search**: Fetch real-time stock data using the AlphaVantage API.
- **Save to Portfolio**: Save selected stocks to your profile for easy tracking.

## Installation

Follow these steps to install and run the project locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/the-stock-market.git
   cd the-stock-market
   ```
2. Install dependencies:
   ```sh
   npm install
   npm i firebase react-router-dom
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## API Key Setup

This project uses the **AlphaVantage API**. To use it, follow these steps:

1. Get a free API key from [AlphaVantage](https://www.alphavantage.co/support/#api-key).
2. Create a `.env` file in the root directory and add the following:
   ```env
   VITE_ALPHAVANTAGE_API_KEY=your_api_key_here
   ```

## License
This project is licensed under the MIT License.

