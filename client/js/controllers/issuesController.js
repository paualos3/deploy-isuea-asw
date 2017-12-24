myApp.controller('issuesController', ['$scope', 'Api', '$http', '$routeParams', '$location', function($scope, Api, $http, $routeParams, $location){
    
    $scope.form = {};
    $scope.allIssues = [];
    $scope.issues = [];
    $scope.comments = [];
    $scope.issue;
    console.log("issuesCOntroller");
    var url =  $location.absUrl().split("/");
    // GET ISSUES
    if (url[(url.length)-1]=="issues"){
        $http.get('https://isuea-traker-asw-paualos3.c9users.io/issues', { 
          headers: {
                'Accept': 'application/json',
                'Authorization': 'Token token=ya29.Gl0pBfLX6i_SyRGIdjZMvNJjg7DFofH6cMsyeDb76wzOubNm3XHywakNJJjGB3QYwG8UMNQkzb4ADEER6Pr4WQVLc6qo5veIPpVk3Sii-EyPPZYBurmF8UqBd6yGLvg'
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
                    'Authorization': 'Token token=ya29.Gl0oBXqdbOc_MEVB_tRMCJOgioHsYZ17e-WdkIwZpxFiJa4aBBiC22BkELRf-SN7bQsjfCe-6IpPQsz3ZjT1lbsvrPIS2ApVE_lUxXefOXVhLzPysNZmuQvE6ypjg2c'
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
    
}]);