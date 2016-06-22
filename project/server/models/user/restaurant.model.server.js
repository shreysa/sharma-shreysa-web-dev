module.exports = function () {
    var mongoose = require("mongoose");
    var RestaurantSchema = require("./restaurant.schema.server.js")();
    var Restaurant = mongoose.model("Restaurant", RestaurantSchema);


        var api = {
            findRestaurant: findRestaurant,
            addRestaurant: addRestaurant,
            findUserIdExists: findUserIdExists
        };
        return api;

        function findRestaurant(restaurantId) {
        return  Restaurant.findOne({ restaurantId: restaurantId});        
        }

        function addRestaurant(restaurant) {
            return Restaurant.create(restaurant);
        }

        function findUserIdExists(userId, restaurantId) {
            return findOne({restaurantId: restaurantId, like : userId})
        }

  
};
    
    
