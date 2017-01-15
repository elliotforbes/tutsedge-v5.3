var blogIndex = {
  templateUrl: './app/components/blog/blog-index/blog-index.html',
  controller: BlogIndexController,
  bindings: {
    posts: '<'
  }
}

angular.module('blog')
  .component('blogIndex', blogIndex);