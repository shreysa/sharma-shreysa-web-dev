module.exports = function () {
    var mongoose = require("mongoose");
    var LikeSchema = require("./like.schema.server.js")();
    var Like = mongoose.model("Like", LikeSchema);


    var api = {
        findLike: findLike,
        addLike: addLike,
        findAllLikedByUserId: findAllLikedByUserId,
        findAllLikedByRestaurantId: findAllLikedByRestaurantId,
        unlikeRestaurant: unlikeRestaurant
        
        
        
    };
    return api;
    
    function findLike(userId, restaurantId) {
      return  Like.findOne({"_user": userId, "_restaurant": restaurantId});
    }  
    
    function addLike(like) {
        return Like.create(like);
    }

    function findAllLikedByUserId(userId) {
        return Like.find({_user: userId})
            .populate('_restaurant', 'restaurantId name' );
    }
    
    function findAllLikedByRestaurantId(restaurantId) {
        return Like.find({_restaurant: restaurantId})
            .populate('_user', 'username');
    }

    function unlikeRestaurant(userId, restaurantId) {
        return Like.remove({"_user": userId, "_restaurant": restaurantId});
    }
    
    
    
};