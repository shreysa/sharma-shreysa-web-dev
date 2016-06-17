(function () {
    angular
        .module("EatHeartyApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
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
            .when("/user/:userId/findFriend", {
                templateUrl: "client/views/user/findFriend.view.client.html",
                controller: "FriendSearchController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "client/views/user/login.view.client.html",
                controller: "LoginController",
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
            .when("/register", {
                templateUrl: "client/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "/home"
            });

    }
})();

