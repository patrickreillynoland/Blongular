angular.module('AngularBlog.controllers', ['ngRoute', 'ngResource', 'AngularBlog.factories'])
.controller('PostsControl', ['$scope', 'Post', function($scope, Post) {
    $scope.posts = Post.query();
}])
.controller('ComposeControl', ['$scope', 'Post', function($scope, Post) {

}])