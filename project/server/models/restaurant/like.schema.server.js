module.exports = function() {
  var mongoose = require("mongoose");
  var LikeSchema = mongoose.Schema(
    {
      _user: { type: mongoose.Schema.ObjectId, ref: "UserProject" },
      _restaurant: { type: mongoose.Schema.ObjectId, ref: "Restaurant" }
    },
    { collection: "project.like" }
  );
  return LikeSchema;
};
