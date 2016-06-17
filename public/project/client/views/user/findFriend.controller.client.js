(function () {
    angular
        .module("EatHeartyApp")
        .controller("FriendSearchController", FriendSearchController);

    function FriendSearchController(UserService, $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;

        vm.findFriend = findFriend;

        
        
        function init() {
            console.log("in init of friend");
            UserService
                .getUsers()
                .then(function (response) {
                    console.log(response.data);
                    vm.users = response.data;
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

