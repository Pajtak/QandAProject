const Sequelize = require("sequelize");
const connection = require("./database");

const answer = connection.define("answer", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

answer.sync({ force: false });

module.exports = answer;
