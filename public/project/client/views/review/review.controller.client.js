(function() {
    angular
        .module("EatHeartyApp")
        .controller("ReviewController", ReviewController);


    function ReviewController($location, UserService, $routeParams, ReviewService) {
    
        var vm = this;
        vm.user = {"userId" : $routeParams.userId};
        vm.restaurant = {"restaurantId" : $routeParams.restaurantId};
        vm.addReview  = addReview;


        function init() {
            ReviewService
                .findAllReviewsByRestaurantId(vm.restaurant.restaurantId)
                .then(
                    function (response) {
                        vm.reviewsForRestaurant = response.data;
                        console.log("here are the reviews");
                        console.log(vm.reviewsForRestaurant);
                    },
                    function (error) {
                        vm.error = "some error ocurred";
                    }
                );
            ReviewService
                .findAllReviewsByUserId(vm.user.userId)
                .then(
                    function (response) {
                        vm.reviewsByUser = response.data;
                        console.log("here are the reviews");
                        console.log(vm.reviewsByUser);
                    },
                    function (error) {
                        vm.error = "some error ocurred";
                    }
                );

        }
        init();


      
    }
        
    })();
