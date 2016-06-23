(function () {
    angular
        .module("EatHeartyApp")
        .factory("FollowService", FollowService );

    function FollowService($http) {


        var api = {

            addFollow: addFollow,
            findAllFollowedByUserId: findAllFollowedByUserId,
            unfollowUser: unfollowUser,
            findAllFollowingUserId: findAllFollowingUserId
        };

        return api;


        function addFollow(userId, otherUserId) {
            var url = "/api/projectuser/" + userId + "/addfollow/" + otherUserId;
            return $http.post(url);
        }


        function findAllFollowedByUserId(userId, otherUserId) {
            var url = "/api/projectuser/"+ userId + "/following";
            return $http.get(url);
        }
        
        function unfollowUser(userId, otherUserId) {
            return $http.delete("/api/projectuser/" + userId + "/unfollow/" +otherUserId);
        }
        
        function findAllFollowingUserId(userId) {
            return $http.get("/api/projectuser/following/" + userId);
        }
        


    }})();
