var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");
module.exports = function (app, models) {

    var userModel = models.userModel;

    

    app.put("/api/projectuser/:userId", updateUser);
    app.post("/api/projectuser", createUser);
    app.get("/api/projectuser", getUsers);
    app.get("/api/projectuser/:userId", findUserById);
    app.delete("/api/projectuser/:userId", deleteUser);
    app.post("/api/projectuser/login", passport.authenticate('proj'), login);
    app.post("/api/projectuser/logout", logout);
    app.get("/api/projectuser/loggedIn", loggedIn);
    app.post("/api/projectuser/register", register);


    app.get("/auth/facebook", passport.authenticate('facebook'));
    // app.get("/auth/facebook",facebookLogin);
    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignment/#/login'
    }));

    passport.use('proj', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

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
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.status(400).send("username already in use");
                        return;
                    }else{

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
        /*user._id = (new Date()).getTime().toString();
        users.push(user);
        res.send(user);*/

    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then()
        // for (var i in users) {
        //     if (users[i]._id === id) {
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         res.send(newUser);
        //         return;
        //     }
        // }
        // res.send(400);
    }


    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        var name = req.query['name'];
        if (username && password) {
            findUserByCredentials(username, password,req, res);
        }
        else if (username) {
            findUserByUsername(username, res);
        }
            else if(name){
            findFriend(name, res);
        }
        else {

            res.send(users);
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





