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

        function createPage(page) {
            if(page){
            PageService
                .createPage(vm.websiteId, page)
                .then(function (response) {
                var page = response.data;
                if (page._id) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }
                else{
                    vm.error="Unable to create page";
                }
                    },
                    function (error) {
                        vm.error="Unable to create page";
                    });
            } else{
                $("#Name").css({'border-color' : 'crimson'});
                vm.error = "page's name cannot be empty";
            }


        }

        function navigateToPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }

    }

})();
