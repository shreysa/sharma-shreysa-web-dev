(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);



    function ProfileController($routeParams, UserService) {
        var vm = this;
        // vm.updateUser = updateUser;
        var index = -1;
        var id = $routeParams["userId"];

        function init() {
            vm.user = UserService.findUserById(id);

        }
        init();
        function updateUser() {
            var result =  UserService.updateUser(vm._id, vm.user);
            if (result){
                vm.success = "Profile was successfully updated";
            } else {
                vm.error = "User not found";
            }
        }
        function createUser(){
            // var result = UserService.

        }
    }



})();
