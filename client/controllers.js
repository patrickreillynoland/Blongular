angular.module('AngularBlog.controllers', ['ngRoute', 'ngResource', 'AngularBlog.factories'])
.controller('PostsControl', ['$scope', '$routeParams', 'Post', function($scope, $routeParams, Post) {
    $scope.posts = Post.query();

    
}])
.controller('ComposeControl', ['$scope', 'Post', function($scope, Post) {

}])
.controller('SinglePostControl', ['$scope', '$routeParams', 'Post', function($scope, $routeParams, Post) {
    $scope.posts = Post.get({ id : $routeParams.id });
    
}])