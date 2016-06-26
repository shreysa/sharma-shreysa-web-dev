(function () {
    angular
        .module("EatHeartyApp")
        .factory("CategoryService", CategoryService );

    function CategoryService($http) {


        var api = {
            findRestaurantByRating : findRestaurantByRating,
            findRestaurantByCity : findRestaurantByCity
       //     findRestaurantByCategory: findRestaurantByCategory
        };

        return api;
        
        // function findRestaurantByCategory(restaurantId, category) {
        //     return $http.put("/api/projectuser/category/" + restaurantId + "/restaurant/", category);
        //    
        // }
        
        function findRestaurantByRating(rating) {
            return $http.post("/api/projectuser/rating/for/Restaurant/visited/", rating);
            // return $http.get("/api/projectuser/rating/for/Restaurant/visited", rating);
        }
        
        function findRestaurantByCity(city) {
            return $http.get("/api/restaurant/city/" + city);
        }
    }


    })();

