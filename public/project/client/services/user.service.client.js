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
            login: login,
            logout: logout,
            loggedIn : loggedIn,
            register: register,
            findFriend: findFriend,
            makeAdmin : makeAdmin,
            getAdmins : getAdmins,
            deleteAdmin : deleteAdmin
        };

        return api;
        
        function deleteAdmin(userId) {
            return $http.put("/api/projectuser/admin/" + userId + "/delete/user");
        }
        
        
        function makeAdmin(userId) {
            return $http.put("/api/projectuser/admin/user/" + userId);
        }

            function getAdmins() {
                return $http.get("/api/projectuser/admin/users");
            }


        
        function addFollow(userId, otherUserId) {
            var url = "/api/projectuser/" + userId + "/follow/" + otherUserId;
            return $http.post(url);
        }

        
        function register(username, password, email, isAdmin) {
            console.log("register in client service");
            var user = {
                username: username,
                password: password,
                email: email,
                isAdmin : isAdmin
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

      



        function createUser(username, password, email, isAdmin) {

            var user = {
                username: username,
                password: password,
                email: email,
                isAdmin : isAdmin
               
            };
          return $http.post("/api/projectuser", user);
        }

      



        function findUserByUsername(username){
            var url = "/api/projectuser?username=" + username;
            return $http.get(url);
        }


        function findFriend(username){
            var url = "/api/projectuser?name=" + username;
            return $http.get(url);
        }
        
        function deleteUser(userId) {
            var url = "/api/projectuser/user/" + userId;
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

    }
})();


