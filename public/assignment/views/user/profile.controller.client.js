(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);



    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
         vm.updateUser = updateUser;
      //  vm.deleteUser = deleteUser;
        var index = -1;
        var id = $routeParams["userId"];

        function init() {
            vm.user = UserService.findUserById(id);

        }
        init();

      // function deleteUser() {
         //   var result = UserService.deleteUser(id);
           // if(result){
             //   vm.success = "Profile was successfully deleted";
               // $location.url("#/login");
            //}
            //else{
             //   vm.error("Unable to delete user");
            //}

       // }
        function updateUser() {
            var result =  UserService.updateUser(vm._id, vm.user);
            if (result){
                vm.success = "Profile was successfully updated";
            } else {
                vm.error = "User not found";
            }
        }

    }



})();
