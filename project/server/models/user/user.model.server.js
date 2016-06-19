// var q = require("q");



    module.exports = function () {
        var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("UserProject", UserSchema);
        var LikeSchema = require("./likes.schema.server.js")();
        var likeModel= mongoose.model('like', LikeSchema);

    var api = {
        createUser: createUser,
       findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername :findUserByUsername,
        findFriend: findFriend,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        likeRestaurant: likeRestaurant

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
                    lastName: user.lastName,
                    phone: user.phone
                }
            });
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

        function likeRestaurant(userId, restaurant) {
          //  var deferred = q.defer();
            likeModel
                .findOne({userId: userId},
                    function(error, userLike){
                        if(error) {
                        //    deferred.reject(error);
                        }
                        else{
                            var restaurantId = restaurant.id;
                            if(userLike !=null && userLike.restaurantId.indexOf(restaurantId) == -1){
                                userLike.restaurantIds.push(restaurantId);
                                userLike.save(function (error, userLikeObj) {
                                    if(error){
                                        //deferred.reject(error);
                                    }
                                    else{
                                        addToLikedRestaurant(restaurant);
                                      //  deferred.resolve(userLikeObj);
                                    }
                                    
                                })
                            }


                        else{
                           // deferred.resolve(null);
                        }
                    }
            });
//return deferred.promise;

        }
};
