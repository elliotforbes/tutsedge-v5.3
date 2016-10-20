function ArticleNewController(ArticleService, CourseService, $log) {
  var ctrl = this;

  ctrl.article = {};
  ctrl.courses = [];

  ctrl.$onInit = function() {
    CourseService.getCourses()
      .then(function success(response) {
        ctrl.courses = response.data.courses.data;
      });
  }

  ctrl.save = function(article) {
    ArticleService.newArticle(article)
      .then(function success(response){
        $log.log("Successfully Saved Article");
      }, function error(response){
        $log.log("Error: " + response);
        ctrl.error = response;
      });
  };  

};

ArticleNewController.$inject = ['ArticleService', 'CourseService', '$log'];

angular.module('articles')
  .controller('ArticleNewController', ArticleNewController);