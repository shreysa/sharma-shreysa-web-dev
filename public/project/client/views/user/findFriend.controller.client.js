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
                    vm.users = response.data;
                    console.log(vm.users);
                });

        }
        init();     
       

        

        function findFriend(findFriend) {
            UserService
                .findFriend(findFriend)
                .then(function (response) {
                    vm.friends = response.data;
                    console.log(response.data);
                    console.log(vm.friends.firstName);
                });

               
        }
    }})();

