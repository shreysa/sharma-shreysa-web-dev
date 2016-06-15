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
            findUserByUsername: findUserByUsername

        };

        return api;


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

        function updateUser(id, newUser) {
            var url = "/api/projectuser/" + id;
            return $http.put(url, newUser);
        }
    }
})();


