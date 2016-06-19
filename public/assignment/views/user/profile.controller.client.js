(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);



    function ProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
         vm.updateUser = updateUser;
       vm.unregister = unregister;
        vm.navigateToProfile = navigateToProfile;
        vm.logout = logout;
        var index = -1;
       var id = $routeParams["userId"];
      //  var id = $rootScope.currentUser._id;


        function init() {
            if (!id && $rootScope.currentUser) {
                vm.user = $rootScope.currentUser;
            } else {
                UserService
                    .findUserById(id)
                    .then(function (response) {
                        console.log(response.data);
                        vm.user = response.data;
                    });
            }
        }
        init();
        
        function logout() {
         UserService
             .logout()
             .then(
                 function (response) {
                     $location.url("/login");
                 },
                 function () {
                     $location.url("/login");
                 }
             )
        }

        function navigateToProfile() {
            $location.url("/user/" + vm.user._id);
        }


        function unregister() {
            UserService
                .deleteUser(vm.user._id)
                .then(function () {
                        $location.url("/login");
                    },
                    function () {
                        vm.error = "Not able to delete";
                    });
        }



        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(function (response){
                   vm.success= "user was updated successfully";

                },
                    function (error) {
                    vm.error = "User not updated";
                });
    }
    }



})();
