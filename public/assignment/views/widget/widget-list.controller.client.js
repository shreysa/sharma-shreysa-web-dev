(function (){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $location, WidgetService, $sce) {
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.navigateToPageList = navigateToPageList;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.navigateToEditWidget = navigateToEditWidget;
        vm.navigateToNewWidget = navigateToNewWidget;
        vm.reorderWidget = reorderWidget;


        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                });
         //   $(".container")
           //     .sortable({axis: "y"});
        } init();


        function navigateToNewWidget() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");

        }

        function navigateToEditWidget() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId)

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

        function navigateToPageList(){
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function reorderWidget(start, end) {
            console.log(start+ "  " + end);
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(
                    function (response) {
                        init();
                    },
                    function (error) {
                        vm.error = "Widgets could not be reordered";
                    });

        }


    }

})();
