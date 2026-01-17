const express = require("express");
const routes = require("./routes");
const passport = require("./config/passport");


const app = express();

app.use(express.json());
app.use(passport.initialize());


app.use("/api", routes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
