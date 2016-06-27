module.exports = function () {
    var mongoose = require("mongoose");
    var RestaurantSchema = require("./restaurant.schema.server.js")();
    var Restaurant = mongoose.model("Restaurant", RestaurantSchema);


        var api = {
            findRestaurant: findRestaurant,
            addRestaurant: addRestaurant,
            findRestaurantByRestaurantId: findRestaurantByRestaurantId
        };
        return api;

        function findRestaurant(restaurantId) {
        return  Restaurant.findOne({ restaurantId: restaurantId});        
        }

        function addRestaurant(restaurant) {
            return Restaurant.create(restaurant);
        }
    
         function findRestaurantByRestaurantId(id) {
            return Restaurant.findOne({_id : id});
    }

  
};
    
    
