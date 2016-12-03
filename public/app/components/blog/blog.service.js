function BlogService($log){
    var service = {};

    function deletePost(slug) {
        $log.log("Deleting a post with slug: " + slug);
    }

    function updatePost(post) {
      return $http({
        method : 'PATCH',
        url: 'posts/' + post.slug + "?v=" + Date.now(),
        data : post
      });
    }

    function newPost(post) {
      $log.log(post);
      return $http({
        method: 'POST',
        url: 'post',
        data: post
      });
    }

    function search(page, title) {
      return $http({
        method: 'POST',
        url: 'api/posts?page=' + page + '&title=' + title
      });
    }

    function getPost(slug) {
      return $http.get("api/posts/" + slug + "?v=" + Date.now());
    }

    function getPosts(page) {
      return $http.get("api/posts?page=" + page + "&v=" + Date.now());
    }

    var service = {
        deletePost : deletePost,
        newPost : newPost,
        search : search,
        getPost : getPost,
        getPosts : getPosts
    };

    return service;
}
BlogService.$inject = ['$log'];

angular.module('Blog')
    .factory('BlogService', BlogService);