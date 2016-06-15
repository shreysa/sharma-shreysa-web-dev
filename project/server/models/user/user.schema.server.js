module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: Number,
        dateCreate: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "project.user"});


    return UserSchema;


};
