module.exports = function() {
  var mongoose = require("mongoose");
  var ReviewSchema = mongoose.Schema(
    {
      _user: { type: mongoose.Schema.ObjectId, ref: "UserProject" },
      _restaurant: { type: mongoose.Schema.ObjectId, ref: "Restaurant" },
      reviewText: String,
      dateCreate: { type: Date, default: Date.now },
      dateUpdated: Date
    },
    {
      collection: "project.review"
    }
  );
  return ReviewSchema;
};
