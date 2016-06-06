(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, UserService) {


        var vm = this;
        vm.register = register;
        function register(username, password1, password2) {
            if(password1 !==password2) {
                vm.error = "Passwords don't match";
            }else {
                UserService
                    .findUserByUsername(username)
                    .then(function (response) {
                        var userExist = response.data;
                        if (userExist._id) {
                            vm.error = "Username already exists";
                        } else {
                            UserService
                                .createUser(username, password1)
                                .then(function (response) {
                                    var user = response.data;
                                    if (user._id) {
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

