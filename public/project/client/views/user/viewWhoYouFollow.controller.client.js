(function(){
    angular
        .module("EatHeartyApp")
        .controller("WhoYouFollowController", WhoYouFollowController);



    function WhoYouFollowController($routeParams, FollowService) {
        var vm = this;
        vm.user = {"userId": $routeParams.userId};


        function init() {
            FollowService
                .findAllFollowedByUserId(vm.user.userId)
                .then(
                    function (response) {
                        if(response.data.length>0){
                            vm.isFollowing = true;
                            vm.following = response.data;
                            (vm.following[0]._user.username);
                        }else{
                            vm.isFollowing = false;
                        }
                    }, function error() {
                        vm.error = "some error ocurred while fetching following data";
                    });
        } init();

    }})();
