(function () {
    angular
        .module("EatHeartyApp")
        .controller("OtherFollowController", OtherFollowController);

    function OtherFollowController(UserService, FollowService, $location, $routeParams) {
        var vm = this;
        vm.user = {"userId": $routeParams.userId};
        vm.otherUser = {"otherUserId" : $routeParams.otherUserId};

       



        function init() {
            FollowService
                .findAllFollowedByUserId(vm.otherUser.otherUserId)
                .then(function (response) {
                    if(response.data.length > 0) {
                        vm.follows = response.data;
                       // console.log(vm.follows[0]._userFollow.username);
                        vm.isFollowing = true;
                    }else{
                        vm.isFollowing = false;
                    }
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


