(function () {
    angular
        .module("EatHeartyApp")
        .controller("HomeController", HomeController);

    function HomeController(YelpService, $location, $routeParams) {
        var vm = this;
       // vm.userId = $routeParams.userId;

        vm.findRestaurant = findRestaurant;

        function findRestaurant(searchFood,searchLocation) {
            console.log(searchLocation);
            YelpService
                .findRestaurant(searchFood, searchLocation)
                .then(function (response) {
                    if(response.data != null) {
                        vm.business = response.data;
                        vm.hasBusiness = true;
                        vm.id = [];
                    
                    }else{
                        vm.hasBusiness = false;
                    }

                });
        }

        function findRestaurantById() {
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
    }})();

