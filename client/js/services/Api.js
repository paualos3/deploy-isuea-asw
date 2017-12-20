myApp.factory('Api', ['$resource', function($resource){
    return {
        Issue: $resource('/issues/:id', {id: '@id'})
    }
}])