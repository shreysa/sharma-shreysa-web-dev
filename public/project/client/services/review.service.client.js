(function () {
    angular
        .module("EatHeartyApp")
        .factory("ReviewService", ReviewService );

    function ReviewService($http) {


        var api = {
            addReview: addReview,
            findAllReviewsByRestaurantId: findAllReviewsByRestaurantId,
            findAllReviewsByUserId: findAllReviewsByUserId,
            deleteReview: deleteReview,
            updateReview: updateReview,
            getReviewByUserId: getReviewByUserId,
            getAllReviews : getAllReviews,
            deleteReviewByUserId : deleteReviewByUserId

        };

        return api;
        
        function deleteReviewByUserId(userId) {
            return $http.delete("/api/review/remove/usersReview/" + userId);
        }
        
        function getAllReviews() {
            return $http.get("/api/projectuser/review/restaurant");
        }
        
        function getReviewByUserId(userId, restaurantId){
            return $http.get("/api/projectuser/user/" + userId + "/restaurant/review/" + restaurantId);
        }
        
        function addReview(userId, restaurantId, restaurant) {
            return $http.post("/api/projectuser/" + userId + "/review/" + restaurantId, restaurant);
        }
        
        function findAllReviewsByRestaurantId(restaurantId) {
            return $http.get("/api/projectuser/" + restaurantId + "/reviews");
        }

        function findAllReviewsByUserId(userId) {
            return $http.get("/api/projectuser/user/" + userId);
        }
        
        function deleteReview(reviewId) {
            return $http.delete("/api/projectuser/" + reviewId);
        }
        
        function updateReview(reviewId, reviewText) {
            return $http.put("/api/projectuser/review/" + reviewId + "/restaurant/" + reviewText);
        }
    }

})();
