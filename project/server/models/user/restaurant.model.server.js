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

        function addUserId(userId, restaurantId) {

        }

    // function findRestaurant(restaurantId, userId, restaurant) {
    //   return  Restaurant.findOne({restaurantId: restaurantId}),
    //         function (error, restObj) {
    //             if(error){
    //                 // deferred.reject(error);
    //             }
    //             else {
    //                 if(restObj !=null && restObj.likes.indexOf(userId) == -1){
    //                     restObj.likes.push(userId);
    //                     restObj.save(function(error, restUserObj){
    //                         if(error){
    //                         //    deferred.reject(error);
    //                         }
    //                         else{
    //                            addRestaurant(restaurant);
    //                             //deferred.resolve(restUserObj);
    //                         }
    //                     })
    //
    //                 }
    //                 else{
    //                    // deferred.resolve(null);
    //                 }
    //             }
    //         }
    //
    // }
};
    
    
