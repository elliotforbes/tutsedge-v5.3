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

}

BlogEditController.$inject = ['BlogService', '$log', '$routeParams'];

angular.module('blog')
  .controller('BlogEditController', BlogEditController);