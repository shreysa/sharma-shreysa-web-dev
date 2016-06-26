(function () {
    angular
        .module("EatHeartyApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider

            .when("/user/:userId/restaurant/:restaurantId/reviews", {
                templateUrl: "client/views/review/showReview.view.client.html",
                controller: "RestaurantHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/:otherUserId/restaurant/reviewsByUser", {
                templateUrl: "client/views/review/reviewByUser.view.client.html",
                controller: "ReviewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/restaurant/rating/:restaurantId", {
                templateUrl: "client/views/restaurant/ratingRestaurant.view.client.html",
                controller: "RestaurantHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/restaurant/category/:restaurantId", {
                templateUrl: "client/views/restaurant/categoryRestaurant.view.client.html",
                controller: "RestaurantHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/admin/:userId", {
                templateUrl: "client/views/admin/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })


            .when("/user/:userId/:restaurantId/writeReview", {
                templateUrl: "client/views/review/writeReview.view.client.html",
                controller: "RestaurantHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            
            .when("/user/:userId/:otherUserId/follows", {
                templateUrl: "client/views/follow/otherFollow.view.client.html",
                controller: "OtherFollowController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/followedBy/:otherUserId", {
                templateUrl: "client/views/follow/otherFollower.view.client.html",
                controller: "OtherFollowerController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/restaurant/:restaurantId/likes", {
                templateUrl: "client/views/restaurant/restaurantLikedByUser.view.client.html",
                controller: "RestaurantHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/:otherUserId/likes", {
                templateUrl: "client/views/restaurant/like.view.client.html",
                controller: "LikeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/:otherUserId/profile", {
                templateUrl: "client/views/user/profile.other.view.client.html",
                controller: "ProfileOtherController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/own/followedBy", {
                templateUrl: "client/views/user/viewOwnFollowers.view.client.html",
                controller: "OwnFollowersController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/user/ownLikes", {
                templateUrl: "client/views/user/viewOwnLikes.view.client.html",
                controller: "OwnLikeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/own/reviewsByUser", {
                templateUrl: "client/views/user/viewOwnReviews.view.client.html",
                controller: "OwnReviewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/user/ownFollows", {
                templateUrl: "client/views/user/viewWhoYouFollow.view.client.html",
                controller: "WhoYouFollowController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/findPeople", {
                templateUrl: "client/views/user/findFriend.view.client.html",
                controller: "FriendSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            
            .when("/home", {
                templateUrl: "client/views/user/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"

            })
            .when("/yelp", {
                templateUrl: "client/views/yelp/yelp.search.view.client.html",
                controller: "YelpSearchController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "client/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/user/:userId/home", {
                templateUrl: "client/views/user/userHome.view.client.html",
                controller: "UserHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/", {
                templateUrl: "client/views/user/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
                templateUrl: "client/views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user", {
                templateUrl: "client/views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
           
            .when("/register", {
                templateUrl: "client/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/user/:userId/restaurant/:restaurantId", {
                templateUrl: "client/views/restaurant/restaurantHome.view.client.html",
                controller: "RestaurantHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/home/:restaurantId", {
                templateUrl: "client/views/restaurant/restaurantHomeOther.view.client.html",
                controller: "RestaurantHomeOtherController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedIn(UserService, $location, $q, $rootScope, $window) {
        
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        console.log(user);
                        if(user== '0'){
                            $rootScope.currentUser = null;
                            $window.sessionStorage.setItem("currentUser", '0');
                            deferred.reject();
                            $location.url("/login");
                        }else {
                            $rootScope.currentUser = user;
                            $window.sessionStorage.setItem("currentUser", user._id);
                            deferred.resolve();
                        }
                    },
                    function (error) {
                        $location.url("/login");
                    }
                );
        
            return deferred.promise;
        }

    }
})();

