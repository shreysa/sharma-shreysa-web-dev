(function (){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $location, WidgetService, $sce) {
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.navigateToPageList = navigateToPageList;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
      //  vm.navigateToEditWidget = navigateToEditWidget;


        function init(){
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

        } init();

      /*  function navigateToEditWidget() {
            if()

        }
*/

        function  getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function  getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function navigateToPageList(){
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


    }

})();
