

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function (app, models) {

    var userModel = models.userModel;
    var restaurantModel = models.restaurantModel;
    var likeModel = models.likeModel;



    app.put("/api/projectuser/:userId", updateUser);
    app.post("/api/projectuser", createUser);
    app.get("/api/projectuser", getUsers);
    app.post("/api/projectuser/:userId/like/:username", likeRestaurant);
    app.get("/api/projectuser/:userId", findUserById);
    app.delete("/api/projectuser/:userId", deleteUser);
    app.post("/api/projectuser/register", register);



    // app.get("/auth/facebook", passport.authenticate('facebook'));
    // app.get("/auth/facebook/callback", passport.authenticate('facebook', {
    //     successRedirect: '/project/#/user',
    //     failureRedirect: '/project/#/home'
    // }));



    //post authentication
    app.get("/api/projectuser/:userId/fetchLikedRestaurant", findAllLikedByUserId);
    app.get("/api/projectuser/restaurant/:restaurantId", findAllLikedByRestaurantId);
    app.post("/api/projectuser/login", passport.authenticate('proj'), login);
    app.post("/api/projectuser/logout", logout);
    app.get("/api/projectuser/loggedIn", loggedIn);

    




    passport.use('proj', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    // };
    // passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)){
                        done(null, user);
                    }else{
                        done(null, false);
                    }

                },
                function (error) {
                    done(error);
                }
            );

    }

    // function facebookLogin(token, refreshToken, profile, done) {
    //     console.log("in facebook login");
    //     console.log(profile);
    //     userModel
    //         .findFacebookUser(profile.id)
    //         .then(
    //             function (facebookUser) {
    //                 if(facebookUser){
    //                     return done(null, facebookUser);
    //                 }else{
    //                     facebookUser = {
    //                         username: profile.displayName.replace(/ /g, ''),
    //                         facebook: {
    //                             token: token,
    //                             id: profile.id,
    //                             displayName: profile.displayName
    //                         }
    //                     };
    //                     userModel
    //                         .createUser(facebookUser)
    //                         .then(
    //                             function (user) {
    //                                 done(null, user);
    //                             }
    //                         );
    //
    //
    //                 }
    //
    //             });
    //
    // }
    //

    function serializeUser(user, done) {
        done(null, user);
    }




    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function loggedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function login( req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        console.log("in register of server");
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        console.log("duplicateuser");
                        res.status(400).send("username already in use");
                        return;
                    }else{
                        console.log("password getting encrypted");
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return  userModel
                            .createUser(req.body)
                    }
                },
                function (error) {
                    res.status(400).send(error);
                })
            .then(
                function (user) {
                    if(user){
                        req.login(user, function (err) {
                            if(err){
                                res.status(400).send(err);
                            }
                            else{
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )


    }


    function createUser(req, res) {
        var newUser = req.body;
        console.log(req.body);
        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("Username  " + newUser.username + " is already in use");

                }

            );

    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );

    }

    function likeRestaurant(req, res) {
        var userId = req.params.userId;
       var username = req.params.username;
        var restaurant = req.body;
        var like ={
            userId: userId,
            restaurantId: restaurant.restaurantId,
           username: username
        }
        var restaurantId= restaurant.restaurantId;
      //  console.log(req.params.username);
        console.log(restaurantId);
        console.log("in like resturant");
        likeModel
            .findLike(userId, restaurantId)
            .then(
                function (likeObj, error) {
                    if (likeObj == null) {
                        likeModel
                            .addLike(like)
                            .then(
                                function (addLikeObj) {
                                    res.json(addLikeObj);
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );

                    } else {
                        res.json(likeObj);
                    }
                });
        restaurantModel
            .findRestaurant(restaurantId) //, userId, restaurant)
            .then(
                function (restObj, error) {
                    if (restObj == null) {
                        restaurantModel
                            .addRestaurant(restaurant)
                            .then(
                                function (addRestObj) {
                                    res.json(addRestObj);
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );

                   } else {
                    //     restaurantModel
                    //         .findUserIdExists(userId, restaurantId)
                    //         .then(
                    //             function (restUserIdObj, error) {
                    //                 if (restUserIdObj == null) {
                    //                     restaurantModel
                    //                         .addUserId(userId, restaurantId)
                    //                         .then(
                    //                             function (addUserObj) {
                    //                                 console.log(addUserObj);
                    //                                 res.json(addUserObj);
                    //                             }, function (error) {
                    //                                 res.status(400).send(error);
                    //                             }
                    //                         );
                    //                 }
                    //                 else {
                    //                     res.json(restUserIdObj);
                    //                 }
                    //             }
                    //         )
                    // }

                        res.json(restObj);
                    }
                });
        // userModel
        //     .findLikedRestaurant(userId)
        //     .then(function (restUserObj, error) {
        //         forEach(restau in restUserObj.like){
        //             if(restau === restaurantId){
        //                 res.json(restUserObj);
        //             }
        //             else{
        //                 restUserObj.likes.push(restaurantId);
        //             }
        //         }
        //         if (restUserObj.likes == null) {
        //             restaurantModel
        //                 .addRestaurant(restaurant)
        //                 .then(
        //                     function (addRestObj) {
        //                         res.json(addRestObj);
        //                     },
        //                     function (err) {
        //                         res.status(400).send(err);
        //                     }
        //                 );
        //
        //         } else {
        //             res.json(restObj);
        //         }
        //     });

    }

    function findAllLikedByUserId(req, res) {
        likeModel
            .findAllLikedByUserId(req.params.userId)
            .then(
                function (restaurants) {
                    res.json(restaurants);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function findAllLikedByRestaurantId(req, res) {
        likeModel
            .findAllLikedByRestaurantId(req.params.restaurantId)
            .then(
                function (users) {

                    res.json(users);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }





    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        var name = req.query['name'];
        if (username && password) {
            // findUserByCredentials(username, password, res);
            findUserByCredentials(username, password,req, res);
        }
        else if (username) {
            findUserByUsername(username, res);
        }
        else if(name){
            findFriend(name, res);
        }
        else {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },function(error) {
                        res.status(400).send(error);
                    });
        }
    }


    function findFriend(name, res) {
        userModel
            .findFriend(name)
            .then(
                function (users) {
                    res.json(users);
                },function(error) {
                    res.status(400).send(error);
                });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function(user) {
                res.send(user);
            },function(error) {
                res.status(400).send(error);
            });

    }


    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }



    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }


    function findUserByCredentials(username, password, req, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    console.log(req.session);
                    req.session.currentUser = user;
                    res.json(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }
}






