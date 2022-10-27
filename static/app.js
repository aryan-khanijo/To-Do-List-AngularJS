const todoApp = angular.module('NewApp', ['ngMaterial']);

todoApp.controller('AppCtrl',[
    '$scope',
    '$http',
    'prepareToDoObject',
    function($scope, $http, prepareToDoObject) {
    let colorcode = 0;
    $scope.todoList = [];
    
    $scope.title = "";
    $scope.content = "";

    $scope.errorMessage = false;
    
    $scope.hideError = function(){$scope.errorMessage = false;}

    $scope.addToList = function(){
        if (title === "" || content === ""){$scope.errorMessage = true;}
        else{
            let req = {
                method: 'POST',
                url: 'http://localhost:6969/api/note',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "title": $scope.title,
                    "content": $scope.content,
                    "completeStatus": false
                }
            }
            $http(req).then(data => {
                let todo = new prepareToDoObject(data.id, $scope.title, $scope.title, colorcode++, false, $scope);
                $scope.todoList.push(todo);
                $scope.hideError();
                $scope.title = "";
                $scope.content = "";
                if (colorcode > 3) {colorcode = 0;} 
            })
        }  
    }

    $scope.updateNote = function(note) {
        let req = {
            method: 'PUT',
            url: 'http://localhost:6969/api/note',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "id": note.id,
                "title": note.title,
                "content": note.content,
                "completeStatus": note.completeStatus
            }
        }
        $http(req).then(data => {
            console.log(data.message);
        });
    }

    $scope.deleteNote = function(id) {
        let req = {
            method: 'DELETE',
            url: 'http://localhost:6969/api/note',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "id": id
            }
        }
        $http(req).then(data => {
            console.log(data.message);
        });
    }

    const getAllNotes = function(){
        let req = {
            method: 'GET',
            url: 'http://localhost:6969/api/note',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        $http(req).then(data => {
            let notes = data.data.Notes;
            for (let note of notes){
                let todo = new prepareToDoObject(note.id, note.title, note.title, colorcode++, note.completeStatus, $scope);
                $scope.todoList.push(todo);
                if (colorcode > 3) {colorcode = 0;} 
            }
        });
    }

    getAllNotes();
}]);
