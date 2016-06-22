   (function () {
    angular
        .module("EatHeartyApp")
        .factory("UserService", UserService );
    
    function UserService($http) {


        var api = {

            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            findUsers: findUsers,
            findRestaurant: findRestaurant,
          //  findFriend: findFriend,
            findThisLikedByUserId: findThisLikedByUserId,
            unlikeRestaurant: unlikeRestaurant,
            login: login,
            logout: logout,
            loggedIn : loggedIn,
            register: register,
            likeRestaurant: likeRestaurant,
            findAllLikedByUserId: findAllLikedByUserId,
            findAllLikedByRestaurantId: findAllLikedByRestaurantId
        };

        return api;

            


        
        // function findFriend(friendName) {
        //     var url = "/api/projectuser?name=" + friendName;
        //     return $http.get(url);
        // }

        
        function register(username, password, email) {
            console.log("register in client service");
            var user = {
                username: username,
                password: password,
                email: email
            };
            return $http.post("/api/projectuser/register", user);
           
        }

     

        function logout() {
            return $http.post("/api/projectuser/logout");
        }
        
        function loggedIn() {
            return $http.get("/api/projectuser/loggedIn");
        }

       
        
        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/projectuser/login", user);
        }

      



        function createUser(username, password, email) {

            var user = {
                username: username,
                password: password,
                email: email
            };
          return $http.post("/api/projectuser", user);
        }

      



        function findUserByUsername(username){
            var url = "/api/projectuser?username=" + username;
            return $http.get(url);
        }
        
        function deleteUser(userId) {
            var url = "/api/projectuser/" + userId;
            return $http.delete(url);
        }
         


        function findUserByCredentials(username, password) {
            var url = "/api/projectuser?username=" + username + "&password=" + password ;
            return $http.get(url);
        }

      



        function findUserById(id) {
          var url = "/api/projectuser/" + id;
            return $http.get(url);
        }

        function findUsers() {
            var url = "/api/projectuser/";
            return $http.get(url);
        }
      
        
        function updateUser(id, newUser) {
            var url = "/api/projectuser/" + id;
            return $http.put(url, newUser);
        }

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
    }
})();


