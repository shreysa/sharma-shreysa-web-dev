module.exports = function (app, models) {

    var reviewModel = models.reviewModel;
    var restaurantModel = models.restaurantModel;

    app.post("/api/projectuser/:userId/review/:restaurantId", addReview);
    app.get("/api/projectuser/user/:userId", findAllReviewsByUserId);
    app.get("/api/projectuser/:restaurantId/reviews", findAllReviewsByRestaurantId);
  



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

                                    reviewModel
                                        .addReview(review)
                                        .then(
                                            function (reviewObj) {
                                                res.json(reviewObj);
                                            }, function (err) {
                                                res.status(400).send(err);
                                            }
                                        );
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

                        reviewModel
                            .addReview(review)
                            .then(
                                function (reviewObj) {
                                    res.json(reviewObj);
                                }, function (err) {
                                    res.status(400).send(err);
                                }
                            )
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

    function findAllReviewsByUserId(userId) {
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
