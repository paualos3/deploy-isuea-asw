myApp.controller('issuesController', ['$scope', 'Api', '$http', function($scope, Api, $http){
    
    $scope.form = {};
    $scope.issues = [];
    console.log("issuesCOntroller");
    
    // GET ISSUES
    $http.get('https://isuea-traker-asw-paualos3.c9users.io/issues', { 
      headers: {
            'Accept': 'application/json',
            'Authorization': 'Token token=ya29.Gl0oBXqdbOc_MEVB_tRMCJOgioHsYZ17e-WdkIwZpxFiJa4aBBiC22BkELRf-SN7bQsjfCe-6IpPQsz3ZjT1lbsvrPIS2ApVE_lUxXefOXVhLzPysNZmuQvE6ypjg2c'
         }
    })
    .then(function(response) {
        console.log("Get ISSUES");
        console.log(response.data);
        $scope.issues = response.data;
        console.log(response)
    });
    
    $scope.postNewIssue = function(title,description,priority,category,assignee){
        //POST ISSUE
        console.log($scope.form)
        var err = ""
        var issue = {
            'title': title,
            'description': description,
            'category': category,
            'assignee': assignee,
            'priority': priority,
        };
        console.log(issue);
        $http.post('https://isuea-traker-asw-paualos3.c9users.io/issues', { 
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token token=ya29.Gl0oBXqdbOc_MEVB_tRMCJOgioHsYZ17e-WdkIwZpxFiJa4aBBiC22BkELRf-SN7bQsjfCe-6IpPQsz3ZjT1lbsvrPIS2ApVE_lUxXefOXVhLzPysNZmuQvE6ypjg2c'
            },
            body: {
                issue
            }
        })
        .then(function(response) {
            console.log("Post ISSUES");
            console.log(response.data);
            alert("Issue posted")
            console.log(response)
        });
    }

    
    
}]);