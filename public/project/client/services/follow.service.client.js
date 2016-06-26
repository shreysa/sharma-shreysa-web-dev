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
            findFollow: findFollow,
            deleteFollowedBy: deleteFollowedBy,
            deleteFollowing : deleteFollowing

    };

        return api;

        function deleteFollowedBy(userId) {
           return $http.delete("/api/unfollowedBy/user/" + userId, deleteFollowedBy);
        }

        function deleteFollowing(userId) {
            return $http.delete("/api/unfollowing/" + userId + "/deleteUser", deleteFollowing);
        }
        
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
