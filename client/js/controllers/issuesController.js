myApp.controller('issuesController', ['$scope', 'Api', '$http', '$routeParams', '$location', function($scope, Api, $http, $routeParams, $location){
    
    $scope.form = {};
    $scope.formComments = {};
    $scope.allIssues = [];
    $scope.issues = [];
    $scope.comments = [];
    $scope.issue;
    
    $scope.commentU = {};
    
    $scope.user={}; // TO DO , asignar el usuario al hacer login
    $scope.user.username="usuario random";
    $scope.user.user_id="1";
    // ^ valores random definidos para pruebas
    
    var token = 'ya29.Gl01BQboAPcqUFJZhO3Zc8UgqU_dgjcIcsRz7HdiH7SPbkxUv9nEfS_l8zcvpg8sy5wh47oz3Wk7b9t5hgaeYmkOY2TXv1Bb8hzNwivAqq8Er8io71WE3S5xv-gHemE';
    
    console.log("issuesCOntroller");
    var url =  $location.absUrl().split("/");
    // GET ISSUES
    
    if (url[(url.length)-1]=="issues"){
        $http.get('https://isuea-traker-asw-paualos3.c9users.io/issues', { 
          headers: {
                'Accept': 'application/json',
                'Authorization': 'Token token='+token
             }
        })
        .then(function(response) {
            console.log("Get ISSUES");
            console.log(response.data);
            $scope.allIssues = response.data;
            $scope.issues = response.data;
            console.log(response);
        });
    }
    else {
     //   $scope.getIssue(url);
        $http.get('https://isuea-traker-asw-paualos3.c9users.io/issues/'+url[(url.length)-1], { 
          headers: {
                'Accept': 'application/json',
                'Authorization': 'Token token=ya29.Gl0pBfLX6i_SyRGIdjZMvNJjg7DFofH6cMsyeDb76wzOubNm3XHywakNJJjGB3QYwG8UMNQkzb4ADEER6Pr4WQVLc6qo5veIPpVk3Sii-EyPPZYBurmF8UqBd6yGLvg'
             }
        })
        .then(function(response) {
            console.log("Get ISSUE "+url[(url.length)-1]);
            $scope.issue = response.data;
            console.log(response);
        });
        $http.get('https://isuea-traker-asw-paualos3.c9users.io/issues/'+url[(url.length)-1]+"/comments", { 
          headers: {
                'Accept': 'application/json',
                'Authorization': 'Token token=ya29.Gl0pBfLX6i_SyRGIdjZMvNJjg7DFofH6cMsyeDb76wzOubNm3XHywakNJJjGB3QYwG8UMNQkzb4ADEER6Pr4WQVLc6qo5veIPpVk3Sii-EyPPZYBurmF8UqBd6yGLvg'
             }
        })
        .then(function(response) {
            console.log("Get ISSUE "+url[(url.length)-1]);
            $scope.comments = response.data;
            console.log(response);
        });
    }
    
    $scope.getIssue = function(url){
         $http.get('https://isuea-traker-asw-paualos3.c9users.io/issues/'+url[(url.length)-1], { 
          headers: {
                'Accept': 'application/json',
                'Authorization': 'Token token='+token
             }
        })
        .then(function(response) {
            console.log("Get ISSUE "+url[(url.length)-1]);
            $scope.issue = response.data;
            console.log(response);
        });
        $http.get('https://isuea-traker-asw-paualos3.c9users.io/issues/'+url[(url.length)-1]+"/comments", { 
          headers: {
                'Accept': 'application/json',
                'Authorization': 'Token token='+token
             }
        })
        .then(function(response) {
            console.log("Get ISSUE "+url[(url.length)-1]);
            $scope.comments = response.data;
            console.log(response);
        });
    }
    
    $scope.postNewIssue = function(){
        //POST ISSUE
        console.log($scope.form);
        
        var err = "";
        var issue = {
            'title': $scope.form.title,
            'description': $scope.form.description,
            'category': $scope.form.category,
            'assignee': $scope.form.assignee,
            'priority': $scope.form.priority,
        };
        if (issue.title == "") err += "The issue must have a title.\n";
        if (!['Trivial', 'Minor','Major','Critical','Blocker'].includes(issue.priority)) 
            err += "The priority of the issue must be Trivial, Minor, Major, Critical or Blocker.\n";
        if (!['Task', 'Bug','Proposal','Enhancement'].includes(issue.category))
            err += "The category of the issue must be Task, Bug, Proposal or Enhancement.\n";
        if (err != "") {
            alert(err);
        }
        else {
            console.log(issue);
            var req = {
                method: 'POST',
                url: 'https://isuea-traker-asw-paualos3.c9users.io/issues',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token token='+token
                },
                data: {
                    'title': $scope.form.title,
                    'description': $scope.form.description,
                    'category': $scope.form.category,
                    'assignee': $scope.form.assignee,
                    'priority': $scope.form.priority,
                }
            };
            console.log(req);
            $http(req).then(function(response) {
                console.log("Post ISSUES");
                console.log(response.data);
                alert("Issue posted");
                console.log(response);
            }, function(response){
                // failure callback
                console.log(response.data);
            });
        }
    };
    
    $scope.allIssues = function() { 
        console.log("all issues");
        return $scope.issues = $scope.allIssues;
    };
    
    $scope.filterIssues = function(filter) { 
        console.log("Filter issues");
        switch(filter){
            case "Closed":
                console.log('Closed issues');
                $scope.issues = $scope.issues.filter(issue => issue.status == "Closed");
                break;
            case "Opened":
                console.log('Opened issues');
                $scope.issues = $scope.issues.filter(issue => issue.status == "Opened");
                break;
            case "Resolved":
                console.log('Resolved issues');
                $scope.issues = $scope.issues.filter(issue => issue.status == "Resolved");
                break;
            case "Duplicated":
                console.log('Duplicated issues');
                $scope.issues = $scope.allIssues.filter(issue => issue.status == "Duplicated");
                break;
            case "On holded":
                console.log('On holded issues');
                $scope.issues = $scope.issues.filter(issue => issue.status == "On holded");
                break;
            case "Wontfixed":
                console.log('Wontfixed issues');
                $scope.issues = $scope.issues.filter(issue => issue.status == "Wontfixed");
                break;
            case "Invalid":
                console.log('Invalid issues');
                $scope.issues = $scope.issues.filter(issue => issue.status == "Invalid");
                break;
            case "Close":
                console.log('Closed issues');
                $scope.issues = $scope.allIssues.filter(issue => issue.status == "Closed");
                break;
            case "Trivial":
                console.log('Trivial issues');
                $scope.issues = $scope.issues.filter(issue => issue.priority == "Trivial");
                break;
            case "Minor":
                console.log('Minor issues');
                $scope.issues = $scope.issues.filter(issue => issue.priority == "Minor");
                break;
            case "Major":
                console.log('Major issues');
                $scope.issues = $scope.issues.filter(issue => issue.priority == "Major");
                break;
            case "Critical":
                console.log('Critical issues');
                $scope.issues = $scope.issues.filter(issue => issue.priority == "Critical");
                break;
            case "Blocker":
                console.log('Blocker issues');
                $scope.issues = $scope.issues.filter(issue => issue.priority == "Blocker");
                break;
            case "Task":
                console.log('Task issues');
                $scope.issues = $scope.issues.filter(issue => issue.category == "Task");
                break;
            case "Bug":
                console.log('Bug issues');
                $scope.issues = $scope.issues.filter(issue => issue.category == "Bug");
                break;
            case "Proposal":
                console.log('Proposal issues');
                $scope.issues = $scope.issues.filter(issue => issue.category == "Proposal");
                break;
            case "Enhancement":
                console.log('Enhancement issues');
                $scope.issues = $scope.issues.filter(issue => issue.category == "Enhancement");
                break;
            default:
                console.log('All issues');
                $scope.issues = $scope.allIssues;
        }
    };
    
    $scope.filterIssuesByAssignee = function(filter) { 
        console.log('Filter issues by assignee');
        console.log(filter);
        $scope.issues = $scope.issues.filter(issue => issue.assignee == filter);
    };
    
    $scope.filterIssuesByOwner = function(filter) {
        console.log('Filter issues by owner');
        console.log(filter);
        $scope.issues = $scope.issues.filter(issue => issue.user == filter);
    };
    
    $scope.myIssues = function() { 
        console.log("my issues");
        $http.get('https://isuea-traker-asw-paualos3.c9users.io/issues/mine', { 
          headers: {
                'Accept': 'application/json',
                'Authorization': 'Token token=ya29.Gl0pBfLX6i_SyRGIdjZMvNJjg7DFofH6cMsyeDb76wzOubNm3XHywakNJJjGB3QYwG8UMNQkzb4ADEER6Pr4WQVLc6qo5veIPpVk3Sii-EyPPZYBurmF8UqBd6yGLvg'
             }
        })
        .then(function(response) {
            console.log("Get my ISSUES");
            $scope.issues = response.data;
            console.log(response);
        });
    };
    
    $scope.watchingIssues = function() { 
        console.log("Watching issues");
        $http.get('https://isuea-traker-asw-paualos3.c9users.io/issues/watching', { 
          headers: {
                'Accept': 'application/json',
                'Authorization': 'Token token=ya29.Gl0pBfLX6i_SyRGIdjZMvNJjg7DFofH6cMsyeDb76wzOubNm3XHywakNJJjGB3QYwG8UMNQkzb4ADEER6Pr4WQVLc6qo5veIPpVk3Sii-EyPPZYBurmF8UqBd6yGLvg'
             }
        })
        .then(function(response) {
            console.log("Get my watching ISSUES");
            $scope.issues = response.data;
            console.log(response);
        });
    };
    
    $scope.postComment = function(){
      //  var teoricaID = url[(url.length)-1
        var com = {
              'body': $scope.formComments.titleC,
              'user_id': $scope.user.user_id
        }
        var req = {
                method: 'POST',
                url: 'https://isuea-traker-asw-paualos3.c9users.io/issues/'+url[(url.length)-1]+'/comments',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token token='+token
                },
                data: {
                    'comment': com
                }
        };
            console.log(req);
            $http(req).then(function(response) {
                console.log("Post Comment");
                console.log(response.data);
                alert("Comment posted");
                $scope.formComments={};
                console.log(response);
            }, function(response){
                // failure callback
                alert("Comment failed to be posted");
                console.log(response.data);
            });
        
    };
        $scope.deleteComment = function(comment){
            var idComment = comment.id
          //  console.log(comment.id);
            var req = {
                
                //   /issues/{issue_id}/comments/{comment_id}:
                method: 'DELETE',
                url: 'https://isuea-traker-asw-paualos3.c9users.io/issues/'+url[(url.length)-1]+'/comments/'+idComment,
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token token='+token
                },
                data: {
                 //   'comment': com
                }
           };
            console.log(req);
            $http(req).then(function(response) {
                console.log("Delete Comment");
                console.log(response.data);
                alert("Comment deleted");
                console.log(response);
            }, function(response){
                // failure callback
                alert("Comment failed to be deleted");
                console.log(response.data);
            });
            
            
        };
        $scope.updateClicked = function(comment){
            var idComment = comment.id
            $scope.commentU = comment;
        };
        
         $scope.updateComment = function(){
            
            var comment = $scope.commentU
            var idComment = comment.id
            console.log(comment.id);
            var com = {
              'body': $scope.formComments.titleC,
              'user_id': $scope.user.user_id
            }
            var req = {
                
                //   /issues/{issue_id}/comments/{comment_id}:
                method: 'PUT',
                url: 'https://isuea-traker-asw-paualos3.c9users.io/issues/'+url[(url.length)-1]+'/comments/'+idComment,
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token token='+token
                },
                data: {
                    'body': $scope.formComments.titleC
                }
           };
            console.log(req);
            $http(req).then(function(response) {
                console.log("Update Comment");
                console.log(response.data);/*
                $scope.$apply(function(){
                for (var i in $scope.comments){
                    if (i.id==idComment){
                        i.body = response.data.body;
                    }
                }
                    
                })*/
                
                
                
                $scope.commentU = {};
             //   alert("Comment deleted");
                console.log(response);
            }, function(response){
                // failure callback
            //    alert("Comment failed to be deleted");
                console.log(response.data);
            });
            
            
        };


    
}]);