(function(){
    angular
        .module("EatHeartyApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {




        var vm = this;
        vm.register = register;
        function register(username, password1, password2, email) {
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
            else  if (email == null) {
                vm.error = "email cannot be empty";
            } else {
                            UserService
                                .register(username, password1, email)
                                .then(function (response) {
                                    var user = response.data;
                                    if (user!=null) {
                                        $location.url("/user/" + user._id);
                                    } else {
                                        vm.error = "username already present";
                                    }

                                });


            }
        }
    }

})();
