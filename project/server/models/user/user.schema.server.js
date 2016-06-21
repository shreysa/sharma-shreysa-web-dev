module.exports = function () {

    var mongoose = require("mongoose");
   // var ReviewSchema = require("./review.schema.server.js")(mongoose);
    
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
      //  review: [ReviewSchema],
        email: String,
        phone: Number,
        // facebook: {
        //     token: String,
        //     id: String,
        //     displayName: String
        // },
        dateCreate: {type: Date, default: Date.now},
        dateUpdated: Date,
        like: [String], //[{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],
        friend: [String]      
    }, {collection: "project.user"});
    return UserSchema;
};


