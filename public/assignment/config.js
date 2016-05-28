(function () {
    angular
        .module("WebAppMaker")
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
            templateUrl: "views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs: "model"
        })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
                
            })
            .when("/user/:userId/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:userId/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/widget-chooser", {
                templateUrl: "views/widget/widget-chooser.view.client.html"
            })
            .when("/widget-heading", {
                templateUrl: "views/widget/widget-heading.view.client.html"
            })
            .when("/widget-image", {
                templateUrl: "views/widget/widget-image.view.client.html"
            })
            .when("/widget-list", {
                templateUrl: "views/widget/widget-list.view.client.html"
            })
            .when("/widget-youtube", {
                templateUrl: "views/widget/widget-youtube.view.client.html"
            });

    }
})();
