module.exports = function (app) {

    var mongoose = require("mongoose");
    var TodoSchema = mongoose.Schema({
        priority: Number,
        title: String,
        todo: String
    });

    var Todo = mongoose.model("Todo", TodoSchema);
    app.get("/api/todos", findAllTodos);

    function  findAllTodos(req, res) {
        Todo
            .find()
            .then(function (todos) {
                res.json(todos);
            });
    }

    // Todo.create({"priority": 1, "title": "CS5610", "todo": "Teach angular"});
    // Todo.create({  "priority": 2, "title": "CS5200", "todo": "teach data modelling" });
    // Todo.create({ "priority": 3, "title": "CS1500", "todo": "Algorithms and data structures"});
    // Todo.create({"priority": 4, "title": "CS5210", "todo": "Teach angular fourth"});
    // Todo.create({  "priority": 5, "title": "CS5206", "todo": "teach data modelling fifth " });
    // Todo.create({ "priority": 6, "title": "CS3600", "todo": "Algorithms and data structures sixth"});
}
