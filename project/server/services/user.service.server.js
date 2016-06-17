
module.exports = function (app, models) {

    var userModel = models.userModel;

    

    app.put("/api/projectuser/:userId", updateUser);
    app.post("/api/projectuser", createUser);
    app.get("/api/projectuser", getUsers);
    app.get("/api/projectuser/:userId", findUserById);
    app.delete("/api/projectuser/:userId", deleteUser);

   

    function createUser(req, res) {
        var newUser = req.body;
        console.log(req.body);
        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("Username  " + newUser.username + " is already in use");
                    
                }
        
            );
        /*user._id = (new Date()).getTime().toString();
        users.push(user);
        res.send(user);*/

    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then()
        // for (var i in users) {
        //     if (users[i]._id === id) {
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         res.send(newUser);
        //         return;
        //     }
        // }
        // res.send(400);
    }


    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        var name = req.query['name'];
        if (username && password) {
            findUserByCredentials(username, password, res);
        }
        else if (username) {
            findUserByUsername(username, res);
        }
            else if(name){
            findFriend(name, res);
        }
        else {

           findAllUsers(req, res);
        }
    }

    function findFriend(name, res) {
        userModel
            .findFriend(name)
            .then(
                function (users) {
                    res.json(users);
                },function(error) {
                    res.status(400).send(error);
                });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function(user) {
                    res.send(user);
                },function(error) {
                    res.status(400).send(error);
                });

    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }
    
    
}





