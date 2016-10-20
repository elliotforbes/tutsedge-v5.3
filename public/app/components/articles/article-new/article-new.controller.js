function ArticleNewController(ArticleService, $log) {
  var ctrl = this;

  ctrl.article = {};

  ctrl.save = function(article) {
    ArticleService.newArticle(article)
      .then(function success(response){
        $log.log("Successfully Saved Article");
      }, function error(response){
        $log.log("Error: " + response);
      });
  };  

};

ArticleNewController.$inject = ['ArticleService', '$log'];

angular.module('articles')
  .controller('ArticleNewController', ArticleNewController);