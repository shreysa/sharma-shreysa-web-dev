// var q = require("q");
    module.exports = function () {
        var UserSchema = require("./user.schema.server.js")();
        var mongoose = require("mongoose");
   
    var User = mongoose.model("UserProject", UserSchema);
       

    var api = {
        createUser: createUser,
       findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername :findUserByUsername,
       // findFacebookUser: findFacebookUser,
        findUserByGoogleId:findUserByGoogleId,
        findFriend: findFriend,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        getAdmins: getAdmins,
        makeAdmin : makeAdmin,
        deleteAdmin : deleteAdmin


    };
    return api;
     

        function deleteAdmin(userId) {
            return User
                    .update({_id: userId},{
                        $set: {
                            isAdmin: false
                        }
                    });
        }

        function getAdmins() {
            return User.find({"isAdmin" : true});
        }
        
        function makeAdmin(userId) {
            return User
                .update({_id: userId},{
                    $set: {
                        isAdmin: true
                    }
                });
        }



        function findUserByGoogleId(id) {
            return User.findOne({"google.id" : id});
        }



        function findAllUsers() {
            return User.find();
        }
    
    function findFriend(name) {
        return User.find({"username": name});
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
                $set:user
            });
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

//         function likeRestaurant(userId, restaurant) {
//           //  var deferred = q.defer();
//             likeModel
//                 .findOne({userId: userId},
//                     function(error, userLike){
//                         if(error) {
//                         //    deferred.reject(error);
//                         }
//                         else{
//                             var restaurantId = restaurant.id;
//                             if(userLike !=null && userLike.restaurantIds.indexOf(restaurantId) == -1){
//                                 userLike.restaurantIds.push(restaurantId);
//                                 userLike.save(function (error, userLikeObj) {
//                                     if(error){
//                                         //deferred.reject(error);
//                                     }
//                                     else{
//                                         addToLikedRestaurant(restaurant);
//                                       //  deferred.resolve(userLikeObj);
//                                     }
//
//                                 })
//                             }
//
//
//                         else{
//                            // deferred.resolve(null);
//                         }
//                     }
//             });
// //return deferred.promise;
//
//         }
//
//
//         function addToLikedRestaurant(restaurant) {
//             //var deferred = q.defer();
//             RestaurantModel.findOne({restaurantId: restaurant.id},
//
//             function (error, restau) {
//                 if(error){
//                   //  deferred.reject(error);
//                 }
//                 else{
//                     console.log("***********");
//                     console.log(restau);
//                     if(restau==null){
//                         RestaurantModel.create({
//                             restaurantId: restaurant.id,
//                             name: restaurant.name,
//                             image: restaurant.image_url,
//                             location: restaurant.location.address[0],
//                             city: restaurant.city,
//                             rating: restaurant.rating,
//                         },
//                         function (error, restaurant) {
//                             if(error){
//                               //  deferred.reject(error);
//                             } else{
//                                 console.log("after saving the restaurant");
//                                 console.log(restaurant);
//                               //  deferred.resolve(restaurant);
//                             }
//                         });
//                     }
//                     else{
//                       //  deferred.resolve(restaurant);
//                     }
//                 }
//             });
//             //return deferred.promise;
//         }
};
