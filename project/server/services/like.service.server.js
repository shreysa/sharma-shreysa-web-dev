module.exports = function (app, models) {

    var likeModel = models.likeModel;
    var restaurantModel = models.restaurantModel;



    app.post("/api/projectuser/:userId/like", likeRestaurant);
    app.get("/api/projectuser/checkLike/:userId/restaurant/:restaurantId", findThisLikedByUserId);
    app.delete("/api/projectuser/:userId/removeLike/:restaurantId", unlikeRestaurant);
    app.get("/api/projectuser/restaurant/:restaurantId/restaurantYelpId", findRestaurant);
    app.get("/api/projectuser/fetchLikedRestaurant/:userId", findAllLikedByUserId);
    app.get("/api/projectuser/restaurant/:restaurantId", findAllLikedByRestaurantId);
   


    function likeRestaurant(req, res) {
        var userId = req.params.userId;
        //  var username = req.params.username;
        var restaurant = req.body;
        var restaurantId = restaurant.restaurantId;
        var restDbId = "";
        restaurantModel
            .findRestaurant(restaurantId)
            .then(
                function (restObj, error) {
                    if (restObj == null) {
                        restaurantModel
                            .addRestaurant(restaurant)
                            .then(
                                function (addRestObj) {
                                    restDbId = addRestObj._id;
                                    console.log(restDbId);
                                    var like = {
                                        _user: userId,
                                        _restaurant: restDbId
                                    }

                                    likeModel
                                        .findLike(userId, restDbId)
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

                                    res.json(addRestObj);
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );

                    } else {
                        restDbId = restObj._id;
                        console.log(restDbId);
                        var like = {
                            _user: userId,
                            _restaurant: restDbId
                        }

                        likeModel
                            .findLike(userId, restDbId)
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

                        res.json(restObj);
                    }
                });

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
        console.log(req.params.restaurantId);
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


    function findRestaurant(req, res) {
        restaurantModel
            .findRestaurant(req.params.restaurantId)
            .then(
                function (restObj) {
                    res.json(restObj);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function findThisLikedByUserId(req, res) {
        likeModel
            .findLike(req.params.userId, req.params.restaurantId)
            .then(
                function (userObj) {
                    res.json(userObj);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function unlikeRestaurant(req, res) {
        likeModel
            .unlikeRestaurant(req.params.userId, req.params.restaurantId)
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
    
    



};

    
    