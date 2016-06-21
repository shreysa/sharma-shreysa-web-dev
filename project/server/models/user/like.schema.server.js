module.exports = function () {
    var mongoose = require("mongoose");
    var LikeSchema = mongoose.Schema({
        userId: String,
        restaurantId: String,
        username: String
    },
        {collection: "project.like"});
    return LikeSchema;
};
