module.exports = function (app) {

    app.get("/say/:message", function (req, res) {
        var msg = req.params["message"];
        //  console.log(msg);
        res.send({message : msg});
    });

    var models = require("./server/models/models.js")();
    var userService =  require("./server/services/user.service.server.js")(app, models);

};
