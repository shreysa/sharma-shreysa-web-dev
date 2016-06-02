(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);



    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
         vm.updateUser = updateUser;
       vm.unregister = unregister;
        vm.navigateToProfile = navigateToProfile;
        var index = -1;
        var id = $routeParams["userId"];

        function init() {
                UserService
                    .findUserById(id)
                    .then(function (response) {
                        vm.user = response.data;
                    });
        }
        init();

        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }


        function unregister() {
            UserService
                .deleteUser(id)
                .then(function () {
                        $location.url("/login");
                    },
                    function () {
                        vm.error = "Not able to delete";
                    });
        }



        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(function (response){
                   vm.success= "user was updated successfully";

                },
                    function (error) {
                    vm.error = "User not updated";
                });
    }
    }



})();
