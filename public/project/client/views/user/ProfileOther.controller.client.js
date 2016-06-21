(function(){
    angular
        .module("EatHeartyApp")
        .controller("ProfileOtherController", ProfileOtherController);

    function ProfileOtherController($routeParams, UserService, $location) {//, $rootScope) {

        var vm = this;
        console.log($routeParams.userId);
        vm.user = {"userId": $routeParams.userId};
        var otherUserId = $routeParams.otherUserId;

        function init() {
            UserService
                .findUserById(otherUserId)
                .then(function (response) {
                    vm.userOther = response.data;
                    console.log("on like page");
                    console.log("logged in user:" + vm.user.userId);
                   console.log(vm.userOther._id);
                    console.log(vm.userOther.username);
                });
        }
        init();

    }
})();
