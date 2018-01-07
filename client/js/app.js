var myApp = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'angularMoment']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'aboutController'});
        $routeProvider.when('/issues', {templateUrl: 'partials/issues/issueapi.html', controller: 'issuesController'});
        $routeProvider.when('/issues/new', {templateUrl: 'partials/issues/newissueapi.html', controller: 'issuesController'});
        $routeProvider.when('/issues/:id', {templateUrl: 'partials/issues/showIssue.html', controller: 'issuesController'});
        $routeProvider.when('/issues/:id/edit', {templateUrl:'partials/issues/editIssue.html', controller: 'issuesController'});
        
        
        //if no valid routes are found, redirect to /issues
        $routeProvider.otherwise({redirectTo: '/issues'});
        //new comment
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }])