var blogIndex = {
  template: './app/components/blog/blog-index/blog-index.html',
  controller: blogIndexController,
  bindings: {
    posts: '<'
  }
}

angular.module('blog')
  .component('blogIndex', blogIndex);