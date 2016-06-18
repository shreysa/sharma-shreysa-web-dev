(function(){
    angular
        .module("EatHeartyApp")
        .controller("ProfileOtherController", ProfileOtherController);

    function ProfileOtherController($routeParams, UserService, $location) {//, $rootScope) {

        var vm = this;
        console.log($routeParams.userId);
        vm.user = {"userId": $routeParams.userId};
        var username = $routeParams.username;

        function init() {
            UserService
                .findUserByUsername(username)
                .then(function (response) {
                    vm.userOther = response.data;
                    //console.log(vm.user.email);
                });
        }
        init();

    }
})();
