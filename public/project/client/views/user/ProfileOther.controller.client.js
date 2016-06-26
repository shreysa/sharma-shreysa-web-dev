(function(){
    angular
        .module("EatHeartyApp")
        .controller("ProfileOtherController", ProfileOtherController);

    function ProfileOtherController($routeParams, UserService, $location, FollowService) {

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

                    FollowService
                        .findFollow(vm.user.userId, vm.userOther._id)
                        .then(function (response) {
                            if (response.data != null) {
                                vm.userFollows = true;
                                console.log("******");
                                console.log(vm.userFollows);
                            }
                            else {
                                vm.userFollows = false;
                            }
                        }, function (error) {
                            vm.error = "error ocurred";
                        });
                });

        }
        init();
        
        function addFollow() {
            FollowService
                    .addFollow(vm.user.userId, vm.userOther._id )
                .then(
                    function (response) {
                        vm.success = "You started following " + vm.userOther.username;
                        vm.userFollows = true;
                    },
                    function (error) {
                        vm.error = "Could not follow" + vm.userOther.username + "due to some internal error";
                    }
                );
        }

        function unfollowUser() {
            FollowService
                .unfollowUser(vm.user.userId, vm.userOther._id )
                .then(
                    function (response) {
                        vm.success = "You no more follow " + vm.userOther.username;
                        vm.userFollows = false;
                    },
                    function (error) {
                        vm.error = "Could not follow" + vm.userOther.username + "due to some internal error";
                    }
                );
        }

    }
})();
