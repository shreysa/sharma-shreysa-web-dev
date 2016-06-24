module.exports = function (app, mongoose) {

    app.get("/say/:message", function (req, res) {
        var msg = req.params["message"];
        //  console.log(msg);
        res.send({message : msg});
    });

    var models = require("./server/models/models.js")();
    var userService =  require("./server/services/user.service.server.js")(app, models);
    var yelpService = require("./server/services/yelp.service.server.js")(app, models);
    var followService =  require("./server/services/follow.service.server.js")(app, models);
    var likeService = require("./server/services/like.service.server.js")(app, models);
    var reviewService = require("./server/services/review.service.server.js")(app, models);
    var categoryService = require("./server/services/category.service.server.js")(app, models);
    
   // var LikeSchema = require("./models/like/like.schema.server.js")(app, models);
   //  var ReviewSchema = require("./models/review/review.schema.server.js")(app, models);
   //  var RestaurantSchema = require("./models/restaurant/restaurant.schema.server.js")(app, models);
   //  var FollowSchema = require("./models/follow/follow.schema.server.js")(app, models);
   //  var UserSchema = require("./models/user/user.schema.server.js")(app, models);

   
    

};
