(function(){
    angular
        .module("EatHeartyApp")
        .controller("LoginController", LoginController);
       

   
    

    function LoginController($location, UserService) {


        var vm = this;
        vm.login = function (username, password) {
            //if(username!= null && password !=null) {
            UserService
                .login(username, password)
                .then(function (response) {
                    var user = response.data;
                    if (user != null) {
                        $location.url("/user/" + user._id);
                    }
                    else {
                        vm.error = "User not present or incorrect credentials";
                    }
                });

        }
    }


})();
