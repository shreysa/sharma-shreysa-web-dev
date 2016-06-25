(function () {
    angular
        .module("EatHeartyApp")
        .controller("OtherFollowerController", OtherFollowerController);

    function OtherFollowerController(UserService, FollowService, $location, $routeParams) {
        var vm = this;
        vm.user = {"userId": $routeParams.userId};
        vm.otherUser = {"otherUserId" : $routeParams.otherUserId};





        function init() {
            FollowService
                .findAllFollowingUserId(vm.otherUser.otherUserId)
                .then(function (response) {
                    if(response.data!= null) {
                        vm.followedBy = response.data;
                        console.log(vm.followedBy[0]._user.username);
                        vm.hasFollowers = true;
                    }
                    else{
                        vm.hasFollowers = false;
                    }
                },
                    function (error) {
                        vm.error = "no user follows";
                    });
        }
        init();




        function findFriend(findFriend) {
            UserService
                .findFriend(findFriend)
                .then(function (response) {
                    vm.friends = response.data;
                    console.log(response.data);
                    console.log(vm.friends.firstName);
                });


        }
    }})();



