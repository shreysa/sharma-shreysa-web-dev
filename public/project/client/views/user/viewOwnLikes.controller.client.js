(function(){
    angular
        .module("EatHeartyApp")
        .controller("OwnLikeController", OwnLikeController);



    function OwnLikeController($routeParams, LikeService) {
        var vm = this;
        vm.user = {"userId": $routeParams["userId"]};
        
        
        function init() {
            LikeService
                .findAllLikedByUserId(vm.user.userId)
                .then(
                    function (response) {
                        if(response.data.length>0){
                            vm.hasLiked = true;
                            vm.likes = response.data;
                        }else{
                            vm.hasLiked = false;
                        }
                    }, function error() {
                        vm.error = "some error ocurred while fetching like data";
                    });
        } init();

    }})();
        
        




