(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

      vm.createPage = createPage;
        vm.navigateToPageList = navigateToPageList;
        vm.navigateToProfile = navigateToProfile;

       function createPage() {
            var result = PageService.createPage(vm.websiteId, {pageName: vm.page.name, pageTitle: vm.page.title});
            if (result){
                vm.success = "Page was successfully created";
                $location.url("/user/" + vm.userId + "/website/" + result.websiteId + "/page");
            } else {
                vm.error = "Page not created";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }
        function navigateToPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }

    }

})
