module.exports = function() {
  var UserSchema = require("./user.schema.server.js")();
  var mongoose = require("mongoose");

  var User = mongoose.model("UserProject", UserSchema);

  var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findUserByGoogleId: findUserByGoogleId,
    findFriend: findFriend,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAdmins: getAdmins,
    makeAdmin: makeAdmin,
    deleteAdmin: deleteAdmin
  };
  return api;

  function deleteAdmin(userId) {
    return User.update(
      { _id: userId },
      {
        $set: {
          isAdmin: false
        }
      }
    );
  }

  function getAdmins() {
    return User.find({ isAdmin: true });
  }

  function makeAdmin(userId) {
    return User.update(
      { _id: userId },
      {
        $set: {
          isAdmin: true
        }
      }
    );
  }

  function findUserByGoogleId(id) {
    return User.findOne({ "google.id": id });
  }

  function findAllUsers() {
    return User.find();
  }

  function findFriend(name) {
    return User.find({ username: name });
  }

  function createUser(user) {
    return User.create(user);
  }

  function findUserById(userId) {
    return User.findById({ _id: userId });
  }

  function findUserByUsername(username) {
    return User.findOne({ username: username });
  }

  function findUserByCredentials(username, password) {
    return User.findOne({ username: username, password: password });
  }

  function updateUser(userId, user) {
    delete user._id;
    return User.update(
      { _id: userId },
      {
        $set: user
      }
    );
  }

  function deleteUser(userId) {
    return User.remove({ _id: userId });
  }
};
