function ArticleEditController($log, ArticleService, $routeParams) {
  var ctrl = this;
  var slug = $routeParams.slug;
  ctrl.article = {};

  this.$onInit = function() {
    ArticleService.getArticle(slug)
      .then(function success(response){
        ctrl.article = response.data.lesson;
      });
  };

  ctrl.save = function(article) {
    $log.log("Save any updates to the article");
    ArticleService.updateArticle(article);
  };

};

ArticleEditController.$inject = ['$log', 'ArticleService', '$routeParams'];

angular.module('articles')
  .controller('ArticleEditController', ArticleEditController);