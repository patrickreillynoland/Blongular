angular.module('AngularBlog.factories', [])
.factory('Post', ['$resource', function($resource) {
    return $resource('/api/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])