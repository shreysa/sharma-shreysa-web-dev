module.exports = function () {

    var mongoose = require("mongoose");
    var pageSchema = require("../page/page.schema.server.js")(mongoose);
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: String,
        description: String,
      pages: [pageSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.website"});


    return WebsiteSchema;


};