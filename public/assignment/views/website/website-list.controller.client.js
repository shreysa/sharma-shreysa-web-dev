(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)

    function WebsiteListController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.navigateToProfile = navigateToProfile;
        vm.navigateToNewWebsite = navigateToNewWebsite;
        vm.userId = $routeParams.userId;


        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function navigateToNewWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");

        }



    }
})();
