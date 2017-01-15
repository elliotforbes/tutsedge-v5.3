function BlogService($http, $log){
    var service = {};

    function deletePost(slug) {
        $log.log("Deleting a post with slug: " + slug);
    }

    function updatePost(post) {
      return $http({
        method : 'PATCH',
        url: 'posts/' + post.id + "?v=" + Date.now(),
        data : post
      });
    }

    function newPost(post) {
      $log.log(post);
      return $http({
        method: 'POST',
        url: 'posts',
        data: post
      });
    }

    function search(page, title) {
      return $http({
        method: 'POST',
        url: 'api/posts?page=' + page + '&title=' + title
      });
    }

    function getPost(id) {
      return $http.get("api/posts/" + id + "&v=" + Date.now());
    }
  

    function getPosts(page) {
      return $http.get("api/posts?page=" + page + "&v=" + Date.now());
    }
    var service = {
        deletePost : deletePost,
        updatePost : updatePost,
        newPost : newPost,
        search : search,
        getPost : getPost,
        getPosts : getPosts
    };

    return service;
}
BlogService.$inject = ['$http', '$log'];

angular.module('blog')
    .factory('BlogService', BlogService);