(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);


    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
       vm.userId = $routeParams.userId;

        vm.navigateToWebsiteList = navigateToWebsiteList;
        vm.createWebsite = createWebsite;
        vm.navigateToProfile = navigateToProfile;

        function init(){

        } init();

        function navigateToWebsiteList(){
            $location.url("/user/" + userId + "/website");
        }

        function createWebsite(websiteName, websiteDescription) {
            var result =  WebsiteService.createWebsite(vm.userId, {websiteName: websiteName, websiteDescription: websiteDescription});
            if (result){
                vm.success = "Website was successfully created";
                $location.url("/user/" + result.developerId + "/website");
            } else {
                vm.error = "Website not created";
                $location.url("/user/" + vm.userId + "/website");
            }
        }
        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }
        }
    
})();


