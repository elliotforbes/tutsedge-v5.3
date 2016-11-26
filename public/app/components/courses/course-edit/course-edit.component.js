var courseEdit = {
  templateUrl : './app/components/courses/course-edit/course-edit.html',
  controller: CourseEditController, 
  bindings : {
    course: '<'
  }
}

angular.module('courses')
  .component('courseEdit', courseEdit);
  