(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);
    
    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        function init() {
            WidgetService
                .findWidgetById( vm.widgetId )
                .then(function (response) {
                    vm.widget = response.data;
                });
        } init();

        function updateWidget(widget) {
                if(widget.name) {
                    WidgetService
                        .updateWidget(vm.widgetId, widget)
                        .then(function (response) {
                            vm.success = "Widget was successfully updated";
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }, function (error) {
                            vm.error = "Widget not updated";
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        });
                }
                else{
                    $("#widgetName").css({'border-color' : 'crimson'});
                    vm.error = "widget's name cannot be empty";
                }

        }
        


        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function () {
                    vm.success = "Widget was successfully deleted";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function () {
                    vm.error = "Widget was not deleted";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
        }
        
       
        
    }
})();
