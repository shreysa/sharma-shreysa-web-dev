(function () {
    angular
        .module("EatHeartyApp")
        .controller("FriendSearchController", FriendSearchController);

    function FriendSearchController(UserService, $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;

        vm.findFriend = findFriend;

        
        
        function init() {

            UserService
                .findUserById(vm.userId)
                .then(function (response) {
                    vm.user = response.data;
                    //console.log(vm.user.email);
                });

            UserService
                .findUsers()
                .then(function (response) {
                    if (response.data.length > 0) {
                        vm.allUsers = response.data;

                        for (i = 0; i < vm.allUsers.length; i++) {
                            if (vm.allUsers[i]._id == vm.userId) {
                                vm.allUsers.splice(i, 1);
                            }
                        }
                        vm.users = [];

                        for (j = 0; j < vm.allUsers.length; j++) {
                            if (!vm.allUsers[j].isAdmin) {
                                vm.users.push(vm.allUsers[j]);
                            }
                        }
                        if (vm.users.length > 0) {
                            vm.hasUsers = true;
                        } else {
                            vm.hasUsers = false;
                        }
                    }
                    else {
                        vm.hasUsers = false;
                    }


                });
        }


        init();     
       

        

        function findFriend(findFriend) {
            UserService
                .findFriend(findFriend)
                .then(function (response) {
                    vm.friends = response.data;
                    console.log(response.data);
                    console.log(vm.friends.username + "yahi hai");
                });

               
        }
    }})();

