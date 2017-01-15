var blogNew = {
  templateUrl: "./app/components/blog/blog-new/blog-new.html",
  controller: BlogNewController,
  bindings: {
    post: '<'
  }
}

angular.module('blog')
  .component('blogNew', blogNew);