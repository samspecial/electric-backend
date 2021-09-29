const redis = require("redis");

//const client = redis.createClient(process.env.REDIS_URL);

const redisClient;
if (process.env.NODE_ENV === production) {
  redisClient = redis.createClient(process.env.REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    }
});
} else {
  redisClient = redis.createClient({
    port: 6379,
    host: "localhost"
  });
}



module.exports = redisClient;
