myApp.factory('Api', ['$resource', function($resource){
    return {
        Issue: $resource('/api/issues/:id', {id: '@id'})
    }
}])