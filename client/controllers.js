angular.module('AngularBlog.controllers', ['ngRoute', 'ngResource', 'AngularBlog.factories'])
.controller('PostsControl', ['$scope', '$routeParams', 'Post', function($scope, $routeParams, Post) {
    $scope.posts = Post.query();
}])
.controller('ComposeControl', ['$scope', '$location', 'Post', 'User', 'Category', function($scope, $location, Post, User, Category) {
    getPosts();

    $scope.users = User.query();
    $scope.categories = Category.query();
    
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
            $location.replace().path('/posts');
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
.controller('UpdatePostControl', ['$scope', '$routeParams', '$location', 'Post', 'User', 'Category', function($scope, $routeParams, $location, Post, User, Category) {
    $scope.users = User.query();
    $scope.categories = Category.query();
    $scope.post = Post.get({ id: $routeParams.id });

    $scope.selectedUser = $scope.post.userid;
    $scope.selectedCat = $scope.post.categoryid;

    returnInfo();

    function returnInfo() {
        console.log($scope.post.userid);
        console.log($scope.post.categoryid);
    }

    $scope.updatePost = function() {
        $scope.post.$update(function() {
            alert('Post Updated');
            $location.replace().path('/posts');
        }, function(err) {
            console.log(err);
        });
    }
}])
.controller('UserListControl', ['$scope', 'User', 'UserService', function($scope, User, UserService) {
        UserService.requireLogin();
        $scope.users = User.query();
    }])
.controller('LoginControl', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {
        UserService.me().then(function(success) {
            redirect();
        });
        function redirect() {
            var dest = $location.search().dest;
            if (!dest) { dest = '/'; }
            $location.replace().path(dest).search('dest', null);
        }
        
        $scope.login = function() {
            UserService.login($scope.email, $scope.password)
            .then(function () {
                redirect();
            }, function (err) {
                console.log(err);
            });
        }
    }]);