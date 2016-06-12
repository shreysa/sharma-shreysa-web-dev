(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, UserService) {


        var vm = this;
        vm.register = register;
        function register(username, password1, password2) {
            if(username == null){
                vm.error = "Username cannot be empty";
            }
            else if(password1 == null){
                vm.error = "password cannot be empty";
            }
            else if(password2 == null){
                vm.error = "verify password cannot be empty";
            } else  if (password1 !== password2) {
                vm.error = "Passwords don't match";
            }
            else {
                UserService
                    .findUserByUsername(username)
                    .then(function (response) {
                        var userExist = response.data;
                        if (userExist!= null) {
                            vm.error = "Username already exists";
                        }
                        else {
                            UserService
                                .createUser(username, password1)
                                .then(function (response) {
                                    var user = response.data;
                                    if (user!=null) {
                                        $location.url("/user/" + user._id);
                                    } else {
                                        vm.error = "user did not get added";
                                    }

                                });
                        }


                    });

            }
        }
    }
    
})();

