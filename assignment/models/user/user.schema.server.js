module.exports = function() {
  var mongoose = require("mongoose");
  var UserSchema = mongoose.Schema(
    {
      username: String,
      password: String,
      firstName: String,
      lastName: String,
      facebook: {
        token: String,
        id: String,
        displayName: String
      },
      email: String,
      phone: String,
      dateCreate: { type: Date, default: Date.now },
      dateUpdated: Date
    },
    { collection: "assignment.user" }
  );

  return UserSchema;
};
