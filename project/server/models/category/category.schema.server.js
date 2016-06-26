module.exports = function () {
    var mongoose = require("mongoose");
    var CategorySchema = mongoose.Schema({
            // _user: {type: mongoose.Schema.ObjectId, ref: "UserProject"},
            _restaurant: {type: mongoose.Schema.ObjectId, ref: "Restaurant"},
            category: String,
                _user: {type: mongoose.Schema.ObjectId, ref: "UserProject"},
        rating : Number,
        city : String
        },
        {collection: "project.category"});
    return CategorySchema;
};
