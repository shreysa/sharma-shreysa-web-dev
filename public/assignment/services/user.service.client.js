(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService );
    
    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;
        var newid = 0;
        var cnewuser = null;

        function createUser(newUser) {
            for (var i in users) {
                if (users[i].username === newUser.username) {
                    return false;
                }
            }
            var maxid = users[i]._id.max;
            cnewuser._id = maxid++;
            cnewuser.username = newUser.username;
            cnewuser.password = newUser.password;
            cnewuser.firstName = newUser.firstName;
            cnewuser.lastName = newUser.lastName;
            return true;
        }

        

        function deleteUser(id) {
            //    users.add()

        }

        function findUserByUsernameAndPassword(username, password) {
            for (var i in users)
            {
                if (users[i].username === username && users[i].password === password) {
                   return users[i];
                }
            }
            return null;
        }

        function findUserById(id) {
            for (var i in users) {
                if(users[i]._id === id) {
                    return users[i];
                }
                else{
                    return null;
                }
            }
        }

        function updateUser(id, newUser) {
            for (var i in user)
            {
                if(user[i].id === id){
                    user[i].firstName = newUser.firstName;
                    user[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }
    }
})();


