const express = require("express");
const session = require("./middlewares/session");

const app = express();

const { sequelize } = require("./models/index");
const authRoutes = require("./routes/authRoute");

async function main() {
  await sequelize.sync({ alter: true });
}

main();

app.use(express.json());

//Configur redis

app.use(session);

app.use("/api/auth", authRoutes);
app.use("/", (req, res) => {
  res.status(200).json({
    message: "We are live"
  });
});

// app.post("/");
module.exports = app;
