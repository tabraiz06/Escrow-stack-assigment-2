const express = require("express");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const UserRoute = require("./routes/userRoutes");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

const wss = new WebSocketServer({ server });
app.use(UserRoute.router);
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === "subscribe") {
      const { email, stock } = parsedMessage;
      const user = UserRoute.users.find((u) => u.email === email);
      if (user && supportedStocks.includes(stock)) {
        user.subscribedStocks.push(stock);
      }
    }
  });
});

const generateStockPrices = () => {
  return UserRoute.supportedStocks.reduce((prices, stock) => {
    prices[stock] = (Math.random() * 1000).toFixed(2);
    return prices;
  }, {});
};

const broadcastStockPrices = () => {
  const stockPrices = generateStockPrices();
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(stockPrices));
    }
  });
};

setInterval(broadcastStockPrices, 1000);
