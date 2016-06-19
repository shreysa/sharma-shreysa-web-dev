module.exports = function (app) {

    app.get("/say/:message", function (req, res) {
        var msg = req.params["message"];
        //  console.log(msg);
        res.send({message : msg});
    });

    var models = require("./server/models/models.js")();
    var userService =  require("./server/services/user.service.server.js")(app, models);
    var yelpService = require("./server/services/yelp.service.server.js")(app, models);
    var FollowerSchema = require("./server/models/follower/follower.schema.server.js")(app, models);
    var LikeSchema = require("./server/models/user/likes.schema.server.js")(app, models);
    var ReviewSchema = require("./server/models/user/review.schema.server.js")(app, models);
};
