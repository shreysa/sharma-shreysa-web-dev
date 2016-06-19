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
            PageService
                .findPageById( vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                });
        }
        init();
        
        vm.navigateToPageList = navigateToPageList;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.navigateToProfile = navigateToProfile;


        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }

        function deletePage() {
          PageService
              .deletePage(vm.pageId)
        .then(function () {
                vm.success = "Page was successfully deleted";
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }, function () {
                vm.error = "Page was not deleted";
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            });
        }
        

        function navigateToPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function updatePage(page) {
            if(page.name){
            PageService
                .updatePage(vm.pageId, vm.page)
                .then(function (response) {
                    vm.success = "Page was successfully updated";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function (error) {
                    vm.error = "page not updated";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });}
            else{
                $("#PageName").css({'border-color' : 'crimson'});
                vm.error = "page's name cannot be empty";
            }
        }
        
    }
    
})();
