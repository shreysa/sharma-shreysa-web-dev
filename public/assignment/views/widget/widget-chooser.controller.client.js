(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.createHeaderWidget = createHeaderWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;
        vm.createHTMLWidget = createHTMLWidget;
        vm.createTextWidget = createTextWidget;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function createTextWidget() {
            var textWidget = {
                type: "TEXT"
            };
            WidgetService
                .createWidget(vm.pageId, textWidget)
                .then(
                    function (response) {
                        var realWidget = response.data;
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + realWidget._id);
                    },
                    function(error){
                        vm.error= "Unable to create text widget";
                    }
                );
        }

        function createHeaderWidget() {
            var headerWidget = {
             //   _id: (new Date()).getTime() + "",
              //  pageId: vm.pageId,
                type : "HEADER"
            };
            WidgetService
                .createWidget(vm.pageId, headerWidget)
                .then(
                    function(response){
                        var realWidget = response.data;
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + realWidget._id);
                    },
                    function(error){
                        vm.error= "Unable to create Header";
                    }
                );
        }
        function  getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function  getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function createImageWidget(){
            var imageWidget = {
               // _id:  (new Date()).getTime() + "",
              //  pageId: vm.pageId,
                type: "IMAGE"
            };


            WidgetService
                .createWidget(vm.pageId, imageWidget)
                .then(
                    function(response){
                        var realWidget = response.data;
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + realWidget._id);
                    },
                    function(){
                        vm.error= "Unable to create Image";
                    }
                );
        }



        function createYoutubeWidget(){
            var youtubeWidget = {
             //   _id:  (new Date()).getTime() + "",
               // pageId: vm.pageId,
                type: "YOUTUBE"
            };
            WidgetService
                .createWidget(vm.pageId, youtubeWidget)
                .then(
                    function(response){
                        var realWidget = response.data;
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + realWidget._id);
                    },
                    function(){
                        vm.error= "Unable to create Youtube video";
                    }
                );
        }


        function createHTMLWidget(){
            var htmlWidget = {
          //  _id:  (new Date()).getTime() + "",
           // pageId: vm.pageId,
            type: "HTML"
        };
            WidgetService
                .createWidget(vm.pageId, htmlWidget)
                .then(
                    function(response){
                        var realWidget = response.data;
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + realWidget._id);
                    },
                    function(){
                        vm.error= "Unable to create HTML";
                    }
                );
        }


    }
    
})();
