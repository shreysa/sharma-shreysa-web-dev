(function() {
    angular
        .module("EatHeartyApp")
        .controller("ReviewController", ReviewController);


    function ReviewController($location, UserService, $routeParams, ReviewService) {
    
        var vm = this;
        vm.user = {"userId" : $routeParams.userId};
     //   vm.restaurant = {"restaurantId" : $routeParams.restaurantId};
        vm.otherUser = {"userId" : $routeParams.otherUserId};



        function init() {
            ReviewService
                .findAllReviewsByUserId(vm.otherUser.userId)
                .then(
                    function (response) {
                        if(response.data !=null) {
                            vm.reviewsByUser = response.data;
                            console.log("here are the reviews");
                            console.log(vm.reviewsByUser);
                            console.log(vm.reviewsByUser[0]._restaurant.name);
                            vm.reviewsPresent = true;
                        }else{
                            vm.reviewsPresent = false;
                        }
                        
                    },
                    function (error) {
                        vm.error = "some error ocurred";
                    }
                );

        }
        init();


      
    }
        
    })();
