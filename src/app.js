const express = require("express");

const app = express();

const { sequelize } = require("./models/index");

async function main() {
  await sequelize.sync();
}

main();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "We are live"
  });
});

// app.post("/");
module.exports = app;
