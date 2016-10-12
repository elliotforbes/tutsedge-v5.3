function ArticleEditController($log, ArticleService, $routeParams, TagService, CourseService, $q, $timeout) {
  var ctrl = this;
  var slug = $routeParams.slug;
  ctrl.article = {};
  ctrl.tags = [];

  this.$onInit = function() {
    ArticleService.getArticle(slug)
      .then(function success(response){
        ctrl.article = response.data.lesson;
        return TagService.getTags();
      })
      .then(function success(response){
        ctrl.tags = response.data.tags.data;
        return CourseService.getCourses();
      })
      .then(function success(response){
        ctrl.courses = response.data.courses.data;
        return ctrl.promise();
      })
      .then(function success(response){
        $log.log("Completed");
      });
  };

  ctrl.promise = function() {
    var defer = $q.defer();

    $timeout(function() {
      defer.resolve('data received')
    }, 2000);

    return defer.promise;
  }

  ctrl.save = function(article) {
    $log.log("Save any updates to the article");
    ArticleService.updateArticle(article);
  };

};

ArticleEditController.$inject = ['$log', 'ArticleService', '$routeParams', 'TagService', 'CourseService', '$q', '$timeout'];

angular.module('articles')
  .controller('ArticleEditController', ArticleEditController);
