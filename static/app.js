var jq = $.noConflict();
var todoApp = angular.module('NewApp', ['ngMaterial']);

todoApp.controller('AppCtrl',[
    '$scope', 
    function($scope) {
    var colorcode = 0;
    var notescardbgTheme = ["w3-theme-d1","w3-theme-d2","w3-theme-d3","w3-theme-d4"];
    var notescontbgTheme = ["w3-theme-l4","w3-theme-l3","w3-theme-l2","w3-theme-l1"];
    var id = 0;
    $scope.todoList = [];
    
    $scope.title = "";
    $scope.content = "";

    $scope.errorMessage = false;

    $scope.todo = function (title, content){
        if(colorcode>3){colorcode = 0;}
        this.id = ++id;
        this.title = title;
        this.content = content;
        this.divTheme = notescardbgTheme[colorcode];
        this.contTheme = notescontbgTheme[colorcode++];
        this.completeStatus = false;
        this.editable = false;
        this.editIcon = "edit";
        this.checkIcon = "check";
        this.deleteIcon = "delete";
        this.error = false;
        this.contId = function(){return "content-"+this.id;}
        this.contentCopy = "";
        this.change = function(){
            var getid = this.id;
            var pos = findPosition(getid);
            if($scope.todoList[pos].editable){
                if ($scope.todoList[pos].content === ""){
                    $scope.todoList[pos].content = $scope.todoList[pos].contentCopy;
                    this.error = true;
                }
                else{
                    $scope.todoList[pos].editIcon = "edit";
                    $scope.todoList[pos].editable = false;
                    this.error = false;
                    jq(`#${this.contId()}`).attr('readonly','');
                }
                
            }
            else{
                jq(`#${this.contId()}`).removeAttr('readonly');
                $scope.todoList[pos].editable = true;
                $scope.todoList[pos].editIcon = "save";
                $scope.todoList[pos].contentCopy = $scope.todoList[pos].content;
            }
        }
        this.done = function(){
            var getid = this.id;
            var pos = findPosition(getid);
            if($scope.todoList[pos].completeStatus){
                $scope.todoList[pos].checkIcon = "check";
                $scope.todoList[pos].completeStatus = false;
            }
            else{
                $scope.todoList[pos].checkIcon = "close";
                $scope.todoList[pos].completeStatus = true;
            }
        }
        this.remove = function(){
            var getid = this.id;
            var newList = []
            for (var item of $scope.todoList){
                if(item['id']!=getid){
                    newList.push(item);
                }
            }
            $scope.todoList = newList;
        }
    }

    var findPosition = function (getid){
        var item = 0;
        for (item=0;item<$scope.todoList.length;item++){
            if($scope.todoList[item]["id"]==getid){
                return item;
            }
        }
    }
    
    $scope.hideError = function(){$scope.errorMessage = false;}

    $scope.addToList = function(){
        var title = $scope.title;
        var content = $scope.content;
        if (title === "" || content === ""){$scope.errorMessage = true;}
        else{
            var todo = new $scope.todo(title, content);
            $scope.todoList.push(todo);
            $scope.hideError();
            $scope.title = "";
            $scope.content = "";
        }  
    }
}]);
