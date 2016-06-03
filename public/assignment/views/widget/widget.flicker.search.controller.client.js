(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickerImageSearchController", FlickerImageSearchController);
    
    function FlickerImageSearchController(FlickerService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        function searchPhotos(searchText) {
            FlickerService
                .searchPhotos(searchText)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                })

            
        }
        
    }


})();
