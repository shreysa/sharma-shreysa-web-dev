

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function (app, models) {

    var userModel = models.userModel;
   // var restaurantModel = models.restaurantModel;

   // var followModel = models.followModel;


    // User related api calls
    app.put("/api/projectuser/admin/:userId/delete/user", deleteAdmin);
    app.put("/api/projectuser/admin/user/:userId", makeAdmin);
    app.get("/api/projectuser/admin/users", getAdmins);
    app.put("/api/projectuser/:userId", updateUser);
    app.post("/api/projectuser", createUser);
    app.get("/api/projectuser", getUsers);
    app.post("/api/projectuser/login", passport.authenticate('proj'), login);
    app.post("/api/projectuser/logout", logout);
    app.get("/api/projectuser/loggedIn", loggedIn);
    app.get("/api/projectuser/:userId", findUserById);
    app.delete("/api/projectuser/user/:userId", deleteUser);
    app.post("/api/projectuser/register", register);
    var multer = require('multer');
    var uploadProPic = multer ({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/uploadPic",uploadProPic.single('myFile'),uploadImage);
    


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));




    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: 'project/#/review'
        }));


   passport.use('proj', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

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


    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var isAdmin = false;
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            isAdmin : isAdmin,

                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
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

    function uploadImage(req, res) {
       var userId = req.body.userId;

        var myFile        = req.file;
        if(myFile == null)
        {
            res.redirect("/project/#/user/" + userId);
            return;
        }

        //var width         = req.body.width;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;



        var userPhoto = {photo: "/uploads/" + filename};

        userModel
            .updateUser(userId, userPhoto)
            .then(
                function (stats) {
                    // console.log(stats);
                    res.redirect("/project/index.html#/user");
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );



    }

    function getAdmins(req, res) {
        userModel
            .getAdmins()
            .then(
                function (adminObj) {
                    res.json(adminObj);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    function makeAdmin(req, res) {
        userModel
            .makeAdmin(req.params.userId)
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
    
    function deleteAdmin(req, res) {
        userModel
            .deleteAdmin(req.params.userId)
            .then(
                function (adminRemObj) {
                    res.json(adminRemObj);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }



};






