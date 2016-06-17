(function () {
    angular
        .module("EatHeartyApp")
        .controller("HomeController", HomeController);

    function HomeController(YelpService, $location, $routeParams) {
        var vm = this;
       // vm.userId = $routeParams.userId;

        vm.findRestaurant = findRestaurant;

        var searchText = "dominoes";
        var location = "Bolyston street";

        function findRestaurant(searchFood,searchLocation) {
            console.log(searchLocation);
            YelpService
                .findRestaurant(searchFood, searchLocation)
                .then(function (response) {
                    console.log("*********************** in client");
                    console.log(response.data);
                    vm.business = response.data;

                });
        }
    }})();

