(function () {
    angular
        .module("EatHeartyApp")
        .factory("ReviewService", ReviewService );

    function ReviewService($http) {


        var api = {
            addReview: addReview,
            findAllReviewsByRestaurantId: findAllReviewsByRestaurantId,
            findAllReviewsByUserId: findAllReviewsByUserId

        };

        return api;
        
        function addReview(userId, restaurantId, restaurant) {
            return $http.post("/api/projectuser/" + userId + "/review/" + restaurantId, restaurant);
        }
        
        function findAllReviewsByRestaurantId(restaurantId) {
            return $http.get("/api/projectuser/" + restaurantId + "/reviews");
        }

        function findAllReviewsByUserId(userId) {
            return $http.get("/api/projectuser/user/" + userId);
        }
    }

})();
