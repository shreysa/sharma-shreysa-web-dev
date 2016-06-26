(function () {
    angular
        .module("EatHeartyApp")
        .controller("FriendSearchController", FriendSearchController);

    function FriendSearchController(UserService, $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;

        vm.findFriend = findFriend;
        vm.checkUser = checkUser;

        
        
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
                        vm.usersBeforeAdmins = [];
                        for (i = 0; i < vm.allUsers.length; i++) {
                            if (vm.allUsers[i]._id != vm.userId) {
                                vm.usersBeforeAdmins.push(vm.allUsers[i]);
                            }
                        }
                        
                        vm.users = [];

                        for (j = 0; j < vm.usersBeforeAdmins.length; j++) {
                            if (!vm.usersBeforeAdmins[j].isAdmin) {
                                vm.users.push(vm.usersBeforeAdmins[j]);
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
                });

               
        }

        function checkUser(userId) {
            if(userId == vm.userId) {
                $location.url("/user/" + vm.userId);
            }else{
                $location.url("/user/" + vm.userId + "/" + userId + "/profile");
            }
        }
    }})();

