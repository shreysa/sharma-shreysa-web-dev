(function () {
    angular
        .module("MyDirectives", [])
        .directive("todosDirective", todosDirective);

    function todosDirective() {
        function linker(scope, element, attributes) {
            var startIndex = -1;
            var stopIndex = -1;
            $(element)
                .find("tbody")
                .sortable({
                    axis: 'y',
                    start:function (event, ui) {
                      //  console.log("sorting started");
                      //  console.log(event);
                      //  console.log(ui.item.index);
                        startIndex = ui.item.index();
                        console.log([startIndex, stopIndex]);
                    },

                    stop:function (event, ui) {
                       // console.log("sorting stopped");
                        //console.log(event);
                        //console.log(ui.item.index);
                        stopIndex = ui.item.index();
                    }
                });
        }
        return {
            templateUrl:  "todos.html",
            scope: {
                data: "="
            },
            link: linker
        }
    }
})();
