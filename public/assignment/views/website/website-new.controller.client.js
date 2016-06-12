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
            $location.url("/user/" + vm.userId + "/website");
        }

        function createWebsite() {
                if(vm.website.name) {

                    WebsiteService
                        .createWebsite(vm.userId, vm.website)
                        .then(function (response) {
                            var website = response.data;
                            if (website._id) {
                                $location.url("/user/" + vm.userId + "/website");
                            }
                        });
                } else{
                    vm.error = "website's name cannot be empty";
                }

        }

        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }
        }
    
})();


