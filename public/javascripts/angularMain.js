angular.module('TechStretcher', ['ui.router', 'ngAnimate', 'ui.bootstrap'])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/templates/home/index.html',
                    controller: 'MainCtrl',
                    resolve: {
                        postPromise: ['posts', function(posts){
                            return posts.getAll();
                        }]
                    }
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: '/templates/posts/index.html',
                    controller: 'PostsCtrl',
                    resolve: {
                        post: ['$stateParams', 'posts', function($stateParams, posts) {
                            return posts.get($stateParams.id);
                        }]
                    }
                })
                .state('advanced-post', {
                    url: '/advanced-post',
                    templateUrl: '/templates/advanced-post/index.html',
                    controller: 'MainCtrl'
                });
            $urlRouterProvider.otherwise('home');
        }]);
