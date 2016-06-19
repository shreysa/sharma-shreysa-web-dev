module.exports = function () {
    var mongoose = require("mongoose");
    var RestaurantSchema = mongoose.Schema({
        id: String,
        name: String,
        image_url: String,
      //  location: String,
        city: String,
        rating: Number
    }, {collection: 'restaurant'
    });
    return RestaurantSchema;
};
