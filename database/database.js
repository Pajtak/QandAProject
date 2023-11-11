const sequelize = require("sequelize");

const connection = new sequelize("questionsandanswers", "root", "naboo9191", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
