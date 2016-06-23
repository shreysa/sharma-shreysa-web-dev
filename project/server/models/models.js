module.exports = function (app, mongoose) {
  //  var mongoose = require('mongoose');
  // mongoose.connect('mongodb://127.0.0.1:27017/cs5610summer1');
  //  mongoose.connect('mongodb://username:password@localhost/webdev');
    var userModel = require("./user/user.model.server.js")();
   var restaurantModel = require("./restaurant/restaurant.model.server.js")();
    var likeModel = require("./restaurant/like.model.server.js")();
   var followModel= require("./follow/follow.model.server.js")();
  var reviewModel = require("./review/review.model.server.js")();

    var models= {
        userModel: userModel,
        restaurantModel: restaurantModel,
        likeModel: likeModel,
        followModel: followModel,
        reviewModel: reviewModel
    };

    return models;
};
