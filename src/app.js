const express = require("express");
const session = require("./middlewares/session");
const corsMiddleware = require("./middlewares/cors");
const helmet = require("helmet");
const compression = require("compression");
const logger = require("morgan");

const app = express();

const { sequelize } = require("./models/index");
const authRoutes = require("./routes/authRoute");
const protectedRoutes = require("./routes/protectedRoute");
const subscriptionRoutes = require("./routes/subscriptionRoute");

async function main() {
  await sequelize.sync({ alter: true });
}

main();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("trust proxy", 1);

//Cors
app.use(corsMiddleware);
app.options("*", corsMiddleware);

//Configur redis

app.use(session);

app.use(helmet());
app.use(compression());
// Logger
logger.token("sessionid", function (req, res, param) {
  return req.sessionID;
});
logger.token("user", function (req, res, param) {
  return req.session.user;
});

app.use(
  logger(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :user :sessionid'
  )
);
// app.use(logger("common"));

app.use("/api/auth", authRoutes);
app.use("/api/auth", subscriptionRoutes);
app.use("/api", protectedRoutes);

app.use("/", (req, res) => {
  res.status(200).json({
    message: "We are live"
  });
});

// app.post("/");
module.exports = app;
