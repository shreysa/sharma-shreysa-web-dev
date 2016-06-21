(function() {
    angular
        .module("EatHeartyApp")
        .controller("RestaurantHomeController", RestaurantHomeController);

    function RestaurantHomeController($location, YelpService, $routeParams, UserService) {
        var vm = this;
        
       // vm.findRestaurantById = findRestaurantById;
        vm.likeRestaurant = likeRestaurant;

      vm.userId = $routeParams.userId;
        var username = "";
        var restaurantId = $routeParams.restaurantId;
        var usernamesOfWhoLiked = [];
        
        function init() {


            YelpService
                .findRestaurantById(restaurantId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
                        // console.log(response.data);
                        // console.log(vm.restaurant.location.address[0]);
                        // console.log(vm.restaurant.categories[0][0]);
                        // console.log(vm.restaurant.categories[1][0]);
                    }, function (error) {
                        vm.error = error
                    }
                );
            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        vm.thisUser = response.data;
                        username = vm.thisUser.username;
                    }, function (error) {
                        vm.error = error;
                    }
                );
            UserService
                .findAllLikedByRestaurantId(restaurantId)
                .then(
                    function (response) {
                        vm.usersWhoLiked = response.data;
                        console.log(response.data);
                    }, function (error) {
                        vm.error = error
                    });
            

        }
        init();


            function likeRestaurant() {
                var restaurant = {
                    restaurantId : vm.restaurant.id,
                    name: vm.restaurant.name,
                    image: vm.restaurant.image_url,
                    location: vm.restaurant.location.address[0],
                    city: vm.restaurant.location.city,
                    phone: vm.restaurant.display_phone,
                    rating: vm.restaurant.rating,
                    like: [vm.userId]
                };
                UserService
                    .likeRestaurant(vm.userId, username, restaurant)
                    .then(
                        function (response) {
                            console.log("success added");
                            vm.success = "Thank you for liking" + vm.restaurant.name;
                        },
                        function (error) {
                            vm.error = "Some error ocurred";
                        }
                    );
                UserService
                    .findAllLikedByRestaurantId(restaurantId)
                    .then(
                        function (response) {
                            vm.usersWhoLiked = response.data;
                            console.log(response.data);
                        }, function (error) {
                            vm.error = error
                        });

            }

        
        
    }
})();
