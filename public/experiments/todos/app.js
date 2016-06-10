(function () {
    angular
        .module("TodoApp", ["MyDirectives"])
        .controller("TodosController", TodosController);
    
    function TodosController($http) {
        var vm = this;
        $http.get("/api/todos")
            .then(function (response) {
                vm.data = response.data;
            });

    }
})();
