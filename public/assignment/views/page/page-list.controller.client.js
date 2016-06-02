( function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController ($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.navigateToProfile = navigateToProfile;
        vm.navigateToWebsite = navigateToWebsite;
        vm.navigateToNewPage = navigateToNewPage;
        


        function  init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                });
        }
        init();


        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function navigateToWebsite() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function navigateToNewPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");

        }


    }

})();

