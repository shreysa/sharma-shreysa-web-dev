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

        function createWebsite(website) {
                if(website) {
                    WebsiteService
                        .createWebsite(vm.userId, website)
                        .then(function (response) {
                            var website = response.data;
                            if (website._id) {
                                $location.url("/user/" + vm.userId + "/website");
                            }
                            else{
                                vm.error="Unable to create website";
                            }
                        },
                        function (error) {
                            vm.error="Unable to create website";
                        });
                } else{
                    $("#websiteName").css({'border-color' : 'crimson'});
                    vm.error = "website's name cannot be empty";
                }

        }

        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }
        }
    
})();


