



    module.exports = function (app, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var mongoose = require("mongoose");

    var User = mongoose.model("UserProject", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername :findUserByUsername,
        findFriend: findFriend,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser

    };
    return api;




    function findAllUsers() {
        return User.find();
    }
    
    function findFriend(name) {
        return User.find({"firstName": name});
    }

    function createUser(user) {
       return User.create(user);

        
    }


    
    function findUserById(userId) {
         return User.findById({_id: userId});
    }
    
    function findUserByUsername(username) {
      return  User.findOne({username: username});
    }
    
    function findUserByCredentials(username, password) {
       return User.findOne({username: username, password: password});
    }
    
    function updateUser(userId, user) {
        return User
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};
