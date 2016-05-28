(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);
    
    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.updateWebsite = updateWebsite;
        vm.navigateToWebsite = navigateToWebsite;
        vm.navigateToProfile = navigateToProfile;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);


        }
        init();

        function deleteWebsite(websiteId){
            var result = WebsiteService.deleteWebsite(vm.websiteId);
            if(result){
                vm.success = "Website was successfully deleted";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Website could not be deleted";
                $location.url("/user/" + vm.userId + "/website");

            }

        }
        function updateWebsite() {
            var result =  WebsiteService.updateWebsite(vm.websiteId, vm.website);
            if (result){
                vm.success = "Website was successfully updated";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Website not found";
                $location.url("/user/" + vm.userId + "/website");
            }
        }
        function navigateToWebsite() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }
        
    }
        
})();
