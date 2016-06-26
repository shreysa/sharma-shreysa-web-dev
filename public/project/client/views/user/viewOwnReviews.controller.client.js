(function(){
    angular
        .module("EatHeartyApp")
        .controller("OwnReviewController", OwnReviewController);



    function OwnReviewController($routeParams, ReviewService) {
        var vm = this;
        vm.user = {"userId": $routeParams.userId};


        function init() {
            ReviewService
                .findAllReviewsByUserId(vm.user.userId)
                .then(
                    function (response) {
                        if(response.data.length>0){
                            vm.hasReviewed = true;
                            vm.reviews = response.data;
                        }else{
                            vm.hasReviewed = false;
                        }
                    }, function error() {
                        vm.error = "some error ocurred while fetching review data";
                    });
        } init();

    }})();







