(function () {
    angular
        .module("EatHeartyApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, ReviewService, $location, $routeParams, LikeService, FollowService) {
        var vm = this;
        vm.user = {"userId": $routeParams.userId};
        vm.deleteUser = deleteUser;
        vm.deleteReview = deleteReview;
        vm.makeAdmin = makeAdmin;
        vm.deleteAdmin = deleteAdmin;
        vm.logout = logout;

        function init(){
            UserService
                .findUserById(vm.user.userId)
                .then(
                    function (response) {
                        vm.user = response.data;
                        if(!vm.user.isAdmin){
                            alert("incorrect access");
                    }else{

            UserService
                .findUsers()
                .then(
                    function (response) {
                        if (response.data != null){
                            vm.allUsers = response.data;

                            vm.users = [];

                            for (i = 0; i < vm.allUsers.length; i++) {
                                if (!vm.allUsers[i].isAdmin) {
                                    vm.users.push(vm.allUsers[i]);
                                }
                            }
                            if (vm.users.length > 0) {
                                vm.hasUsers = true;
                            } else {
                                vm.hasUsers = false;
                            }
                        } else {
                            vm.hasUsers = false;
                        }

                        ReviewService
                            .getAllReviews()
                            .then(
                                function (response) {
                                    if (response.data != null) {
                                        vm.reviews = response.data;
                                        console.log(vm.reviews);
                                        console.log(vm.reviews[0]._user.username);
                                        vm.hasReviews = true;
                                    } else {
                                        vm.hasReviews = false;
                                    }
                                },
                                function (error) {
                                    vm.error = "some error ocurred";
                                })


                        UserService
                            .getAdmins()
                            .then(
                                function (response) {
                                    if (response.data != null) {
                                        vm.admins = response.data;
                                        for (i = 0; i <= vm.admins.length; i++) {
                                            if (vm.admins[i]._id == vm.user.userId) {
                                                vm.admins.splice(i, 1);
                                            }

                                        }
                                        if (vm.admins.length > 1) {
                                            vm.hasAdmin = true;
                                        }
                                        else {
                                            vm.hasAdmin = false;
                                        }
                                    } else {
                                        vm.hasAdmin = false;
                                    }
                                },
                                function (error) {
                                    vm.error = "some error ocurred while fetching the admins";
                                })
                    }, function (error) {
                        vm.error = "error ocurred while fetching users";
                    }



        );} }

                        );
        }init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $window.sessionStorage.clear();
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                )
        }
        
        
        function deleteUser(userId) {

                        
                        LikeService
                            .deleteLikeByUserId(userId)
                            .then(
                                function (response) {
                                    console.log("Like removed");


                        ReviewService
                            .deleteReviewByUserId(userId)
                            .then(
                                function (response) {
                                    console.log("Review removed");
                                },
                                function (error) {
                                    console.log("error ocurred in removing review");
                                }
                            );
                        FollowService
                            .deleteFollowing(userId)
                            .then(
                                function (response) {
                                    console.log("Unfollowed");
                                },
                                function (error) {
                                    console.log("error ocurred in removing follow");
                                }
                            );
                        FollowService
                            .deleteFollowedBy(userId)
                            .then(
                                function (response) {
                                    console.log("Unfollowed");
                                },
                                function (error) {
                                    console.log("error ocurred in removing follow");
                                }
                            );
                                    UserService
                                        .deleteUser(userId)
                                        .then(
                                            function (response) {
                                                vm.success = "User was successfully deleted";
                                            });
                        UserService
                            .findUsers()
                            .then(
                                function (response) {
                                    if (response.data != null) {
                                        vm.allUsers = response.data;

                                        vm.users = [];

                                        for (i = 0; i < vm.allUsers.length; i++) {
                                            if (!vm.allUsers[i].isAdmin) {
                                                vm.users.push(vm.allUsers[i]);
                                            }
                                        }
                                        if (vm.users.length > 0) {
                                            vm.hasUsers = true;
                                        } else {
                                            vm.hasUsers = false;
                                        }
                                    } else {
                                        vm.hasUsers = false;
                                    }
                                },
                                function (error) {
                                    vm.error = "user could not be deleted";
                                }
                            );
                    }, function (error) {
                        vm.error = "Some error ocurred while deleting the user";
                    });
        }
        
        function deleteReview(reviewId) {
            ReviewService
                .deleteReview(reviewId)
                .then(
                    function (response) {
                        vm.success = "Review was successfully deleted";
                        ReviewService
                            .getAllReviews()
                            .then(
                                function (response) {
                                    if (response.data != null) {
                                        vm.reviews = response.data;
                                        console.log(vm.reviews);
                                        console.log(vm.reviews[0]._user.username);
                                        vm.hasReviews = true;
                                    } else {
                                        vm.hasReviews = false;
                                    }
                                },
                                function (error) {
                                    vm.error = "some error ocurred";
                                });
                    },
                    function (error) {
                        vm.error = "review could not be deleted";
                    }
                );
        }

        function makeAdmin(userId) {
            UserService
                .makeAdmin(userId)
                .then(
                    function (response) {
                        vm.success = "User was successfully made an admin";
                        UserService
                            .findUsers()
                            .then(
                                function (response) {
                                    if (response.data != null) {
                                        vm.allUsers = response.data;

                                        vm.users = [];

                                        for (i = 0; i < vm.allUsers.length; i++) {
                                            if (!vm.allUsers[i].isAdmin) {
                                                vm.users.push(vm.allUsers[i]);
                                            }
                                        }
                                        if (vm.users.length > 0) {
                                            vm.hasUsers = true;
                                        } else {
                                            vm.hasUsers = false;
                                        }
                                    } else {
                                        vm.hasUsers = false;
                                    }
                                }, function (error) {
                                    vm.error = "error ocurred in fetching users after admin was made";
                                }
                                    );
                        UserService
                            .getAdmins()
                            .then(
                                function (response) {
                                    if(response.data != null){
                                        vm.admins = response.data;
                                        for(i = 0; i <= vm.admins.length; i++){
                                            if(vm.admins[i]._id == vm.user.userId){
                                                vm.admins.splice(i, 1);
                                            }
                                          
                                    }
                                        if(vm.admins.length > 0){
                                        vm.hasAdmin = true;
                                        }
                                        else{
                                        vm.hasAdmin = false;
                                        }
                                    }else{
                                        vm.hasAdmin = false;
                                    }
                                    },
                            function (error) {
                                vm.error = "some error ocurred while fetching the admins";
                            });
                                    
                    },
                    function (error) {
                        vm.error = "user could not be made admin";
                    }
                );
        }


        function deleteAdmin(userId) {
            UserService
                .deleteAdmin(userId)
                .then(
                    function (response) {
                        vm.success = "Admin right was successfully revoked";
                        UserService
                            .findUsers()
                            .then(
                                function (response) {
                                    if (response.data != null) {
                                        vm.allUsers = response.data;

                                        vm.users = [];

                                        for (i = 0; i < vm.allUsers.length; i++) {
                                            if (!vm.allUsers[i].isAdmin) {
                                                vm.users.push(vm.allUsers[i]);
                                            }
                                        }
                                        if (vm.users.length > 0) {
                                            vm.hasUsers = true;
                                        } else {
                                            vm.hasUsers = false;
                                        }
                                    } else {
                                        vm.hasUsers = false;
                                    }
                                },
                                function (error) {
                                    vm.error = "Error ocurred while fetching users";
                                }
                            );
                        UserService
                            .getAdmins()
                            .then(
                                function (response) {
                                    if (response.data != null) {
                                        vm.admins = response.data;
                                        for (i = 0; i <= vm.admins.length; i++) {
                                            if (vm.admins[i]._id == vm.user.userId) {
                                                vm.admins.splice(i, 1);
                                            }

                                        }
                                        if (vm.admins.length > 1) {
                                            vm.hasAdmin = true;
                                        }
                                        else {
                                            vm.hasAdmin = false;
                                        }
                                    } else {
                                        vm.hasAdmin = false;
                                    }
                                },
                                function (error) {
                                    vm.error = "some error ocurred while fetching the admins";
                                });
                    }, function (error) {
                        vm.error = "Some error ocurred while revoking admin right";
                    });
        }

    }

})();
       
