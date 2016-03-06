var app = angular.module('TechStretcher', [])

app.controller('MainController', [
    '$scope',
    function($scope){
        $scope.fullname = 'yusuf osman';
        $scope.posts = [
            {title: 'This is one great article', subtitle: 'Aren\'t subtitles great?', submitter: 'Yusuf Osman', date: '2 days ago', image: 'http://www.architectsjournal.co.uk/pictures/2000x2000fit/9/4/2/1369942_London_Skyline.jpg', upvotes: 9},
            {title: 'There should be more articles like this...', subtitle: 'Yes I absolutely agree', submitter: 'Yusuf Osman', date: '5 hours ago', image: 'https://wallpaperscraft.com/image/thailand_sea_ocean_boat_rock_95477_1920x1080.jpg',  upvotes: 3},
        ];
    }]);

app.directive('writePostBox', function() {
    return {
        link: function(scope, element, attrs){
            element.click(function() {
                element.css('height', '200px');
            });
        }
    };
});