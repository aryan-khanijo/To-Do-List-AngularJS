var jq = $.noConflict();
todoApp.factory('prepareToDoObject',[
    function (){
        var todo = function (id, title, content, colorcode, $scope){
            angular.extend(this, {
                id: id,
                title: title,
                content: content,
                divTheme: getDivTheme(colorcode),
                contTheme: getContTheme(colorcode),
                completeStatus: false,
                editable: false,
                editIcon: "edit",
                checkIcon: "check",
                deleteIcon: "delete",
                error: false,
                contentCopy: "",
                contId: function(){return "content-"+this.id;},
                change: function(){
                    var getid = this.id;
                    var item = findItem(getid, $scope);
                    if(item.editable){
                        if (item.content === ""){
                            item.content = item.contentCopy;
                            this.error = true;
                        }
                        else{
                            item.editIcon = "edit";
                            item.editable = false;
                            this.error = false;
                            jq(`#${this.contId()}`).attr('readonly','');
                        }
                        
                    }
                    else{
                        jq(`#${this.contId()}`).removeAttr('readonly');
                        item.editable = true;
                        item.editIcon = "save";
                        item.contentCopy = item.content;
                    }
                },
                done: function(){
                    var getid = this.id;
                    var item = findItem(getid, $scope);
                    if(item.completeStatus){
                        item.checkIcon = "check";
                        item.completeStatus = false;
                    }
                    else{
                        item.checkIcon = "close";
                        item.completeStatus = true;
                    }
                },
                remove: function(){
                    var getid = this.id;
                    var newList = []
                    for (var item of $scope.todoList){
                        if(item.id!=getid){
                            newList.push(item);
                        }
                    }
                    $scope.todoList = newList;
                }
            })
        };

        return todo;

        function getDivTheme(colorcode){
            var notescardbgTheme = ["w3-theme-d1","w3-theme-d2","w3-theme-d3","w3-theme-d4"];
            return notescardbgTheme[colorcode];
        };

        function getContTheme(colorcode){
            var notescontbgTheme = ["w3-theme-l4","w3-theme-l3","w3-theme-l2","w3-theme-l1"];
            return notescontbgTheme[colorcode];
        };

        function findItem (getid, $scope){
            var item = 0;
            for (item=0;item<$scope.todoList.length;item++){
                if($scope.todoList[item].id==getid){
                    return $scope.todoList[item];
                }
            }
        };
    }
]);