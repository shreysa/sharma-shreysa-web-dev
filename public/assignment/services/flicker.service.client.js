(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickerService", FlickerService);

    var key = "89821526e3123c090711792a7b24592f";
    var secret = "e7095ed9f45e8609";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickerService($http) {
        var api = {
            searchPhotos: searchPhotos
        };
        return api;
        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
            
        }

    }

})();
