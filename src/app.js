const express = require("express");

const app = express();

const { sequelize } = require("./models/index");

async function main(){
    await sequelize.sync();
} 

main();
module.exports = app;
