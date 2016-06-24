(function () {
    angular
        .module("EatHeartyApp")
        .factory("FollowService", FollowService );

    function FollowService($http) {


        var api = {

            addFollow: addFollow,
            findAllFollowedByUserId: findAllFollowedByUserId,
            unfollowUser: unfollowUser,
            findAllFollowingUserId: findAllFollowingUserId,
            findFollow: findFollow
        };

        return api;
        
        function findFollow(userId, otherUserId) {
            return $http.get("/api/projectuser/follow/" + userId + "/check/" + otherUserId);
        }


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
