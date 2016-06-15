module.exports = function () {

    var UserSchema = require("./user.schema.server.js")();
    var mongoose = require("mongoose");

    var User = mongoose.model("UserProject", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername :findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser

    };
    return api;

    function createUser(user) {
       return User.create(user);

        
    }
    
    function findUserById(userId) {
         return User.findById({_id: userId});
   /* ,function (err,result) {

            console.log("*************************************************");
            console.log(result);
             return result;
        });*/
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
