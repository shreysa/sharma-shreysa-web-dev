(function () {
    angular
        .module("EatHeartyApp")
        .controller("UserHomeController", UserHomeController);

    function UserHomeController(YelpService, $location, $routeParams, $rootScope) {
        var vm = this;

        vm.userId = $routeParams.userId;
// vm.userId = $routeParams.userId;

        function init() {
            if (!$rootScope.currentUser) {
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
                    console.log("*********************** in client");
                    console.log(response.data);
                    vm.business = response.data;
                  //  vm.id = [];
                    // for (i = 0; i < vm.business.businesses.length; i++) {
                    //     //   //  console.log(vm.business.businesses[0].id);
                    //     //
                    //     vm.id.push(vm.business.businesses[i]);
                    // }

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

