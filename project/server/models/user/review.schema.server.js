module.exports = function () {
    var mongoose = require("mongoose");
    var ReviewSchema = mongoose.Schema({
            userId: String,
            restaurantId: String,
            restaurantName: String,
            userName: String,
            reviewText: String,
            rating: Number,
            dateCreate: {type: Date, default: Date.now},
            dateUpdated: Date
    },
        {collection: "review"});
    return ReviewSchema;
};

