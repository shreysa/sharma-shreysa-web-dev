(function () {
    angular
        .module("EatHeartyApp")
        .factory("LikeService", LikeService );

    function LikeService($http) {


        var api = {
            findRestaurant: findRestaurant,
            findThisLikedByUserId: findThisLikedByUserId,
            unlikeRestaurant: unlikeRestaurant,
            likeRestaurant: likeRestaurant,
            findAllLikedByUserId: findAllLikedByUserId,
            findAllLikedByRestaurantId: findAllLikedByRestaurantId
        };

        return api;



        function likeRestaurant(userId, restaurant) {
            // var restaurantObj = {
            //     restaurantId: restaurant.id
            // };
            return $http.post("/api/projectuser/" + userId  + "/like", restaurant);

        }

        function findRestaurantByName(restaurantId) {
            return $http.get("/api/projectuser/" + restaurantId);
        }

        function findAllLikedByUserId(userId) {
            return $http.get("/api/projectuser/fetchLikedRestaurant/" + userId);
        }

        function findAllLikedByRestaurantId(restaurantId) {
            return $http.get("/api/projectuser/restaurant/" + restaurantId);
        }

        function findRestaurant(restaurantId) {
            return $http.get("/api/projectuser/restaurant/" +restaurantId + "/restaurantYelpId");
        }

        function findThisLikedByUserId(userId, restaurantId) {
            return $http.get("/api/projectuser/checkLike/" + userId + "/restaurant/" + restaurantId);
        }

        function unlikeRestaurant(userId, restaurantId) {
            return $http.delete("/api/projectuser/" + userId + "/removeLike/" + restaurantId);
        }

    }})();
