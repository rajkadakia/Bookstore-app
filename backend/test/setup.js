require("dotenv").config();
const mongoose = require("mongoose");
const { connectRedis } = require("../src/config/redis");

before(async function () {
  this.timeout(15000);

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  await connectRedis();
});

after(async function () {
  await mongoose.connection.close();
});
