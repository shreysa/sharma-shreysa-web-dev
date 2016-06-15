(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService );
    
    function UserService($http) {


        var api = {

            findUserByCredentials: findUserByCredentials,
            login: login,
            logout: logout,
            loggedIn : loggedIn,
            findUserById: findUserById,
            register: register,
            updateUser: updateUser,
            deleteUser: deleteUser,
            createUser: createUser,
            findUserByUsername: findUserByUsername

        };

        return api;


        function createUser(username, password) {

            var user = {
                username: username,
                password: password
            };
          return $http.post("/api/user", user);
        }
        
        function register(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/register", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function findUserByUsername(username){
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function loggedIn() {
            return $http.get("/api/loggedIn");
        }





        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }


        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }


        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password ;
            return $http.get(url);
        }

        function findUserById(id) {
          var url = "/api/user/" + id;
            return $http.get(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }
    }
})();


