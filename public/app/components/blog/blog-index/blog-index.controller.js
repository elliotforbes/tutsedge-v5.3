function BlogIndexController(BlogService, $log) {
  var ctrl = this;

  ctrl.articles = [];

  ctrl.page = 1;
  ctrl.pageSettings = [];

  this.$onInit = function() {
    BlogService.getPosts(ctrl.page)
      .then(function success(response){
        ctrl.posts = response.data.posts.data;
        ctrl.pageSettings = response.data.lessons;
      });
      $log.log("Successfully retrieved posts: " + ctrl.posts);
  }

  ctrl.getNextPage = function() {
    ArticleService.getArticles(ctrl.pageSettings.current_page + 1)
      .then(function success(response){
        ctrl.articles = response.data.posts.data;
        ctrl.pageSettings = response.data.posts;
      });
  }

  ctrl.getPrevPage = function() {
    ArticleService.getArticles(ctrl.pageSettings.current_page - 1)
      .then(function success(response){
        ctrl.articles = response.data.posts.data;
        ctrl.pageSettings = response.data.posts;
      });
  }

}

BlogIndexController.$inject = ['BlogService', '$log'];

angular.module('blog')
  .controller('BlogIndexController', BlogIndexController);