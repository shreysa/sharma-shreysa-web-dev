(function(){
    angular
        .module("EatHeartyApp")
        .controller("ProfileController", ProfileController);



    function ProfileController($routeParams, UserService, $location){//, $rootScope) {
        var vm = this;
         vm.updateUser = updateUser;
       vm.unregister = unregister;
        vm.navigateToProfile = navigateToProfile;
       // vm.logout = logout;
        var index = -1;
        vm.userId = $routeParams.userId;
        //  var id = $rootScope.currentUser._id;

    



        function init() {
                UserService
                    .findUserById(vm.userId)
                    .then(function (response) {

                        vm.user = response.data;
                        //console.log(vm.user.email);
                    });
        }
        init();

        function navigateToProfile() {
            $location.url("/user/" + vm.userId);
        }
        
        // function logout() {
        //     UserService
        //         .logout()
        //         .then(
        //             function (response) {
        //                 $location.url("/login");
        //             },
        //             function () {
        //                 $location.url("/login");
        //             }
        //         )
        // }

     


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
                .updateUser(vm.userId, vm.user)
                .then(function (response){
                   vm.success= "user was updated successfully";

                },
                    function () {
                    vm.error = "User not updated";
                });
    }
    }



})();
