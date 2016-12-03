var blogNew = {
  template: './app/components/blog/blog-new/blog-new.html',
  controller: blogNewController,
  bindings: {
    post: '<'
  }
}

angular.module('blog')
  .component('blogNew', blogNew);