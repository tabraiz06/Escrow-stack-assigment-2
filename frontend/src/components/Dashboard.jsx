import React, { useEffect, useState } from "react";

const supportedStocks = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

const Dashboard = ({ user }) => {
  const [subscribedStocks, setSubscribedStocks] = useState(
    user.subscribedStocks
  );
  const [stockPrices, setStockPrices] = useState({});

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    ws.onmessage = (event) => {
      const prices = JSON.parse(event.data);
      setStockPrices(prices);
    };
    return () => ws.close();
  }, []);

  const handleSubscribe = async (stock) => {
    try {
      const response = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          stock,
        }),
      });
      const result = await response.json();

      setSubscribedStocks(result.subscribedStocks);
    } catch (error) {
      console.error("Error subscribing to stock", error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
      <div className="btns flex gap-4">
        {supportedStocks.map((stock) => (
          <button
            key={stock}
            onClick={() => handleSubscribe(stock)}
            className=" bg-blue-600 font-bold  rounded h-[80px] w-[200px] text-center"
          >
            Subscribe to {stock}
          </button>
        ))}
      </div>
      <div className="flex flex-col w-full items-center gap-4">
        {subscribedStocks.map((stock) => (
          <span key={stock} className="font-bold text-2xl">
            {stock}: ${stockPrices[stock]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
