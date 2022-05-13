const redis = require("redis");
require("dotenv").config();

//const client = redis.createClient(process.env.REDIS_URL);

let redisClient;
const isDevelopment = process.env.NODE_ENV === "development" ? true : false;

if (isDevelopment) {
  redisClient = redis.createClient({
    port: 6379,
    host: "localhost"
  });
} else {
  redisClient = redis.createClient(process.env.REDIS_TLS_URL, {
    tls: {
      rejectUnauthorized: false
    }
  });
}
module.exports = redisClient;
