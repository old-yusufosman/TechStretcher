angular.module('TechStretcher').controller('AuthCtrl', [
    '$scope',
    '$state',
    '$uibModalInstance',
    'auth',
    function($scope, $state, $uibModalInstance, auth){
        $scope.user = {};

        $scope.register = function(){
            auth.register($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };

        $scope.logIn = function(){
            auth.logIn($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
                $uibModalInstance.close();
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);