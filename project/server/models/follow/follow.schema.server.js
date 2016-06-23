module.exports = function () {
    var mongoose = require("mongoose");
    var FollowSchema = mongoose.Schema({
            _user: {type: mongoose.Schema.ObjectId, ref: "UserProject"},
            _userFollow: {type: mongoose.Schema.ObjectId, ref: "UserProject"},
        },
        {collection: "project.follow"});
    return FollowSchema;
};
