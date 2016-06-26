module.exports = function (app, models) {

    var reviewModel = models.reviewModel;
    var restaurantModel = models.restaurantModel;
    var categoryModel = models.categoryModel;
    app.delete("/api/review/remove/usersReview/:userId", deleteReviewByUserId);
    app.post("/api/projectuser/:userId/review/:restaurantId", addReview);
    app.get("/api/projectuser/user/:userId/restaurant/review/:restaurantId", getReviewByUserId);
    app.get("/api/projectuser/user/:userId", findAllReviewsByUserId);
    app.get("/api/projectuser/:restaurantId/reviews", findAllReviewsByRestaurantId);
    app.delete("/api/projectuser/:reviewId", deleteReview);
    app.put("/api/projectuser/review/:reviewId/restaurant/:reviewText", updateReview);
    app.get("/api/projectuser/review/restaurant", getAllReviews);

    
    
    function deleteReviewByUserId(req, res) {
        reviewModel
            .deleteReviewByUserId(req.params.userId)
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
        
    

        function getAllReviews(req, res) {
            reviewModel
                .getAllReviews()
                .then(
                    function (reviewObj) {
                        res.json(reviewObj);
                    },
                    function (error) {
                        res.statusCode(400).send(error);
                    }
                );
        }
    function getReviewByUserId(req, res) {
        reviewModel
            .getReviewByUserId(req.params.userId, req.params.restaurantId)
            .then(
                function (reviewObj) {
                    res.json(reviewObj);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
    }


    function updateReview(req, res){
        reviewModel
            .updateReview(req.params.reviewId, req.params.reviewText)
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


    function deleteReview(req, res) {
        reviewModel
            .deleteReview(req.params.reviewId)
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




    function addReview(req, res) {
        var userId = req.params.userId;
        //  var username = req.params.username;
        var restaurant = req.body;
        var restaurantId = restaurant.restaurantId;
        var restaurParam = req.params.restaurantId;
        var restDbId = "";
        var restForDb = {
            restaurantId: restaurant.restaurantId,
            name: restaurant.name,
            image: restaurant.image,
            location: restaurant.location,
            city: restaurant.city,
            phone: restaurant.phone,
            rating: restaurant.rating
        }
        restaurantModel
            .findRestaurant(restaurantId)
            .then(
                function (restObj, error) {
                    if (restObj == null) {
                        restaurantModel
                            .addRestaurant(restForDb)
                            .then(
                                function (addRestObj) {
                                    restDbId = addRestObj._id;
                                    console.log(restDbId);
                                    var review = {
                                        _user: userId,
                                        _restaurant: restDbId,
                                        reviewText: restaurant.reviewText
                                    };
                                    var catData = {
                                        _restaurant: restDbId,
                                        category : restaurant.category,
                                        _user: userId,
                                        rating: restaurant.rating,
                                        city: restaurant.city
                                    };

                                    reviewModel
                                        .addReview(review)
                                        .then(
                                            function (reviewObj) {
                                                res.json(reviewObj);
                                            }, function (err) {
                                                res.status(400).send(err);
                                            }
                                        );
                                    categoryModel
                                        .findRestaurant(restDbId)
                                        .then(
                                            function (restObj, error) {
                                                if (restObj == null) {
                                                    categoryModel
                                                        .addCategoryRestaurant(catData)
                                                        .then(
                                                            function (addCatObj) {
                                                                res.json(addCatObj);
                                                            },
                                                            function (err) {
                                                                res.status(400).send(err);
                                                            }
                                                        );

                                                } else {
                                                    res.json(restObj);
                                                }
                                            });

                                },
                                function (error) {
                                    res.status(400).send(err);
                                });

                    } else {
                        restDbId = restObj._id;
                        console.log(restDbId);
                        var review = {
                            _user: userId,
                            _restaurant: restDbId,
                            reviewText: restaurant.reviewText
                        };
                        var catData = {
                            _restaurant: restDbId,
                            category : restaurant.category,
                            _user: userId,
                            rating: restaurant.rating,
                            city: restaurant.city
                        };
                        reviewModel
                            .addReview(review)
                            .then(
                                function (reviewObj) {
                                    res.json(reviewObj);
                                }, function (err) {
                                    res.status(400).send(err);
                                }
                            );
                        categoryModel
                            .findRestaurant(restDbId)
                            .then(
                                function (restObj, error) {
                                    if (restObj == null) {
                                        categoryModel
                                            .addCategoryRestaurant(catData)
                                            .then(
                                                function (addCatObj) {
                                                    res.json(addCatObj);
                                                },
                                                function (err) {
                                                    res.status(400).send(err);
                                                }
                                            );

                                    } else {
                                        res.json(restObj);
                                    }
                                });

                    }
                },
                function(error) {
                    res.status(400).send(err);
                });

    }


    function findAllReviewsByRestaurantId(req, res) {
        reviewModel
            .findAllReviewsByRestaurantId(req.params.restaurantId)
            .then(
                function (restReviewObj) {
                    res.json(restReviewObj);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllReviewsByUserId(req, res) {
        reviewModel
            .findAllReviewsByUserId(req.params.userId)
            .then( function (restReviewObj) {
                    res.json(restReviewObj);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
};
