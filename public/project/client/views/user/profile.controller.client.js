(function(){
    angular
        .module("EatHeartyApp")
        .controller("ProfileController", ProfileController);



    function ProfileController($routeParams, UserService, $location, $window, LikeService, ReviewService, FollowService){
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.navigateToProfile = navigateToProfile;
       vm.logout = logout;
        var index = -1;
        //vm.user = null;
       // vm.loadData = loadData;
        var id = $routeParams["userId"];







        function init() {
            if (!id && $window.sessionStorage.getItem("currentUser") != '0') {
                UserService
                    .findUserById($window.sessionStorage.getItem("currentUser"))
                    .then(
                        function (response) {
                            vm.user = response.data;
                            console.log(vm.user);
                            console.log("when logged in google");
                            console.log(vm.user._id);
                            if (vm.user.isAdmin) {
                                $location.url("/user/admin/" + vm.user._id); //$window.sessionStorage.getItem("currentUser"));
                            }
                           // loadData(vm.user._id);
                        }, function (error) {
                            vm.error = "error ocurred while logging in";
                        })
            } else {
                UserService
                    .findUserById(id)
                    .then(function (response) {
                        console.log(response.data);
                        vm.user = response.data;
                        console.log(vm.user);
                        console.log("when logged in normal");
                        console.log(vm.user._id);
                        if (vm.user.isAdmin) {
                            $location.url("/user/admin/" + vm.user._id); //$window.sessionStorage.getItem("currentUser"));
                        }
                     //   loadData(vm.user._id);
                    }, function (error) {
                        vm.error = "some error ocurred";
                    })
            }



        
                
        }




        init();

        // function loadData(userId) {
        //     LikeService
        //         .findAllLikedByUserId(userId)
        //         .then(
        //             function (response) {
        //                 if(response.data != null){
        //                     vm.hasLiked = true;
        //                     vm.likes = response.data;
        //                 }else{
        //                     vm.hasLiked = false;
        //                 }
        //             }, function error() {
        //                 vm.error = "some error ocurred while fetching like data";
        //             }
        //     ReviewService
        //         .findAllReviewsByUserId(userId)
        //         .then(
        //             function (response) {
        //                 if(response.data != null){
        //                     vm.hasReviewed = true;
        //                     vm.reviews = response.data;
        //                 }else{
        //                     vm.hasReviewed = false;
        //                 }
        //             }, function error() {
        //                 vm.error = "some error ocurred while fetching review data";
        //             })
        //     FollowService
        //         .findAllFollowingUserId(userId)
        //         .then(
        //             function (response) {
        //                 if(response.data != null){
        //                     vm.hasFollowers = true;
        //                     vm.followers = response.data;
        //                 }else{
        //                     vm.hasFollowers = false;
        //                 }
        //             }, function error() {
        //                 vm.error = "some error ocurred while fetching review data";
        //             })
        //     FollowService
        //         .findAllFollowedByUserId(userId)
        //         .then(
        //             function (response) {
        //                 if(response.data != null){
        //                     vm.isFollowing = true;
        //                     vm.following = response.data;
        //                 }else{
        //                     vm.isFollowing = false;
        //                 }
        //             }, function error() {
        //                 vm.error = "some error ocurred while fetching review data";
        //             })
        // );
        // }

        function navigateToProfile() {
            $location.url("/user/" + vm.user._id);
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                )
        }

        function unregister() {
            UserService
                .deleteUser(vm.user._id)
                .then(function () {
                        $location.url("/login");
                    },
                    function () {
                        vm.error = "Not able to delete";
                    });
        }





        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(function (response){
                        vm.success= "user was updated successfully";

                    },
                    function (error) {
                        vm.error = "User not updated";
                    });
        }
    }



})();
