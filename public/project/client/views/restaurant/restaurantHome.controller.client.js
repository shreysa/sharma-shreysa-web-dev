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
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.checkUser = checkUser;
        vm.DBRestaurant = null;
        vm.navigateToReviews = navigateToReviews;

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
                        
                        // var restForDatabase = {
                        //     restaurantId: vm.restaurant.id,
                        //     name: vm.restaurant.name,
                        //     image: vm.restaurant.image_url,
                        //     location: vm.restaurant.location.address[0],
                        //     city: vm.restaurant.location.city,
                        //     phone: vm.restaurant.display_phone,
                        //     rating: vm.restaurant.rating
                        // };
                        //
                        // LikeService
                        //     .addRestaurant(restForDatabase)
                        //     .then(
                        //         function (response) {
                        //             console.log("restaurant added");
                        //             vm.DBRestaurant = response.data;
                        //         }, function (error) {
                        //             vm.error = "error ocurred"
                        //         })


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
                                        if(response.data.length>0){
                                        console.log("*******who liked is next");
                                        vm.usersWhoLiked = response.data;
                                        console.log(response.data);
                                        vm.hasLiked = true;
                                    }else{
                                vm.hasLiked= false;
                            }
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
                                        if(response.data.length >0){
                                        vm.reviews = response.data;
                                        console.log("this is the review data");
                                        console.log(vm.reviews);
                                        vm.hasBeenReviewed = true;
                                    }else{
                                vm.hasBeenReviewed = false;
                            }
                                    }, function (error) {
                                        vm.error = error;
                                    }
                                );
                            
                            var ratingForRest = {
                                rating : vm.restaurant.rating
                            };
                            
                            ReviewService
                                .getReviewByUserId(vm.userId, vm.restId)
                                .then(
                                    function (response) {
                                        if (response.data != null) {
                                            console.log("this is review for this user");
                                            console.log(response.data);
                                            vm.review = response.data;
                                          //  vm.review.text= response.data.reviewText;
                                         vm.review.text = response.data.reviewText;
                                            vm.hasReview = true;
                                        }
                                        else{
                                            vm.hasReview = false;
                                        }
                                    }
                                )

                            var category = vm.restaurant.categories[0][0];

                            LikeService
                                .getCategory(category)
                                .then(
                                    function (response) {
                                        if (response.data.length >0) {
                                            console.log("category is");
                                            vm.allCategoryRestaurant = response.data;
                                            vm.categoryRestaurant = [];
                                            console.log(vm.categoryRestaurant);

                                            for (i = 0; i < vm.allCategoryRestaurant.length; i++) {
                                                if (vm.allCategoryRestaurant[i]._restaurant.name != vm.restaurant.name) {
                                                    vm.categoryRestaurant.push(vm.allCategoryRestaurant[i]);
                                                }
                                            }
                                            if (vm.categoryRestaurant.length > 0) {
                                                vm.hasCategory = true;
                                            } else {
                                                vm.hasCategory = false;
                                            }
                                        }
                                        else{
                                            vm.hasCategory = false;
                                        }
                                    }
                                );
                            CategoryService
                                .findRestaurantByRating(ratingForRest)
                                .then(
                                    function (response) {
                                            if (response.data.length >0) {

                                                vm.allRatingRestaurant = response.data;
                                                vm.ratingRestaurant = [];


                                                for (i = 0; i < vm.allRatingRestaurant.length; i++) {
                                                    if (vm.allRatingRestaurant[i]._restaurant.name != vm.restaurant.name) {
                                                        vm.ratingRestaurant.push(vm.allRatingRestaurant[i]);
                                                    }
                                                }
                                                if (vm.ratingRestaurant.length > 0) {
                                                    vm.hasRatingRestaurant = true;
                                                } else {
                                                    vm.hasRatingRestaurant = false;
                                                }
                                            }
                                            else{
                                                vm.hasRatingRestaurant = false;
                                            }
                                        }
                                        );


                            var city = vm.restaurant.location.city;
                            CategoryService
                                .findRestaurantByCity(city)
                                .then(
                                    function (response) {
                                        if(response.data.length >0){
                                            console.log("city is when rest was old");
                                            vm.allCityRestaurant = response.data;
                                            vm.cityRestaurant = [];
                                            for(i = 0; i< vm.allCityRestaurant.length; i++) {
                                                if (vm.allCityRestaurant[i]._restaurant.name != vm.restaurant.name) {
                                                    vm.cityRestaurant.push(vm.allCityRestaurant[i]);
                                                }
                                            }
                                            if (vm.cityRestaurant.length > 0) {
                                                vm.hasCity = true;
                                            } else {
                                                vm.hasCity = false;
                                            }
                                        }
                                        else{
                                            vm.hasCity = false;
                                        }
                                    }
                                );
                        }
                        else {
                            vm.thisUserLikes = false;
                            vm.restId = null;
                            var ratingForRest = {
                                rating : vm.restaurant.rating
                            };

                            var category = vm.restaurant.categories[0][0];

                            LikeService
                                .getCategory(category)
                                .then(
                                    function (response) {
                                        if (response.data.length >0) {
                                            console.log("category is");
                                            vm.allCategoryRestaurant = response.data;
                                            vm.categoryRestaurant = [];
                                            console.log(vm.categoryRestaurant);

                                            for (i = 0; i < vm.allCategoryRestaurant.length; i++) {
                                                if (vm.allCategoryRestaurant[i]._restaurant.name != vm.restaurant.name) {
                                                    vm.categoryRestaurant.push(vm.allCategoryRestaurant[i]);
                                                }
                                            }
                                            if (vm.categoryRestaurant.length > 0) {
                                                vm.hasCategory = true;
                                            } else {
                                                vm.hasCategory = false;
                                            }
                                        }
                                        else{
                                            vm.hasCategory = false;
                                        }
                                    }
                                );
                            CategoryService
                                .findRestaurantByRating(ratingForRest)
                                .then(
                                    function (response) {
                                        if (response.data.length >0) {

                                            vm.allRatingRestaurant = response.data;
                                            vm.ratingRestaurant = [];


                                            for (i = 0; i < vm.allRatingRestaurant.length; i++) {
                                                if (vm.allRatingRestaurant[i]._restaurant.name != vm.restaurant.name) {
                                                    vm.ratingRestaurant.push(vm.allRatingRestaurant[i]);
                                                }
                                            }
                                            if (vm.ratingRestaurant.length > 0) {
                                                vm.hasRatingRestaurant = true;
                                            } else {
                                                vm.hasRatingRestaurant = false;
                                            }
                                        }
                                        else{
                                            vm.hasRatingRestaurant = false;
                                        }
                                    }
                                );
                            var city = vm.restaurant.location.city;
                            CategoryService
                                .findRestaurantByCity(city)
                                .then(
                                    function (response) {
                                        if(response.data.length >0){
                                            console.log("city is when rest was old");
                                            vm.allCityRestaurant = response.data;
                                            vm.cityRestaurant = [];
                                            for(i = 0; i< vm.allCityRestaurant.length; i++) {
                                                if (vm.allCityRestaurant[i]._restaurant.name != vm.restaurant.name) {
                                                    vm.cityRestaurant.push(vm.allCityRestaurant[i]);
                                                }
                                            }
                                            if (vm.cityRestaurant.length > 0) {
                                                vm.hasCity = true;
                                            } else {
                                                vm.hasCity = false;
                                            }
                                        }
                                        else{
                                            vm.hasCity = false;
                                        }
                                    }
                                );

                        }
                    }, function (error) {
                            vm.error = error
                        }
                        );


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
                        vm.success = "Thank you for liking " + vm.restaurant.name;
                        console.log(response.data);
                        console.log("this is the rest id after liking the restaurant");
                        vm.restId = response.data._id;
                        LikeService
                            .findAllLikedByRestaurantId(vm.restId)
                            .then(
                                function (response) {
                                    if(response.data.length>0){
                                    vm.usersWhoLiked = response.data;
                                    console.log(response.data);
                                    console.log(vm.usersWhoLiked[0]._user.username);
                                    vm.hasLiked = true;
                                }else{
                            vm.hasLiked = false;
                        }
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
                                    if(response.data.length >0) {
                                        vm.usersWhoLiked = response.data;
                                        console.log(response.data);
                                        // console.log(vm.usersWhoLiked[0]._user.username);
                                        vm.hasLiked = true;
                                    }else{
                                        vm.hasLiked = false;
                                    }
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
                var restaurantReview = {
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
                    .addReview(vm.userId, vm.yelpRestId, restaurantReview)
                    .then(
                        function (response) {
                            console.log("review added");
                            console.log(response.data);
                            alert("review was successfully submitted");
                            vm.hasReview = true;
                            $location.url("/user/" + vm.userId + "/restaurant/" +  vm.yelpRestId + "/reviews");
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

        function updateReview() {
            if (vm.review.text !=null ) {
                ReviewService
                    .updateReview(vm.review._id, vm.review.text)
                    .then(
                        function (response) {
                            vm.success = "review was successfully updated";
                            alert("review was successfully updated");
                            vm.hasReview = true;
                            $location.url("/user/" + vm.userId + "/restaurant/" + vm.yelpRestId + "/reviews");
                        },
                        function (error) {
                            vm.error = "review could not be updated";
                        }
                    );
            }
            else {
                    $("#review").css({'border-color': 'crimson'});
                    vm.error = "Review text cannot be empty";
                }
        }
        
        function deleteReview() {
            ReviewService
                .deleteReview(vm.review._id)
                .then(
                    function (response) {
                        vm.success = "review was successfully deleted";
                        alert("review was successfully deleted");
                        vm.hasReview = false;
                        $location.url("/user/" + vm.userId + "/restaurant/" + vm.yelpRestId + "/likes");
                    },
                    function (error) {
                        vm.error = "review could not be deleted";
                    }
                );
        }

        function checkUser(userId) {
            if(userId == vm.userId){
                //return true;
                $location.url("/user/" + vm.userId);
            }else{
                $location.url("/user/" + vm.userId + "/" + userId + "/profile");
            }
        }
        
        function navigateToReviews() {
            $location.url("/user/" + vm.userId + "/restaurant/" + vm.DBRestaurant._id + "/reviews");
        }




        
        
    }
})();
