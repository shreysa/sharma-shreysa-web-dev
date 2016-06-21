(function () {
    angular
        .module("EatHeartyApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider

            .when("/user/:userId/:otherUserId/likes", {
                templateUrl: "client/views/user/like.view.client.html",
                controller: "LikeController",
                controllerAs: "model"
            })
            .when("/user/:userId/:otherUserId/profile", {
                templateUrl: "client/views/user/profile.other.view.client.html",
                controller: "ProfileOtherController",
                controllerAs: "model"
            })
            .when("/user/:userId/findPeople", {
                templateUrl: "client/views/user/findFriend.view.client.html",
                controller: "FriendSearchController",
                controllerAs: "model"
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
                controllerAs: "model"
            })

            .when("/", {
                templateUrl: "client/views/user/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
                templateUrl: "client/views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "client/views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            // .when("/user/:userId/:username/likes", {
            //     templateUrl: "client/views/user/like.view.client.html",
            //     controller: "LikeController",
            //     controllerAs: "model"
            // })
            .when("/register", {
                templateUrl: "client/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/user/:userId/restaurant/:restaurantId", {
                templateUrl: "client/views/user/restaurantHome.view.client.html",
                controller: "RestaurantHomeController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedIn(UserService, $location, $q, $rootScope) {
        
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        console.log(user);
                        if(user== '0'){
                            $rootScope.currentUser = null;
                            deferred.reject();
                        }else {
                            $rootScope.currentUser = user;
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

