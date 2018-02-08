module.exports = function (app, mongoose) {

    app.get("/say/:message", function (req, res) {
        var msg = req.params["message"];
        res.send({message : msg});
    });

    var models = require("./server/models/models.js")();
    var userService =  require("./server/services/user.service.server.js")(app, models);
    var yelpService = require("./server/services/yelp.service.server.js")(app, models);
    var followService =  require("./server/services/follow.service.server.js")(app, models);
    var likeService = require("./server/services/like.service.server.js")(app, models);
    var reviewService = require("./server/services/review.service.server.js")(app, models);
    var categoryService = require("./server/services/category.service.server.js")(app, models);
};
