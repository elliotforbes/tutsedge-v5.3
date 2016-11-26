var courseSearch = {
  templateUrl: './app/components/courses/course-search/course-search.html',
  controller: CourseSearchController,
  bindings: {
    courses: '<',
    pageSettings: '<',
    title: '=?'
  }
}

angular.module('courses')
  .component('courseSearch', courseSearch);