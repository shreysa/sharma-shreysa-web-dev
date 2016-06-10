(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        // var pages = [
        //     {"_id": "321", "name": "Post 1", "websiteId": "456"},
        //     {"_id": "432", "name": "Post 2", "websiteId": "456"},
        //     {"_id": "543", "name": "Post 3", "websiteId": "456"}
        // ];

        var api = {
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            createPage: createPage
        };

        return api;

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }

     
        function createPage(websiteId, page) {

            var newPage = {
                
                name: page.name,
              // websiteId: websiteId,
                title: page.title
            };
            return $http.post("/api/website/" + websiteId + "/page", newPage);

        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }



        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);

        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }




    }
})();

