angular.module('AngularBlog.controllers', ['ngRoute', 'ngResource', 'AngularBlog.factories'])
.controller('PostsControl', ['$scope', '$routeParams', 'Post', function($scope, $routeParams, Post) {
    $scope.posts = Post.query();
}])
.controller('ComposeControl', ['$scope', '$location', 'Post', 'User', function($scope, $location, Post, User) {
    getPosts();

    $scope.users = User.query();
    
    $scope.createPost = function() {
        var payload = {
            title: $scope.newTitle,
            userid: $scope.newUserId,
            categoryid: $scope.newCategoryId,
            content: $scope.newContent
        };
        var p = new Post(payload);
        p.$save(function(success) {
            alert('Post Saved!')
            $scope.newTitle = '';
            $scope.newUserId = '';
            $scope.newCategoryId = '';
            $scope.content = '';
            window.location.assign('localhost:3000');
        }, function(err) {
            console.log(err);
        });
    }
    
    function getPosts() {
        $scope.posts = Post.query();
    }
}])
.controller('SinglePostControl', ['$scope', '$location', '$routeParams', 'Post', function($scope, $location, $routeParams, Post) {
    $scope.post = Post.get({ id : $routeParams.id });
    
     $scope.deletePost = function(id) {
            if (confirm('You wanna delete?')) {
                $scope.post.$delete(function () {
                    $location.replace().path('/posts');
                }, function (err) {
                    console.log(err);
                });
            }
        };
}])