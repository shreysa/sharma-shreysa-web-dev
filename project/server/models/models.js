module.exports = function(app, mongoose) {
  var userModel = require("./user/user.model.server.js")();
  var restaurantModel = require("./restaurant/restaurant.model.server.js")();
  var likeModel = require("./restaurant/like.model.server.js")();
  var followModel = require("./follow/follow.model.server.js")();
  var reviewModel = require("./review/review.model.server.js")();
  var categoryModel = require("./category/category.model.server.js")();

  var models = {
    userModel: userModel,
    restaurantModel: restaurantModel,
    likeModel: likeModel,
    followModel: followModel,
    reviewModel: reviewModel,
    categoryModel: categoryModel
  };

  return models;
};
