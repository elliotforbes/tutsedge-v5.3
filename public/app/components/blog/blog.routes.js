function blogRoutes($routeProvider){
    $routeProvider
      .when('/blog', {
          template: '<blog-index></blog-index>'
      });
};
blogRoutes.$inject = ['$routeProvider'];
angular.module('blog').config(blogRoutes);
