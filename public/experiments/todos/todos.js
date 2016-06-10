(function () {
    angular
        .module("MyDirectives", [])
        .directive("todosDirective", todosDirective);

    function todosDirective() {
        function linker(scope, element, attributes) {
            $(element)
                .find("tbody")
                .sortable({
                    axis: 'y'
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
