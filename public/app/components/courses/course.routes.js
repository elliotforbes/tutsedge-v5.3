function courseRoutes($routeProvider){
    $routeProvider
      .when('/courses', {
          template: '<course-search></course-search>'
      })
      .when('/course/new', {
        template: '<course-new></course-new>'
      })
      .when('/course/edit/:slug', {
        template: '<course-edit></course-edit>'
      })
}
courseRoutes.$inject = ['$routeProvider'];

angular.module('courses')
  .config(courseRoutes);
