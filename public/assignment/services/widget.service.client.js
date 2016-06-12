(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

   function WidgetService($http) {

       var api = {

           findWidgetsByPageId: findWidgetsByPageId,
           deleteWidget: deleteWidget,
           findWidgetById: findWidgetById,
           updateWidget: updateWidget,
           createWidget: createWidget,
           reorderWidget: reorderWidget

       };

       return api;
       
       
       function reorderWidget(pageId, start, end) {
           console.log(start + "the start position");
           console.log(end + " the end position");
           return $http.put("/page/" + pageId + "/widget?start=" + start+ "&end=" + end);
       }

       function findWidgetById(widgetId) {
           var url = "/api/widget/" + widgetId;
           return $http.get(url);
       }

     function updateWidget(widgetId, widget) {
         var url = "/api/widget/" + widgetId;
         return $http.put(url, widget);

       }

            function createWidget(pageId, widget) {
               var url = "/api/page/" + pageId + "/widget";
                return $http.post(url, widget);
            }




       function deleteWidget(widgetId) {
           var url = "/api/widget/" + widgetId;
           return $http.delete(url);

       }


       function findWidgetsByPageId(pageId) {
           var url = "/api/page/" + pageId + "/widget";
           return $http.get(url);
       }
       
       function uploadImage(){
           var url = "/api/upload/" ;
           return $http.post(url);
       }

   }

}) ();
