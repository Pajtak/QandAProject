const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const questionModel = require("./database/questionModel");

//Database

connection
  .authenticate()
  .then(() => {
    console.log("Conexão bem sucedida");
  })
  .catch((error) => {
    console.log(error);
  });

//Express utilizando o EJS como View Engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
  questionModel
    .findAll({ raw: true, order: [["id", "DESC"]] })
    .then((questions) => {
      res.render("index", {
        questions: questions,
      });
    });
});

app.get("/questions", (req, res) => {
  res.render("questions");
});

app.post("/saveQuestion", (req, res) => {
  let title = req.body.title;
  let desc = req.body.desc;
  questionModel
    .create({
      title: title,
      description: desc,
    })
    .then(() => {
      res.redirect("/");
    });
});

app.get("/questions/:id", (req, res) => {
  let id = req.params.id;
  questionModel
    .findOne({
      where: { id: id },
    })
    .then((question) => {
      if (question != undefined) {
        res.render("question", {
          question: question,
        });
      } else {
        res.redirect("/");
      }
    });
});
app.listen(8080, () => {
  console.log("App rodando");
});
