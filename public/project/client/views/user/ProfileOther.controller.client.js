(function(){
    angular
        .module("EatHeartyApp")
        .controller("ProfileOtherController", ProfileOtherController);

    function ProfileOtherController($routeParams, UserService, $location, FollowService) {//, $rootScope) {

        var vm = this;
        console.log($routeParams.userId);
        vm.user = {"userId": $routeParams.userId};
        var otherUserId = $routeParams.otherUserId;
        vm.addFollow = addFollow;
        vm.unfollowUser = unfollowUser;

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
        
        function addFollow() {
            FollowService
                    .addFollow(vm.user.userId, vm.userOther._id )
                .then(
                    function (response) {
                        vm.success = "You started following" + vm.otherUser.username;
                    },
                    function (error) {
                        vm.error = "Could not follow" + vm.otherUser.username + "due to some internal error";
                    }
                );
        }

        function unfollowUser() {
            FollowService
                .unfollowUser(vm.user.userId, vm.userOther._id )
                .then(
                    function (response) {
                        vm.success = "You no more follow" + vm.otherUser.username;
                    },
                    function (error) {
                        vm.error = "Could not follow" + vm.otherUser.username + "due to some internal error";
                    }
                );
        }

    }
})();
