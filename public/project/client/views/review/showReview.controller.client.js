(function() {
    angular
        .module("EatHeartyApp")
        .controller("ShowReviewController", ShowReviewController);

    function ShowReviewController($location, $routeParams, UserService, LikeService,ReviewService) {
        var vm = this;
        vm.checkUser = checkUser;
        vm.userId = $routeParams.userId;
      
        vm.thisUserLikes = false;
        vm.restaurantId = $routeParams.restaurantId;
        
        function init() {
            console.log("hi");
            LikeService
                .findRestaurant(vm.restaurantId)
                .then(
                    function (response) {
                        if (response.data != null) {
                            vm.restaurant = response.data;


                            ReviewService
                                .findAllReviewsByRestaurantId(vm.restaurant._id)
                                .then(
                                    function (response) {
                                        if (response.data.length > 0) {
                                            vm.reviews = response.data;
                                            console.log("this is the review data");
                                            console.log(vm.reviews);
                                            vm.hasBeenReviewed = true;
                                        } else {
                                            vm.hasBeenReviewed = false;
                                        }
                                    }, function (error) {
                                        vm.error = error;
                                    }
                                );
                        }
                    });
        }

        function checkUser(userId) {
            if(userId == vm.userId){
                //return true;
                $location.url("/user/" + vm.userId);
            }else{
                $location.url("/user/" + vm.userId + "/" + userId + "/profile");
            }
        }

    }})();

