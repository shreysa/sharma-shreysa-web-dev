(function () {
    angular
        .module("EatHeartyApp")
        .factory("CategoryService", CategoryService );

    function CategoryService($http) {


        var api = {
            findRestaurantByRating : findRestaurantByRating,
            findRestaurantByCategory: findRestaurantByCategory
        };

        return api;
        
        function findRestaurantByCategory(restaurantId, category) {
            return $http.get("/api/projectuser/category/" + restaurantId + "/restaurant/" + category);
            // return $http.get("/api/projectuser/category/" + restaurantId + "/restaurant",  category);
        }
        
        function findRestaurantByRating(rating) {
            return $http.post("/api/projectuser/rating/for/Restaurant/visited/", rating);
            // return $http.get("/api/projectuser/rating/for/Restaurant/visited", rating);
        }
    }


    })();

