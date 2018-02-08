module.exports = function() {
  var mongoose = require("mongoose");
  var FollowSchema = require("./follow.schema.server.js")();
  var Follow = mongoose.model("Follow", FollowSchema);

  var api = {
    findFollow: findFollow,
    addFollow: addFollow,
    findAllFollowedByUserId: findAllFollowedByUserId,
    findAllFollowingUserId: findAllFollowingUserId,
    unfollowUser: unfollowUser,
    deleteFollowedBy: deleteFollowedBy,
    deleteFollowing: deleteFollowing
  };
  return api;

  function deleteFollowing(userId) {
    return Follow.remove({ _userFollow: userId });
  }

  function deleteFollowedBy(userId) {
    return Follow.remove({ _user: userId });
  }

  function findFollow(userId, OtherUserId) {
    return Follow.findOne({ _user: userId, _userFollow: OtherUserId });
  }

  function addFollow(follow) {
    return Follow.create(follow);
  }

  function findAllFollowedByUserId(userId) {
    return Follow.find({ _user: userId }).populate(
      "_userFollow",
      "_id username"
    );
  }
  function findAllFollowingUserId(userId) {
    return Follow.find({ _userFollow: userId }).populate(
      "_user",
      "_id username"
    );
  }

  function unfollowUser(userId, OtherUserId) {
    return Follow.remove({ _user: userId, _userFollow: OtherUserId });
  }
};
