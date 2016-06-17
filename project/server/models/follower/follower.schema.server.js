module.exports = function () {
    var mongoose = require("mongoose");
    var FollowerSchema = mongoose.Schema({
        userId: String,
        userName: String,
        followersId: String,
        followersName: String
    }, {collection: "project.follower"});


    return FollowerSchema;


};

