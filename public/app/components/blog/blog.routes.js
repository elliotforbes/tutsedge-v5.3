function blogRoutes($routeProvider){
    $routeProvider
      .when('/blog', {
          template: '<blog-index></blog-index>'
      })
      .when('/blog/new', {
        template: '<blog-new></blog-new>'
      })
      .when('/blog/edit/:id', {
        template: '<blog-edit></blog-edit>'
      });
};

blogRoutes.$inject = ['$routeProvider'];
angular.module('blog').config(blogRoutes);
