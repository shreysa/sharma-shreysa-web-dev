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
                    vm.likedRestaurant = response.data;
                       console.log(vm.likedRestaurant);
                       console.log(vm.likedRestaurant[0]._restaurant.name);
                // console.log(vm.user.email);
                }, function (error) {
                        vm.error = error;
                    }
                );
            UserService
                .findUserById(vm.otherUser.otherUserId)
                .then(
                    function (response) {
                        vm.otherUser = response.data;
                        console.log(vm.otherUser.username);
                    }, function (error) {
                        vm.error = error;
                    }
                )
        }
        init();
        
        
        
        
    }

})();
