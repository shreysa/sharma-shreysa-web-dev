(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);
    
    function  EditPageController($routeParams, $location, PageService) {
        
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        
        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
        
        vm.navigateToPageList = navigateToPageList;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function deletePage() {
            var result = PageService.deletePage(vm.pageId);
            if (result) {
                if (result) {
                    vm.success = "Page was successfully deleted";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                } else {
                    vm.error = "Website could not be deleted";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");

                }

            }
        }

        function navigateToPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function updatePage() {
            var result =  PageService.updatePage(vm.pageId, vm.page);
            if (result){
                vm.success = "Page was successfully updated";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Website not found";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }


        }
        
    }
    
})();
