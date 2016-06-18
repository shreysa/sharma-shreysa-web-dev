(function() {
    angular
        .module("EatHeartyApp")
        .controller("RestaurantHomeController", RestaurantHomeController);

    function RestaurantHomeController($location, YelpService, $routeParams) {
        var vm = this;
        
        vm.findRestaurantById = findRestaurantById;

        var id = $routeParams.restaurantId;
        
        function init() {

            console.log(id);
            YelpService
                .findRestaurantById(id)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
                    }, function (error) {
                        vm.error = error
                    }
                );
        }
        init();
        


            function findRestaurantById(id) {
                console.log(id);
                console.log("client rest by id");
                YelpService
                    .findRestaurantById(id)
                    .then(
                        function (response) {
                            vm.restaurant = response.data;
                        }, function (err) {
                            vm.error(err);
                        }
                    );
            }
        
        
    }
})();
