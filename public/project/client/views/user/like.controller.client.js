(function() {
    angular
        .module("EatHeartyApp")
        .controller("LikeController", LikeController);


    function LikeController($location, UserService, $routeParams) {
        var vm = this;
        vm.user = {"userId": $routeParams.userId};
        var otherUserId = $routeParams.otherUserId;
        
        function init() {
            UserService
                .findAllLikedByUserId(otherUserId)
                .then
                    (function (response) {
                    vm.likedRestaurant = response.data;
                        console.log(vm.likedRestaurant);
                        console.log(vm.likedRestaurant[0]);
                    //console.log(vm.user.email);
                }, function (error) {
                        vm.error = error
                    }
                );
        }
        init();
        
        
        
        
    }

})();
