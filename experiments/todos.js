module.exports = function(app) {
  var mongoose = require("mongoose");
  var TodoSchema = mongoose.Schema({
    priority: Number,
    title: String,
    todo: String
  });

  var Todo = mongoose.model("Todo", TodoSchema);
  app.get("/api/todos", findAllTodos);

  function findAllTodos(req, res) {
    Todo.find().then(function(todos) {
      res.json(todos);
    });
  }
};
