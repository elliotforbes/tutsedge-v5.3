angular.module('TutorialApp', [])

.controller('SearchController', [ '$scope', '$http', function($scope, $http) {
      
    this.$onInit = function() {    
        $http.get('/api/lessons/all')
            .then(function success(response){
                $scope.lessons = response.data.lessons;
            });
    };
    

      
}]);
