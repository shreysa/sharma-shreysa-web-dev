(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, UserService) {


        var vm = this;
        vm.register = register;
        function register(username, password1, password2) {
            UserService
                .createUser(username, password1)
                .then(function (response) {
                    var user = response.data;
                    if (user._id) {
                        $location.url("/user/" + user._id);
                    }
               /*     else if(password1 !==password2) {
                     vm.error = "Passwords dont match";
                     }
                     else{
                     var user = UserService.createUser({username: username, password: password1});
                     var id = user._id;
                     $location.url("/user/" + id);
                     }*/
                });
        }
    }
})();

