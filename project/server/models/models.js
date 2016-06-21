module.exports = function (app, mongoose) {
  //  var mongoose = require('mongoose');
  // mongoose.connect('mongodb://127.0.0.1:27017/cs5610summer1');
  //  mongoose.connect('mongodb://username:password@localhost/webdev');
    var userModel = require("./user/user.model.server.js")();
   var restaurantModel = require("./user/restaurant.model.server.js")();
    var likeModel = require("./user/like.model.server.js")();
    //var pageModel= require("./page/page.models.server.js")();
    //var widgetModel = require("./widget/widget.models.server.js")();

    var models= {
        userModel: userModel,
        restaurantModel: restaurantModel,
        likeModel: likeModel
     //   restaurantModel: restaurantModel
      //  websiteModel: websiteModel,
       // pageModel: pageModel,
       // widgetModel: widgetModel
    };

    return models;
};
