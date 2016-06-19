module.exports = function () {
    var mongoose = require("mongoose");
    var LikeSchema = mongoose.Schema({
        userId: String,
        restaurantId: [String]

    },
        {collection: "like"});
    return LikeSchema;
};
