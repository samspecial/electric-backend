const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("../database/redis");
const redisStore = connectRedis(session);

module.exports = session({
  store: new redisStore({
    client: redisClient
  }),
  secret: "MY_SECRET_REDIS",
  saveUninitialized: false,
  resave: false,
  name: "sessionId",
  cookie: {
    secure: false, //if this is true, only transmit cookie over https
    httpOnly: true, //if true, it prevents client side javascript from reading the cookie
    maxAge: 1000 * 60 * 60 //session maxAge in milliseconds
  }
});
