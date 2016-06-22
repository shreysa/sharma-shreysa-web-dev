(function() {
    angular
        .module("EatHeartyApp")
        .controller("RestaurantHomeController", RestaurantHomeController);

    function RestaurantHomeController($location, YelpService, $routeParams, UserService) {
        var vm = this;

        // vm.findRestaurantById = findRestaurantById;
        vm.likeRestaurant = likeRestaurant;
        vm.unlikeRestaurant = unlikeRestaurant;

        vm.userId = $routeParams.userId;
        var username = "";
        var restaurantId = $routeParams.restaurantId;
        var usernamesOfWhoLiked = [];
        var restId = "";

        function init() {
            YelpService
                .findRestaurantById(restaurantId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
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
                .findRestaurant(restaurantId)
                .then(
                    function (response) {
                        if (response.data != null) {
                            vm.restId = response.data._id;
                            console.log(vm.restId + "  this is the restId");
                            console.log(response.data);

                            UserService
                                .findAllLikedByRestaurantId(vm.restId)
                                .then(
                                    function (response) {
                                        console.log("*******who liked is next");
                                        vm.usersWhoLiked = response.data;
                                        console.log(response.data);
                                    }, function (error) {
                                        vm.error = error
                                    });
                            UserService
                                .findThisLikedByUserId(vm.userId, vm.restId)
                                .then(
                                    function (response) {
                                        if (response.data) {
                                            console.log("------this is if the user liked it loop");
                                            console.log(response.data);
                                            vm.thisUserLikes = true;
                                        }
                                        else {
                                            vm.thisUserLikes = false;
                                        }
                                    }, function (error) {
                                        vm.error = error
                                    });
                        }
                    }
                );


            

        }
        init();


        function likeRestaurant() {
            var restaurant = {
                restaurantId: vm.restaurant.id,
                name: vm.restaurant.name,
                image: vm.restaurant.image_url,
                location: vm.restaurant.location.address[0],
                city: vm.restaurant.location.city,
                phone: vm.restaurant.display_phone,
                rating: vm.restaurant.rating
            };
            UserService
                .likeRestaurant(vm.userId, restaurant)
                .then(
                    function (response) {
                        console.log("success added");
                        vm.success = "Thank you for liking" + vm.restaurant.name;
                        console.log(response.data);
                        UserService
                            .findAllLikedByRestaurantId(vm.restId)
                            .then(
                                function (response) {
                                    vm.usersWhoLiked = response.data;
                                    console.log(response.data);
                                    console.log(vm.usersWhoLiked[0]._user.username);
                                }, function (error) {
                                    vm.error = error
                                });
                    },

                    function (error) {
                        vm.error = "Some error ocurred";
                    });

            vm.thisUserLikes = true;
        }


        function unlikeRestaurant() {
            UserService
                .unlikeRestaurant(vm.userId, vm.restId)
                .then(
                    function (response) {
                        console.log("successfully removed");
                        console.log(response.data);
                        UserService
                            .findAllLikedByRestaurantId(vm.restId)
                            .then(
                                function (response) {
                                    vm.usersWhoLiked = response.data;
                                    console.log(response.data);
                                    console.log(vm.usersWhoLiked[0]._user.username);
                                }, function (error) {
                                    vm.error = error
                                });
                    },

                    function (error) {
                        vm.error = "Some error ocurred";
                    });
            vm.thisUserLikes = false;

        }




    }
})();
