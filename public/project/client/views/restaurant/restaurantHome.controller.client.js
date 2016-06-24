(function() {
    angular
        .module("EatHeartyApp")
        .controller("RestaurantHomeController", RestaurantHomeController);

    function RestaurantHomeController($location, YelpService, $routeParams, UserService, LikeService,ReviewService, CategoryService) {
        var vm = this;

        // vm.findRestaurantById = findRestaurantById;
        vm.likeRestaurant = likeRestaurant;
        vm.unlikeRestaurant = unlikeRestaurant;
        vm.addReview = addReview;

        vm.userId = $routeParams.userId;
        var username = "";
        vm.yelpRestId = $routeParams.restaurantId;
        var usernamesOfWhoLiked = [];
        vm.thisUserLikes = false;
        vm.restId = null;

        function init() {
            YelpService
                .findRestaurantById( vm.yelpRestId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;

            LikeService
                .findRestaurant( vm.yelpRestId)
                .then(
                    function (response) {
                        if (response.data != null) {
                            vm.restId = response.data._id;
                            console.log(vm.restId + "  this is the restId");
                            console.log(response.data);

                            LikeService
                                .findAllLikedByRestaurantId(vm.restId)
                                .then(
                                    function (response) {
                                        console.log("*******who liked is next");
                                        vm.usersWhoLiked = response.data;
                                        console.log(response.data);
                                    }, function (error) {
                                        vm.error = error
                                    });
                            LikeService
                                .findThisLikedByUserId(vm.userId, vm.restId)
                                .then(
                                    function (response) {
                                        if (response.data) {
                                            console.log("------this is if the user liked it loop");
                                            console.log(response.data);
                                            vm.thisUserLikes = true;
                                        }
                                        else {
                                            vm.thisUserLikes = false;
                                        }
                                    }, function (error) {
                                        vm.error = error
                                    });

                            ReviewService
                                .findAllReviewsByRestaurantId(vm.restId)
                                .then(
                                    function (response) {
                                        vm.reviews = response.data;
                                        console.log("this is the review data");
                                        console.log(vm.reviews);
                                    }, function (error) {
                                        vm.error = error;
                                    }
                                );
                            var ratingForRest = {
                                rating : vm.restaurant.rating
                            };
                            CategoryService
                                .findRestaurantByCategory(vm.yelpRestId, vm.restaurant.categories[0][0])
                                .then(
                                    function (response) {
                                        console.log("category is");
                                      vm.categoryRestaurant =  response.data;
                                        console.log(vm.categoryRestaurant);
                                    }
                                );
                            CategoryService
                                .findRestaurantByRating(ratingForRest)
                                .then(
                                    function (response) {
                                        console.log("rating is when rest was old");
                                        vm.ratingRestaurant = response.data;
                                        for(i = 0; i< vm.ratingRestaurant.length; i++){
                                            if(vm.ratingRestaurant[i]._restaurant.name == vm.restaurant.name){
                                                vm.ratingRestaurant.splice(i, 1);
                                            }
                                        }
                                        // vm.ratingRestaurant.splice(vm.restaurant.id)
                                        console.log(vm.ratingRestaurant);
                                    }
                                );

                        }
                        else {
                            vm.thisUserLikes = false;
                            vm.restId = null;
                            var ratingForRest = {
                                rating : vm.restaurant.rating
                            };

                            CategoryService
                                .findRestaurantByCategory(vm.yelpRestId, vm.restaurant.categories[0][0])
                                .then(
                                    function (response) {
                                        console.log("category is");
                                        vm.categoryRestaurant = response.data;
                                        console.log(vm.categoryRestaurant);
                                    }
                                );
                            CategoryService
                                .findRestaurantByRating(ratingForRest)
                                .then(
                                    function (response) {
                                        console.log("rating is when rest was new");
                                        vm.ratingRestaurant = response.data;
                                        console.log(vm.ratingRestaurant);
                                    }
                                );
                        }
                    }, function (error) {
                            vm.error = error
                        }
                        );


                            //
                            // CategoryService
                            //     .addCategoryRestaurant( vm.restaurant)
                            //     .then(
                            //         function (response) {
                            //             console.log("category added");
                            //             console.log(response.data);
                            //         }
                            //     );
                            // CategoryService
                            //     .findAllFromThisCategory(vm.restId)
                            //     .then(function (response) {
                            //             vm.categoryRestaurant = response.data;
                            //             console.log("this is the category data");
                            //             console.log(vm.categoryRestaurant);
                            //         }, function (error) {
                            //             vm.error = error;
                            //         }
                            //     );

                    },
             function (error) {
                        vm.error = "some error ocurred";
                    }
                );


            

        }
        init();


        function likeRestaurant() {
            var restaurant = {
                restaurantId: vm.restaurant.id,
                name: vm.restaurant.name,
                image: vm.restaurant.image_url,
                location: vm.restaurant.location.address[0],
                city: vm.restaurant.location.city,
                phone: vm.restaurant.display_phone,
                rating: vm.restaurant.rating,
                category: vm.restaurant.categories[0][0]
            };
            LikeService
                .likeRestaurant(vm.userId, restaurant)
                .then(
                    function (response) {
                        console.log("success added");
                        vm.success = "Thank you for liking" + vm.restaurant.name;
                        console.log(response.data);
                        console.log("this is the rest id after liking the restaurant");
                        vm.restId = response.data._id;
                        LikeService
                            .findAllLikedByRestaurantId(vm.restId)
                            .then(
                                function (response) {
                                    vm.usersWhoLiked = response.data;
                                    console.log(response.data);
                                    console.log(vm.usersWhoLiked[0]._user.username);
                                }, function (error) {
                                    vm.error = error
                                });
                    },

                    function (error) {
                        vm.error = "Some error ocurred";
                    });

            vm.thisUserLikes = true;
        }


        function unlikeRestaurant() {
            LikeService
                .unlikeRestaurant(vm.userId, vm.restId)
                .then(
                    function (response) {
                        console.log("successfully removed");
                        console.log(response.data);
                        LikeService
                            .findAllLikedByRestaurantId(vm.restId)
                            .then(
                                function (response) {
                                    vm.usersWhoLiked = response.data;
                                    console.log(response.data);
                                    console.log(vm.usersWhoLiked[0]._user.username);
                                }, function (error) {
                                    vm.error = error
                                });
                    },

                    function (error) {
                        vm.error = "Some error ocurred";
                    });
            vm.thisUserLikes = false;

        }


        function addReview(review) {
            if (review) {
                var restaurant = {
                    restaurantId: vm.restaurant.id,
                    name: vm.restaurant.name,
                    image: vm.restaurant.image_url,
                    location: vm.restaurant.location.address[0],
                    city: vm.restaurant.location.city,
                    phone: vm.restaurant.display_phone,
                    rating: vm.restaurant.rating,
                    reviewText: vm.review.text,
                    category: vm.restaurant.categories
                };
                ReviewService
                    .addReview(vm.userId, vm.yelpRestId, restaurant)
                    .then(
                        function (response) {
                            console.log("review added");
                            console.log(response.data);
                        }, function (error) {
                            vm.error = "some error ocurred";
                        }
                    )
            }
            else {
                $("#review").css({'border-color': 'crimson'});
                vm.error = "Review text cannot be empty";
            }


        }
        
        
    }
})();
