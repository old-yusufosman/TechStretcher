var app = angular.module('TechStretcher', ['ui.router']);
app.constant('moment', moment)

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainController'
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsController'
            });;

        $urlRouterProvider.otherwise('home');
    }]);

app.factory('posts', [function(){
    var o = {
        posts: []
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
            $scope.posts.push({author: 'Yusuf Osman',
                submissiondate: Date(),
                postcontent: $scope.postcontent,
                upvotes: 0,
                comments: [
                    {author: 'Joe', body: 'Das cool mayne', upvotes: 0},
                    {author: 'Khaled', body: 'Bless up', upvotes: 2190}
                ]
            });
            $scope.postcontent = "";
        };

        $scope.incrementUpvotes = function(post) {
            post.upvotes += 1;
        };
    }]);

app.controller('PostsController', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id];

        $scope.addComment = function(){
            if($scope.body === '') { return; }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
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