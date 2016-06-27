(function(){
    angular
        .module("EatHeartyApp")
        .controller("LoginController", LoginController);


    function LoginController($location, UserService) {
            var vm = this;
            vm.login = function(username, password) {
                //if(username!= null && password !=null) {
                UserService
                    .login(username, password)
                    //  .findUserByCredentials(username, password)
                    .then(function (response) {
                            var user = response.data;
                            console.log(response.data);
                            if (user != null) {
                                if (user.isAdmin) {
                                    $location.url("/user/admin/" + user._id);
                                } else {
                                    $location.url("/user/" + user._id);
                                }
                            }
                            else {
                                vm.error = "User not present or incorrect credentials";
                            }
                        },
                        function (error) {
                            vm.error = "Invalid credentials or no details entered";
                        });

                //  }
                //     else if(username == null && password == null){
                //     vm.error = "Username and password cannot be empty";
                // }
                // else if(username== null){
                //     vm.error = "Username cannot be empty";
                // }
                // else if (password == null){
                //     vm.error = "password cannot be empty";
                // }



            }

        }


    })();
