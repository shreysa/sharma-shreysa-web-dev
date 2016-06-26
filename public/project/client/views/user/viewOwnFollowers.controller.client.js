(function(){
    angular
        .module("EatHeartyApp")
        .controller("OwnFollowersController", OwnFollowersController);



    function OwnFollowersController($routeParams, FollowService) {
        var vm = this;
        vm.user = {"userId": $routeParams.userId};


        function init() {
            FollowService
                .findAllFollowingUserId(vm.user.userId)
                .then(
                    function (response) {
                        if(response.data.length>0){
                            vm.hasFollowers = true;
                            vm.followers = response.data;
                        }else{
                            vm.hasFollowers = false;
                        }
                    }, function error() {
                        vm.error = "some error ocurred while fetching follower data";
                    })
        } init();

    }})();







