(function () {
    angular
        .module("EatHeartyApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "client/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "client/views/user/login.view.client.html",
                controller: "LoginController",
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
                redirectTo: "/login"
            });

    }
})();

