var app = angular.module('TechStretcher', ['ui.router']);
app.constant('moment', moment)

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/templates/home/index.html',
                controller: 'MainController',
                resolve: {
                    postPromise: ['posts', function(posts){
                        return posts.getAll();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/templates/posts/index.html',
                controller: 'PostsController',
                resolve: {
                    post: ['$stateParams', 'posts', function($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }]);

app.factory('posts', ['$http', function($http){
    var o = {
        posts: []
    };

    o.create = function(post) {
        return $http.post('/posts', post).success(function(data){
            o.posts.push(data);
        });
    };

    o.get = function(id) {
        return $http.get('/posts/' + id).then(function(res){
            return res.data;
        });
    };

    o.getAll = function () {
        return $http.get('/posts').success(function (data) {
            angular.copy(data, o.posts);
        });
    };

    o.upvote = function(post) {
        return $http.put('/posts/' + post._id + '/upvote')
            .success(function(data){
                post.upvotes += 1;
            });
    };

    o.addComment = function(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment);
    };

    o.upvoteComment = function(post, comment) {
        return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
            .success(function(data){
                comment.upvotes += 1;
            });
    };

    return o;
}]);

app.controller('MainController', [
    '$scope',
    'posts',
    function($scope, posts){
        $scope.fullname = 'Yusuf Osman';
        $scope.showContents = false;

        $scope.posts = posts.posts;

        //$scope.posts = [
        //    {title: 'This is one great article', subtitle: 'Aren\'t subtitles great?', submitter: 'Yusuf Osman', date: d, image: 'http://www.architectsjournal.co.uk/pictures/2000x2000fit/9/4/2/1369942_London_Skyline.jpg', postcontent: "", upvotes: 9},
        //    {title: 'There should be more articles like this...', subtitle: 'Yes I absolutely agree', submitter: 'Yusuf Osman', date: d2, image: 'https://wallpaperscraft.com/image/thailand_sea_ocean_boat_rock_95477_1920x1080.jpg',  postcontent: "", upvotes: 3},
        //];

        $scope.addPost = function(){
            if(!$scope.postcontent || $scope.postcontent === '') { return; }
            posts.create({
                author: 'Yusuf Osman',
                submissiondate: Date(),
                postcontent: $scope.postcontent,
                upvotes: 0
            });
            $scope.postcontent = "";
        };

        $scope.incrementUpvotes = function(post) {
            posts.upvote(post);
        };
    }]);

app.controller('PostsController', [
    '$scope',
    'posts',
    'post',
    function($scope, posts, post){
        $scope.post = post;

        $scope.addComment = function(){
            if($scope.body === '') { return; }
            posts.addComment(post._id, {
                body: $scope.body,
                author: 'user',
            }).success(function(comment) {
                $scope.post.comments.push(comment);
            });
            $scope.body = '';
        };

        $scope.incrementUpvotes = function(comment){
            posts.upvoteComment(post, comment);
        };
    }]);

app.filter('from', function(){
   return function(date){
       return moment(date).fromNow();
   }
});

app.directive('writePostBox', function() {
    return {
        link: function(scope, element, attrs){
            element.click(function() {
                angular.element(document.getElementById('write_post_box')).append("<p>TESTING!</p>");
            });
            element.bind('blur', function() {
                scope.$apply(attrs.uiBlur);
                angular.element(document.getElementById('write_post_box')).innerHTML = "";
            });
        }
    };
});