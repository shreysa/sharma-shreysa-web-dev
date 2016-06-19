(function() {
    angular
        .module("EatHeartyApp")
        .controller("RestaurantHomeController", RestaurantHomeController);

    function RestaurantHomeController($location, YelpService, $routeParams, UserService) {
        var vm = this;
        
       // vm.findRestaurantById = findRestaurantById;
        vm.likeRestaurant = likeRestaurant;
        var userId = $routeParams.userId;
        var restaurantId = $routeParams.restaurantId;
        
        function init() {

            console.log(restaurantId);
            YelpService
                .findRestaurantById(restaurantId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
                        console.log(response.data);
                        console.log(vm.restaurant.location.address[0]);
                        console.log(vm.restaurant.categories[0][0]);
                        console.log(vm.restaurant.categories[1][0]);

                    }, function (error) {
                        vm.error = error
                    }
                );
        }
        init();


            function likeRestaurant() {
                UserService
                    .likeRestaurant(userId, vm.restaurant)
                    .then(
                        function (response) {
                            console.log("success added");
                            vm.success = "Thank you for liking" + vm.restaurant.name;
                        },
                        function (error) {
                            vm.error = "Some error ocurred";
                        }
                    );
            }

        
        
    }
})();
