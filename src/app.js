const express = require("express");

const app = express();

const { sequelize } = require("./models/index");
const userRoutes = require("./routes/userRoute");

async function main() {
  await sequelize.sync({ alter: true });
}

main();

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/", (req, res) => {
  res.status(200).json({
    message: "We are live"
  });
});

// app.post("/");
module.exports = app;
