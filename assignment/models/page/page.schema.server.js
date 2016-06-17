module.exports = function () {
    var mongoose = require("mongoose");

  // var widgetSchema = require("./widget.schema.server.js")(mongoose);


    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "Website"},
        name: String,
        title: String,
    //  widgets: [widgetSchema],
        description: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.page"});


    return PageSchema;


};
