angular.module('TechStretcher').controller('MainCtrl', [
    '$scope',
    '$uibModal',
    '$log',
    'posts',
    'auth',
    function($scope,$uibModal, $log, posts, auth){
        $scope.showContents = false;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
        $scope.posts = posts.posts;

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/login.html',
                controller: 'AuthCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

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