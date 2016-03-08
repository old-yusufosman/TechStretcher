var app = angular.module('TechStretcher', []);
app.constant('moment', moment)

app.controller('MainController', [
    '$scope',
    'moment',
    function($scope, moment){
        $scope.fullname = 'Yusuf Osman';
        $scope.showContents = false;
        $scope.posts = [
            {title: 'This is one great article', subtitle: 'Aren\'t subtitles great?', submitter: 'Yusuf Osman', date: Date(), image: 'http://www.architectsjournal.co.uk/pictures/2000x2000fit/9/4/2/1369942_London_Skyline.jpg', postcontent: "", upvotes: 9},
            {title: 'There should be more articles like this...', subtitle: 'Yes I absolutely agree', submitter: 'Yusuf Osman', date: Date(), image: 'https://wallpaperscraft.com/image/thailand_sea_ocean_boat_rock_95477_1920x1080.jpg',  postcontent: "", upvotes: 3},
        ];
        $scope.addPost = function(){
            if(!$scope.postcontent || $scope.postcontent === '') { return; }
            $scope.posts.push({submitter: 'Yusuf Osman', date: Date(), postcontent: $scope.postcontent, upvotes: 0});
            $scope.postcontent = "";
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
                //element.css('height', '200px');
                angular.element(document.getElementById('write_post_box')).append("<p>TESTING!</p>");
            });
            element.bind('blur', function() {
                scope.$apply(attrs.uiBlur);
                angular.element(document.getElementById('write_post_box')).innerHTML = "";
            });
        }
    };
});