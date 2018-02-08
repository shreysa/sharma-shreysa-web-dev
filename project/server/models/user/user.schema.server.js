module.exports = function() {
  var mongoose = require("mongoose");

  var UserSchema = mongoose.Schema(
    {
      username: String,
      password: String,
      firstName: String,
      lastName: String,
      isAdmin: Boolean,
      email: String,
      phone: Number,
      photo: String,
      google: {
        token: String,
        id: String
      },
      dateCreate: { type: Date, default: Date.now },
      dateUpdated: Date
    },
    { collection: "project.user" }
  );
  return UserSchema;
};
