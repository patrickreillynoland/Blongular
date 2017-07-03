angular.module('AngularBlog', ['ngRoute', 'ngResource', 'AngularBlog.controllers', 'AngularBlog.factories'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'PostsControl'
    })
    .when('/posts', {
        templateUrl: 'views/main.html',
        controller: 'PostsControl'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeControl'
    })
    .when('/:id/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdatePostControl'
    })
    .when('/:id', {
        templateUrl: 'views/single.html',
        controller: 'SinglePostControl'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);