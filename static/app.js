var todoApp = angular.module('NewApp', ['ngMaterial']);

todoApp.controller('AppCtrl',[
    '$scope',
    'prepareToDoObject',
    function($scope, prepareToDoObject) {
    var colorcode = 0;
    var id = 0;
    $scope.todoList = [];
    
    $scope.title = "";
    $scope.content = "";

    $scope.errorMessage = false;
    
    $scope.hideError = function(){$scope.errorMessage = false;}

    $scope.addToList = function(){
        var title = $scope.title;
        var content = $scope.content;
        if (title === "" || content === ""){$scope.errorMessage = true;}
        else{
            var todo = new prepareToDoObject(++id, title, content, colorcode++, $scope);
            $scope.todoList.push(todo);
            $scope.hideError();
            $scope.title = "";
            $scope.content = "";
        }  
    }
}]);
