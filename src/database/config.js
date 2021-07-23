const { Sequelize } = require("sequelize");

require("dotenv").config();

const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = function() {
  const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres"
  });

  sequelize
    .authenticate()
    .then(() => console.log("Connection successfully established"))
    .catch((error) => console.log(`Unable to establish connection, ${error}`));
};
