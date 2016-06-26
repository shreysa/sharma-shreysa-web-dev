(function () {
    angular
        .module("EatHeartyApp")
        .controller("UserHomeController", UserHomeController);

    function UserHomeController(YelpService, $location, $routeParams, $window) {
        var vm = this;

        vm.userId = $routeParams.userId;
// vm.userId = $routeParams.userId;

        function init() {
            var food = $window.sessionStorage.getItem("Food");
            var location = $window.sessionStorage.getItem("Location");
            if(food){
                findRestaurant(food, location);
            }
        }
            init();

        vm.findRestaurant = findRestaurant;
        vm.findRestaurantById = findRestaurantById;

        function findRestaurant(searchFood, searchLocation) {
            console.log(searchLocation);
            YelpService
                .findRestaurant(searchFood, searchLocation)
                .then(function (response) {
                    if(response.data != null) {
                        console.log("*********************** in client");
                        console.log(response.data);
                        vm.business = response.data;
                        $window.sessionStorage.setItem("Food", searchFood);
                        $window.sessionStorage.setItem("Location", searchLocation);
                        vm.hasBusiness = true;
                    }else{
                        vm.hasBusiness = false;
                    }

                }, function (error) {
                    vm.error = "Incorrect values for search";
                });
        }


        function findRestaurantById(id) {
            console.log(id);
            console.log("client rest by id");
            YelpService
                .findRestaurantById(id)
                .then(
                    function (response) {
                        console.log("got rest by id");
                        vm.restaurant = response.data;
                        console.log(response.data);
                        $location.url("/user/" + vm.userId + "/restaurant/" + id);
                    }, function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }

    }
})();

