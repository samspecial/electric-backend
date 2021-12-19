const cors = require("cors");
const whitelist = ["http://localhost:1234", "http://localhost:4000"];

const corsOptions = {
  optionsSuccessStatus: 200,
  origin: whitelist,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};
module.exports = cors(corsOptions);
