module.exports = function () {
   var mongoose = require("mongoose");
    var RestaurantSchema = mongoose.Schema({
        restaurantId: String,        
        name: String,
        image: String,
        location: String,
        city: String,
        phone: String,
        rating: Number,
        like: [String]
    }, {collection: 'project.restaurant'
    });
    return RestaurantSchema;
};
