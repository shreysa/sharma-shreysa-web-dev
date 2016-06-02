(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService)

   


    function WebsiteService($http) {
        var api = {
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            createWebsite: createWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }

        function findWebsiteById(websiteId) {
          var url = "/api/website/" + websiteId;
            return $http.get(url);
        }


      
        function createWebsite(userId, website) {

            var newWebsite = {

                name: website.name,
                developerId: userId,
                description: website.description
            };
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, newWebsite);

        }

        function  findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }


        function updateWebsite(websiteId, newWebsite) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, newWebsite);
        }



    }

})();
