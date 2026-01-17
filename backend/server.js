require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
require("./src/models/user.model");
require("./src/models/book.model");
require("./src/models/review.model");
require("./src/models/cart.model");
require("./src/models/order.model");
const { connectRedis } = require("./src/config/redis");
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await connectRedis();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
};
startServer();