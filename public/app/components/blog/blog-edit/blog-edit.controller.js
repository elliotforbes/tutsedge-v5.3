function BlogEditController(BlogService, $log, $routeParams) {
  var ctrl = this;
  ctrl.article = {};
  var slug = $routeParams.slug;

  this.$onInit = function() {
    BlogService.getPost(slug)
      .then(function success(response){
        ctrl.post = response.data.post;
      });
  }

  ctrl.save = function(post) {
    BlogService.updatePost(post)
      .then(function success(response){
        window.location.reload();
      });
  }

}

BlogEditController.$inject = ['BlogService', '$log', '$routeParams'];

angular.module('blog')
  .controller('BlogEditController', BlogEditController);