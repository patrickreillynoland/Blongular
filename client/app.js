angular.module('AngularBlog', ['ngRoute', 'ngResource', 'AngularBlog.controllers', 'AngularBlog.factories', 'AngularBlog.directives', 'AngularBlog.services'])
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
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginControl'
    })
    .when('/users', {
        templateUrl: 'views/user_list.html',
        controller: 'UserListControl'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeControl'
    })
    .when('/posts/:id/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdatePostControl'
    })
    .when('/posts/:id', {
        templateUrl: 'views/single.html',
        controller: 'SinglePostControl'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);