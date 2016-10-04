angular.module('TutorialApp', [])

.controller('SearchController', [ '$scope', '$http', function($scope, $http) {
      
    var init = function() {
        
        $http.get('/api/v1/lessons')
            .success(function (response){
                $scope.results = response;
            });
    };
    
    init();
      
}]);