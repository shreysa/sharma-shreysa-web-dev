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
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;


        function createHeaderWidget() {
            var headerWidget = {
                _id: (new Date()).getTime() + "",
                pageId: vm.pageId,
                widgetType: "HEADER"
            };
            if (WidgetService.createWidget(vm.pageId, headerWidget)) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + headerWidget._id);
            }
            else {
                vm.error = "Unable to create Header";
            }
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
                _id:  (new Date()).getTime() + "",
                pageId: vm.pageId,
                widgetType: "IMAGE"
            };

            if(WidgetService.createWidget(vm.pageId, imageWidget)){

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + imageWidget._id);
            }
            else{
                vm.error= "Unable to create Image";
            }
        }



        function createYoutubeWidget(){
            var youtubeWidget = {
                _id:  (new Date()).getTime() + "",
                pageId: vm.pageId,
                widgetType: "YOUTUBE"
            };
            if(WidgetService.createWidget(vm.pageId, youtubeWidget)){

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + youtubeWidget._id);
            }
            else{
                vm.error= "Unable to create youtube video";
            }
        }


        function createHTMLWidget(){
            var htmlWidget = {
            _id:  (new Date()).getTime() + "",
            pageId: vm.pageId,
            widgetType: "HTML"
        };
            if(WidgetService.createWidget(vm.pageId, htmlWidget)){

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + htmlWidget._id);
            }
            else{
                vm.error= "Unable to create HTML";
            }
        }


    }
    
})();
