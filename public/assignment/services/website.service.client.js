(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService)

   


    function WebsiteService() {
        var api = {
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            createWebsite: createWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function deleteWebsite(websiteId) {
            for(var i in websites){
                if(websites[i]._id === websiteId){
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;

        }

        function findWebsiteById(websiteId) {
            for (var i in websites){
                if(websites[i]._id === websiteId){
                    return websites[i];
                }
            }
            return null;
        }
        
        var newWebsite = {};
        function createWebsite(userId, website) {

            var newWebsite = {
                _id: (new Date()).getTime().toString(),
                name: website.websiteName,
                developerId: userId,
                description: website.websiteDescription
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function  findWebsitesByUser(userId) {
            var result = [];
            for (var i in websites){
                if(websites[i].developerId === userId){
                    result.push(websites[i]);

                }
            }
            return result;
        }


        function updateWebsite(websiteId, website) {
            for (var i in websites)
            {
                if(websites[i]._id === websiteId){
                    websites[i].name = website.name;
                    return true;
                }
            }
            return false;
        }
    }

})();
