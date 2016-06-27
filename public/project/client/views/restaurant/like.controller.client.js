(function() {
    angular
        .module("EatHeartyApp")
        .controller("LikeController", LikeController);


    function LikeController($location, UserService, $routeParams, LikeService) {
        var vm = this;
        vm.user = {"userId": $routeParams.userId};
        vm.otherUser = {"otherUserId" : $routeParams.otherUserId};
        
        function init() {
            LikeService
                .findAllLikedByUserId(vm.otherUser.otherUserId)
                .then
                    (function (response) {
                        if(response.data.length>0) {
                            vm.likedRestaurant = response.data;
                       
                            vm.hasLiked = true;
                        }else{
                            vm.hasLiked=false;
                        }
           
                }, function (error) {
                        vm.error = error;
                    }
                );
            UserService
                .findUserById(vm.otherUser.otherUserId)
                .then(
                    function (response) {
                        vm.otherUser = response.data;
                       
                    }, function (error) {
                        vm.error = error;
                    }
                )
        }
        init();
        
        
        
        
    }

})();
