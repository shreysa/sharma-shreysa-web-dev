(function () {
    angular
        .module("WebAppMaker")
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


        function createUser(username, password) {

            var user = {
                //_id: (new Date()).getTime().toString(),
                username: username,
                password: password
            };
          return $http.post("/api/user", user);
        }

        function findUserByUsername(username){
            for (var i in users){
                if(users[i].username === username){
                    return true;
                }
            }
            return false;
        }





        function deleteUser(userId) {
          for(var i in users){
              if(users[i]._id === userId){
                 users.splice(i, 1);
                  return true;
              }
          }
            return false;

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
            for (var i in users)
            {
                if(users[i]._id === id){
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }
    }
})();


