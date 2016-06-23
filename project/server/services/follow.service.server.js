// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//
//
// var bcrypt = require("bcrypt-nodejs");


module.exports = function (app, models) {

    var followModel = models.followModel;

    app.post("/api/projectuser/:userId/addfollow/:otherUserId", addFollow);
    app.get("/api/projectuser/:userId/following", findAllFollowedByUserId);
    app.delete("/api/projectuser/:userId/unfollow/:otherUserId", unfollowUser);
    app.get("/api/projectuser/following/:userId", findAllFollowingUserId);
  


    // function localStrategy(username, password, done) {
    //     userModel
    //         .findUserByUsername(username)
    //         .then(
    //             function (user) {
    //                 if(user && bcrypt.compareSync(password, user.password)){
    //                     done(null, user);
    //                 }else{
    //                     done(null, false);
    //                 }
    //
    //             },
    //             function (error) {
    //                 done(error);
    //             }
    //         );
    //
    // }
    //

    function addFollow(req, res) {
        var follow = {
            _user: req.params.userId,
            _userFollow: req.params.otherUserId
        }
        followModel
            .findFollow(req.params.userId, req.params.otherUserId)
            .then(
                function (followObj) {
                    if(followObj == null){
                        followModel
                            .addFollow(follow)
                            .then(
                                function (newfollowObj) {
                                    res.json(newfollowObj);
                                },
                                function (error) {
                                    res.statusCode(400).send(error);
                                }
                            );
                    }
                    else{
                        res.json(followObj);
                    }
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllFollowedByUserId(req, res) {
        followModel
            .findAllFollowedByUserId(req.params.userId)
            .then(
                function (followingObj) {
                    res.json(followingObj);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
    
    function unfollowUser(req, res) {
        followModel
            .unfollowUser(req.params.userId, req.params.otherUserId)
            .then(
                function (unfollowObj) {
                    res.json(unfollowObj);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
    
    function findAllFollowingUserId(req, res) {
        followModel
            .findAllFollowingUserId(req.params.userId)
            .then(
                function (followingObj) {
                    res.json(followingObj);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
                
            );
    }
};
