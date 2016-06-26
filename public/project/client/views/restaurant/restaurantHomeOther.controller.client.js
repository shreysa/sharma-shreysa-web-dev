(function() {
    angular
        .module("EatHeartyApp")
        .controller("RestaurantHomeOtherController", RestaurantHomeOtherController);

    function RestaurantHomeOtherController($location, YelpService, $routeParams) {
        var vm = this;
        vm.yelpRestId = $routeParams.restaurantId;
        vm.clicked = clicked;


        function init() {
            YelpService
                .findRestaurantById(vm.yelpRestId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
                    }, function (error) {
                        vm.error = "Could not fetch restaurant details from API";
                    });
        }

        init();

        function clicked() {
            alert("Oops!! You are not logged in, To view more information about this restaurant Please Log in or Register");
            $location.url("/login");
        }
    }
})();
    
