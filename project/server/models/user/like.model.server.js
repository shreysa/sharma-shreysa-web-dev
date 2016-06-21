module.exports = function () {
    var mongoose = require("mongoose");
    var LikeSchema = require("./like.schema.server.js")();
    var Like = mongoose.model("Like", LikeSchema);


    var api = {
        findLike: findLike,
        addLike: addLike,
        findAllLikedByUserId: findAllLikedByUserId,
        findAllLikedByRestaurantId: findAllLikedByRestaurantId
    };
    return api;
    
    function findLike(userId, restaurantId) {
      return  Like.findOne({userId: userId, restaurantId: restaurantId});
    }  
    
    function addLike(like) {
        return Like.create(like);
    }

    function findAllLikedByUserId(userId) {
        return Like.find({userId: userId});
    }
    
    function findAllLikedByRestaurantId(restaurantId) {
        return Like.find({restaurantId: restaurantId});
    }
    
    
    
};