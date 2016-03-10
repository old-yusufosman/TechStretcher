angular.module('TechStretcher').constant('moment', moment);

angular.module('TechStretcher').filter('dateFromNow', function(){
    return function(date){
        return moment(date).fromNow();
    }
});