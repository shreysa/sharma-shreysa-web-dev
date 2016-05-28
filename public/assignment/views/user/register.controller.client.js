(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);





    function RegisterController($location, UserService) {


        var vm = this;
        vm.register = register;
        function register (username, password1, password2) {
            var user =  UserService.findUserByUsername(username);
            if(user) {
                vm.error = "Username already present";
            }
            else if(password1 !==password2) {
                vm.error = "Passwords dont match";
            }
            else{
                var user = UserService.createUser({username: username, password: password1});
                var id = user._id;
                $location.url("/user/" + id);
            }
        }

    }


})();

