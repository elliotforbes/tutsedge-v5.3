angular.module('root', [
    'ngRoute',
    'articles',
    'dashboard',
    'user',
    'comment',
    'courses',
    'stats',
    'settings',
    'social',
    'blog',
    'tags',
    'email'
]);

function routeProvider($routeProvider){
    $routeProvider
      .when('/', {
          template: '<dashboard></dashboard>'
      });
}
routeProvider.$inject = ['$routeProvider'];

angular.module('root')
  .config(routeProvider);

var loading = {
  templateUrl: './common/loading/loading.html',
  controller: LoadingController,
  bindings: {
    isLoading: '<'
  }
};

angular.module('root')
  .component('loading', loading);
function LoadingController() {
  var ctrl = this;
};

angular.module('root')
  .controller('LoadingController', LoadingController);




var topNav = {
  templateUrl: './app/common/top-nav/top-nav.html',
  controller: TopNavController,
  bindings: {
    user: '<'
  }
};

angular
  .module('root')
  .component('topNav', topNav);

function TopNavController() {
  var ctrl = this;
};

angular.module('root')
  .controller('TopNavController', TopNavController);

angular.module('articles', []);
function articleRouteProvider($routeProvider){
    $routeProvider
      .when('/articles',{
        template: '<articles-home></articles-home>'
      })
      .when('/article/new', {
        template: '<article-new></article-new>'
      })
      .when('/article/edit/:slug', {
        template: '<article-edit></article-edit>'
      })
      .otherwise({ 
        template: '<h1>Not Found</h1>'
      });
};

angular.module('articles').config(articleRouteProvider);
articleRouteProvider.$inject = ['$routeProvider'];

function ArticleService($http, $log, CSRF_TOKEN) {

  $http.defaults.headers.common['X-Csrf-Token'] = CSRF_TOKEN;

  function newArticle(article) {
    console.log(article);
    return $http({
      method: 'POST',
      url: 'articles?v=' + Date.now(),
      data: article
    });
  }

  function search(page, title) {
    return $http({
      method: 'POST',
      url: 'api/lessons?page=' + page + "&title=" + title
    });
  }

  function updateArticle(article) {
    return $http({
      method: 'PATCH',
      url: 'articles/' + article.slug + "?v=" + Date.now(),
      data: article
    });
  }

  function deleteArticle(id) {
    $log.log("Placeholder for deleting an article");
  }

  function getArticle(slug) {
    return $http.get("api/lesson/" + slug + "?v=" + Date.now());
  }

  function getArticles(page){
    return $http.get("api/lessons?page=" + page + "&v=" + Date.now());
  }

  var service = {
    newArticle : newArticle,
    updateArticle : updateArticle,
    deleteArticle : deleteArticle,
    getArticle : getArticle,
    search: search,
    getArticles: getArticles
  };

  return service;

}

ArticleService.$inject = ['$http', '$log', 'CSRF_TOKEN'];  

angular
  .module('articles')
  .factory('ArticleService', ArticleService);
angular.module('blog', []);
function blogRoutes($routeProvider){
    $routeProvider
      .when('/blog', {
          template: '<blog-index></blog-index>'
      })
      .when('/blog/new', {
        template: '<blog-new></blog-new>'
      })
      .when('/blog/edit/:id', {
        template: '<blog-edit></blog-edit>'
      });
};

blogRoutes.$inject = ['$routeProvider'];
angular.module('blog').config(blogRoutes);

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
angular.module('comment', []);
function commentRoutes($routeProvider){
    $routeProvider
      .when('/comments', {
          template: '<comment-index></comment-index>'
      });
};
commentRoutes.$inject = ['$routeProvider'];
angular.module('comment').config(commentRoutes);

function CommentService($log){

    function deleteComment(commentId) {
        $log.log("Deleting a comment with id: " + commentId);
    }

    var service = {
        deleteComment : deleteComment
    };

    return service;
}
CommentService.$inject = ['$log'];

angular.module('comment')
    .factory('CommentService', CommentService);
angular.module('courses', []);

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

function CourseService($http, $log, CSRF_TOKEN) {

  $http.defaults.headers.common['X-Csrf-Token'] = CSRF_TOKEN;

  function newCourse(course) {
    console.log(course);
    return $http({
      method: 'POST',
      url: 'courses?v=' + Date.now(),
      data: course
    });
  }

  function getCourse(slug) {
    return $http.get("api/course/" + slug + "?v=" + Date.now());
  }

  function getCourses(page){
    return $http.get("api/courses?page=" + page + "&v=" + Date.now());
  }

  function search(page, title) {
    return $http({
      method: 'POST',
      url: 'api/lessons?page=' + page + "&title=" + title
    });
  }

  function updateCourse(course) {
    return $http({
      method: 'PATCH',
      url: 'courses/' + course.slug + "?v=" + Date.now(),
      data: course
    });
  }
  

  var service = {
    updateCourse : updateCourse,
    getCourse : getCourse,
    newCourse : newCourse,
    search : search,
    getCourses : getCourses
  };

  return service;
}

CourseService.$inject = ['$http', '$log', 'CSRF_TOKEN'];  

angular
  .module('courses')
  .factory('CourseService', CourseService);
var dashboard = {
  templateUrl: './app/components/dashboard/dashboard-index.html',
  controller: DashboardController
};

angular.module('root')
  .component('dashboard', dashboard);
function DashboardController() {
  var ctrl = this;
};

angular.module('root')
  .controller('DashboardController', DashboardController);
angular.module('dashboard', ['chart.js']);
angular.module('email', []);

function emailRouteProvider($routeProvider){
    $routeProvider
      .when('/email', {
          template: '<email-dashboard></email-dashboard>'
      });
}
emailRouteProvider.$inject = ['$routeProvider'];

angular.module('email')
  .config(emailRouteProvider);

angular.module('settings',[]);
function settingsRoutes($routeProvider){
    $routeProvider
      .when('/settings', {
          template: '<settings-index></settings-index>'
      });
}
settingsRoutes.$inject = ['$routeProvider'];


angular.module('settings')
  .config(settingsRoutes);

angular.module('social', []);
function socialRoutes($routeProvider){
    $routeProvider
      .when('/social', {
          template: '<social-dashboard></social-dashboard>'
      });
}
socialRoutes.$inject = ['$routeProvider'];

angular.module('social')
  .config(socialRoutes);
  
angular.module('stats', ['chart.js']);
function statsRoutes($routeProvider){
    $routeProvider
      .when('/stats', {
          template: '<stats-index></stats-index>'
      });
};

statsRoutes.$inject = ['$routeProvider'];
angular.module('stats').config(statsRoutes);

angular.module('tags', []);
function TagService($http, $log) {

  function getTags() {
    return $http.get('api/tags');
  }

  var service = {
    getTags : getTags
  };

  return service;

}

TagService.$inject = ['$http', '$log'];  

angular
  .module('tags')
  .factory('TagService', TagService);
angular.module('user', []);
function userRoutes($routeProvider){
    $routeProvider
      .when('/users', {
          template: '<user-index></user-index>'
      })
      .when('/user/edit/:id', {
        template: '<user-edit></user-edit>'  
      })
      .when('/user/new', {
        template: '<user-new></user-new>'
      });
};

userRoutes.$inject = ['$routeProvider'];
angular.module('user').config(userRoutes);

function UserService($log, $http) {

    function newUser(user) {
        $log.log("Adding New User");
    }

    function getUser(id) {
        return $http.get('api/user/' + id + "?v=" + Date.now());
    }

    function getUsers(page) {
        return $http.get('api/users?page=' + page + "?v=" + Date.now());
    }

    function getGrowth() {
        return $http.get('api/users/growth' + "?v=" + Date.now());
    }

    var service = {
        newUser: newUser,
        getUser: getUser,
        getUsers: getUsers,
        getGrowth: getGrowth
    };

    return service;
};

UserService.$inject = ['$log', '$http'];

angular.module('user')
    .factory('UserService', UserService);
var articlesHome = {
  templateUrl: './app/components/articles/article-home/articles-home.html',
  controller: ArticlesHomeController,
  bindings: {
    articles: '<',
    pageSettings: '<',
    title: '=?'
  }
};

angular.module('articles')
  .component('articlesHome', articlesHome);
function ArticlesHomeController(ArticleService, $log) {
  var ctrl = this;

  ctrl.articles = [];

  ctrl.page = 1;
  ctrl.pageSettings = [];

  this.$onInit = function(){
    ArticleService.getArticles(ctrl.page)
      .then(function success(response){
        ctrl.articles = response.data.lessons.data;
        ctrl.pageSettings = response.data.lessons;
      });
    $log.log("Successfully Retrieved lessons: " + ctrl.articles);  
  }

  ctrl.getPages = function(number) {
    if(number == undefined){
      number = 1;
    }
    var totalPages = Math.ceil(number / 10);
    return new Array(totalPages);
  };

  ctrl.search = function() {
    ArticleService.search(ctrl.page, ctrl.title)
      .then(function success(response){
        ctrl.articles = response.data.lessons.data;
        ctrl.pageSettings = response.data.lessons;
      });
  }

  ctrl.setPage = function(page) {
    ArticleService.getArticles(page)
      .then(function success(response){
        ctrl.articles = response.data.lessons.data;
        ctrl.pageSettings = response.data.lessons;
      });
  };

  ctrl.getNextPage = function() {
    ArticleService.getArticles(ctrl.pageSettings.current_page + 1)
      .then(function success(response){
        ctrl.articles = response.data.lessons.data;
        ctrl.pageSettings = response.data.lessons;
      });
  }

  ctrl.getPrevPage = function() {
    ArticleService.getArticles(ctrl.pageSettings.current_page - 1)
      .then(function success(response){
        ctrl.articles = response.data.lessons.data;
        ctrl.pageSettings = response.data.lessons;
      });
  }


};

ArticlesHomeController.$inject = ['ArticleService', '$log'];

angular.module('articles')
  .controller('ArticlesHomeController', ArticlesHomeController);
var articleEdit = {
  templateUrl: './app/components/articles/article-edit/article-edit.html',
  controller: ArticleEditController,
  bindings: {
    article: '<',
    tags: '<',
    courses: '<'
  }
}

angular.module('articles')
  .component('articleEdit', articleEdit);
function ArticleEditController($log, ArticleService, $routeParams, TagService, CourseService, $q, $timeout) {
  var ctrl = this;
  var slug = $routeParams.slug;
  ctrl.article = {};
  ctrl.tags = [];

  this.$onInit = function() {
    ArticleService.getArticle(slug)
      .then(function success(response){
        ctrl.article = response.data.lesson;
        return TagService.getTags();
      })
      .then(function success(response){
        ctrl.tags = response.data.tags.data;
        return CourseService.getCourses();
      })
      .then(function success(response){
        ctrl.courses = response.data.courses.data;
        $log.log("Completed Loading");
      })
  };
  
  ctrl.save = function(article) {
    $log.log("Save any updates to the article");
    ArticleService.updateArticle(article)
      .then(function success(response){
        $log.log("Successfully Saved Article");
        window.location.reload();
      }, function error(response){
        $log.log("Failed to save article");
      });
  };

};

ArticleEditController.$inject = ['$log', 'ArticleService', '$routeParams', 'TagService', 'CourseService', '$q', '$timeout'];

angular.module('articles')
  .controller('ArticleEditController', ArticleEditController);

var articleNew = {
  templateUrl: './app/components/articles/article-new/article-new.html',
  controller: ArticleNewController,
  bindings: {
    article: '<',
    tags: '<',
    error: '<'
  }
};

angular.module('articles')
  .component('articleNew', articleNew);
function ArticleNewController(ArticleService, CourseService, $log, TagService, $location) {
  var ctrl = this;

  ctrl.article = {};
  ctrl.courses = [];
  ctrl.tags = [];

  ctrl.$onInit = function() {
    CourseService.getCourses()
      .then(function success(response) {
        ctrl.courses = response.data.courses.data;
        return TagService.getTags();
      })
      .then(function success(response){
        ctrl.tags = response.data.tags.data;
        $log.log("Finished loading");      
      });
  }

  ctrl.save = function(article) {
    ArticleService.newArticle(article)
      .then(function success(response){
        $log.log("Successfully Saved Article");
        $location.path("article/edit/" + article.slug);
      }, function error(response){
        $log.log("Error: " + response);
        ctrl.error = response;
      });
  };  

};

ArticleNewController.$inject = ['ArticleService', 'CourseService', '$log', 'TagService', '$location'];

angular.module('articles')
  .controller('ArticleNewController', ArticleNewController);
var blogEdit = {
  templateUrl: "./app/components/blog/blog-edit/blog-edit.html",
  controller: BlogEditController,
  bindings: {
    post: '<'
  }
}

angular.module('blog')
  .component('blogEdit', blogEdit);
function BlogEditController(BlogService, $log, $routeParams) {
  var ctrl = this;
  ctrl.article = {};
  var id = $routeParams.id;

  this.$onInit = function() {
    BlogService.getPost(id)
      .then(function success(response){
        ctrl.post = response.data.post;
      });
  }

  ctrl.save = function(post) {
    BlogService.updatePost(post)
      .then(function success(response){
        window.location.reload();
      });
  }

}

BlogEditController.$inject = ['BlogService', '$log', '$routeParams'];

angular.module('blog')
  .controller('BlogEditController', BlogEditController);
var blogIndex = {
  templateUrl: './app/components/blog/blog-index/blog-index.html',
  controller: BlogIndexController,
  bindings: {
    posts: '<'
  }
}

angular.module('blog')
  .component('blogIndex', blogIndex);
function BlogIndexController(BlogService, $log) {
  var ctrl = this;

  ctrl.articles = [];

  ctrl.page = 1;
  ctrl.pageSettings = [];

  this.$onInit = function() {
    BlogService.getPosts(ctrl.page)
      .then(function success(response){
        ctrl.posts = response.data.posts.data;
        ctrl.pageSettings = response.data.lessons;
      });
      $log.log("Successfully retrieved posts: " + ctrl.posts);
  }

  ctrl.getNextPage = function() {
    ArticleService.getArticles(ctrl.pageSettings.current_page + 1)
      .then(function success(response){
        ctrl.articles = response.data.posts.data;
        ctrl.pageSettings = response.data.posts;
      });
  }

  ctrl.getPrevPage = function() {
    ArticleService.getArticles(ctrl.pageSettings.current_page - 1)
      .then(function success(response){
        ctrl.articles = response.data.posts.data;
        ctrl.pageSettings = response.data.posts;
      });
  }

}

BlogIndexController.$inject = ['BlogService', '$log'];

angular.module('blog')
  .controller('BlogIndexController', BlogIndexController);
var blogNew = {
  templateUrl: "./app/components/blog/blog-new/blog-new.html",
  controller: BlogNewController,
  bindings: {
    post: '<'
  }
}

angular.module('blog')
  .component('blogNew', blogNew);
function BlogNewController(BlogService, $log) {
  var ctrl = this;

  ctrl.save = function(post) {
    BlogService.newPost(post)
      .then(function success(response){
        $log.log("Successfully saved new post");
        $location.path("blogs/edit/" + post.slug);
      }, function error(response){
        $log.log("Error:" + response);
        ctrl.error = response;
      });
  };

}

BlogNewController.$inject = ['BlogService', '$log'];

angular.module('blog')
  .controller('BlogNewController', BlogNewController);
var commentIndex = {
  templateUrl: './app/components/comment/comment-index/comment-index.html',
  controller: CommentIndexController
  
}

angular.module('comment')
  .component('commentIndex', commentIndex);
function CommentIndexController(CommentService){
    var ctrl = this;

    ctrl.deleteComment = function(commentId){
        CommentService.deleteComment(commentId);
    }
}

CommentIndexController.$inject = ['CommentService'];

angular.module('comment')
    .controller('CommentIndexController', CommentIndexController);
var courseEdit = {
  templateUrl : './app/components/courses/course-edit/course-edit.html',
  controller: CourseEditController, 
  bindings : {
    course: '<'
  }
}

angular.module('courses')
  .component('courseEdit', courseEdit);
  
function CourseEditController(CourseService, $log, $routeParams) {
  var ctrl = this;
  
  var slug = $routeParams.slug;

  this.$onInit = function() {
    CourseService.getCourse(slug)
      .then(function success(response){
        ctrl.course = response.data.course;
      });
  }

  ctrl.save = function(course) {
    CourseService.updateCourse(course)
      .then(function success(response){
        window.location.reload();
        $log.log("Successfully Saved");
      });
  }

}

CourseEditController.$inject = ['CourseService', '$log', '$routeParams'];

angular.module('courses')
  .controller('CourseEditController', CourseEditController);
var courseNew = {
  templateUrl: './app/components/courses/course-new/course-new.html',
  controller: CourseNewController,
  bindings: {
    course : '=?'
  }
}

angular.module('courses')
  .component('courseNew', courseNew);
  
function CourseNewController(CourseService, $log) {
  var ctrl = this;

  ctrl.save = function(course) {
    CourseService.newCourse(course)
      .then(function success(response){
        $log.log("Successfully Saved Course");
        $location.path("course/edit/" + course.slug);
      }, function error(response){
        $log.log("Error: " + response);
        ctrl.error = response;
      });
  }

}

CourseNewController.$inject = ['CourseService', '$log'];

angular.module('courses')
  .controller('CourseNewController', CourseNewController);
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
function CourseSearchController(CourseService, $log) {
  var ctrl = this;

  ctrl.courses = [];

  ctrl.page = 1;
  ctrl.pageSettings = [];

  this.$onInit = function(){
    CourseService.getCourses(ctrl.page)
      .then(function success(response){
        ctrl.courses = response.data.courses.data;
        ctrl.pageSettings = response.data.courses;
      });
    $log.log("Successfully Retrieved courses: " + ctrl.courses);  
  }

}

CourseSearchController.$inject = ['CourseService', '$log'];

angular.module('courses')
  .controller('CourseSearchController', CourseSearchController);
var dashboardActions = {
    templateUrl: 'app/components/dashboard/dashboard-actions/dashboard-actions.html',
    controller: DashboardActionController
    
};

angular.module('dashboard')
    .component('dashboardActions', dashboardActions);
function DashboardActionController(){
    var ctrl = this;
}

angular.module('dashboard')
    .controller('DashboardActionController', DashboardActionController);
var dashboardAnalytics = {
  templateUrl: './app/components/dashboard/dashboard-analytics/dashboard-analytics.html',
  controller: DashboardAnalyticsController,
  bindings: {
    series: '<',
    labels: '<',
    data: '<',
    options: '<'
  }
};

angular.module('root')
  .component('dashboardAnalytics', dashboardAnalytics);
function DashboardAnalyticsController($log) {
  var ctrl = this;

  ctrl.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  ctrl.series = ['Visitors', 'Page Views'];

  ctrl.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

  ctrl.options = {
    scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
  };

  ctrl.$onInit = function() {
    $log.log("This will perform the REST API call to google analytics on page load");
  };

};

DashboardAnalyticsController.$inject = ['$log'];

angular.module('root')
  .controller('DashboardAnalyticsController', DashboardAnalyticsController);

var dashboardComments = {
    templateUrl: 'app/components/dashboard/dashboard-comments/dashboard-comments.html',
    controller: DashboardCommentsController,
    bindings: {
        comments: '<'
    }
}

angular.module('dashboard')
    .component('dashboardComments', dashboardComments);
function DashboardCommentsController($scope){
    var ctrl = this;
}

DashboardCommentsController.$inject = ['$scope'];

angular.module('dashboard')
    .controller('DashboardCommentsController', DashboardCommentsController);
var dashboardGrowth = {
  templateUrl : './app/components/dashboard/dashboard-growth/dashboard-growth.html',
  controller: DashboardGrowthController,
  bindings: {
    total : '<'
  }
}

angular.module('dashboard')
  .component('dashboardGrowth', dashboardGrowth);
function DashboardGrowthController(UserService, $log) {
  var ctrl = this;

  this.$onInit = function() {
    UserService.getUsers()
      .then(function success(response){
        $log.log(response);
        ctrl.total = response.data.users.total;
      });
  };

}

DashboardGrowthController.$inject = ['UserService',  '$log'];

angular.module('dashboard')
  .controller('DashboardGrowthController', DashboardGrowthController);
var dashboardOauth = {
  templateUrl: './app/components/dashboard/dashboard-oauth/dashboard-oauth.html',
  controller: DashboardOauthController,
  bindings: {
    clients: '<'
  }
}

angular.module('dashboard')
  .component('dashboardOauth', dashboardOauth);
function DashboardOauthController($http, $log) {
  var ctrl = this;

  ctrl.$onInit = function() {
    $http.get('oauth/clients')
      .then(function success(response){
        $log.log(response);
      })
      .catch(function error(response){
        $log.log(response);
        $log.log(response.status);
        $log.log(response.headers);
      });
  }
}

DashboardOauthController.$inject = ['$http', '$log'];

angular.module('dashboard')
  .controller('DashboardOauthController', DashboardOauthController);
var dashboardUsers = {
  templateUrl: './app/components/dashboard/dashboard-users/dashboard-users.html',
  controller: DashboardUsersController,
  bindings: {
    series: '<',
    labels: '<',
    data: '<',
    options: '<'
  }
};

angular.module('root')
  .component('dashboardUsers', dashboardUsers);
function DashboardUsersController(UserService, $log) {
  var ctrl = this;

  ctrl.labels = ['-4 Week', '-3 Week', '-2 Week', '-1 Week'];
  ctrl.series = ['New Users'];

  ctrl.options = {
    scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
  };

  ctrl.data = [
    [6, 3, 4, 2]
  ];

  this.$onInit = function() {
    UserService.getGrowth()
      .then(function success(response){
        $log.log(ctrl.data);
        ctrl.data[0] = response.data.growth;
        $log.log(ctrl.data);
      });
  };

};

DashboardUsersController.$inject = ['UserService','$log'];

angular.module('root')
  .controller('DashboardUsersController', DashboardUsersController);

var emailDashboard = {
  templateUrl: './app/components/email/email-dashboard/email-dashboard.html',
  controller: EmailDashboardController
}

angular.module('email')
  .component('emailDashboard', emailDashboard);
function EmailDashboardController($log){
  var ctrl = this;

  ctrl.$onInit = function() {
    $log.log("Email Controller Initialized");
  }

}

EmailDashboardController.$inject = ['$log'];

angular.module('email')
  .controller('EmailDashboardController', EmailDashboardController);
var settingsIndex = {
  templateUrl: 'app/components/settings/settings-index/settings-index.html',
  controller: SettingsIndexController,
  bindings: {
    settings: '<'
  }
};

angular.module('settings')
  .component('settingsIndex', settingsIndex);
function SettingsIndexController(){
  var ctrl = this;

  ctrl.settings = {
    tagline: "High Quality Programming Tutorials",
    siteUrl: "https://tutorialedge.net",
    adminEmail: "admin@tutorialedge.net",
    meta: "| Tutorialedge.net"
  }

}

angular.module('settings')
  .controller('SettingsIndexController', SettingsIndexController);
var socialDashboard = {
  templateUrl: 'app/components/social/social-dashboard/social-dashboard.html',
  controller: SocialDashboardController,
  bindings: {
    socialDashboard: '<'
  }
}

angular.module('social')
  .component('socialDashboard', socialDashboard);
function SocialDashboardController($log){
  var ctrl = this;

  ctrl.$onInit = function() {
    $log.log("Hello World");
  }
}

SocialDashboardController.$inject = ['$log'];

angular.module('social')
  .controller('SocialDashboardController', SocialDashboardController);
var youtubeSubscribers = {
  templateUrl: 'app/components/social/youtube-subscribers/youtube-subscribers.html',
  controller: YoutubeSubscriberController, 
  bindings: {
    youtubeSubscribers: '<'
  }
}

angular.module('social')
  .component('youtubeSubscribers', youtubeSubscribers);
function YoutubeSubscriberController(){
  var ctrl = this;

  ctrl.youtubeSubscribers = [{ name: 'elliot'}];

}
angular.module('social')
  .controller('YoutubeSubscriberController', YoutubeSubscriberController);
function youtubeSubscriberRoutes($routeProvider){
    $routeProvider
      .when('/youtube-subscribers', {
          template: '<youtube-subscribers></youtube-subscribers>'
      });
}
youtubeSubscriberRoutes.$inject = ['$routeProvider'];

angular.module('social')
  .config(youtubeSubscriberRoutes);
var statsIndex = {
  templateUrl: 'app/components/stats/stats-index/stats-index.html',
  controller: StatsIndexController,
  bindings: {
    stats: '<'
  }
}

angular.module('stats')
  .component('statsIndex', statsIndex);
function StatsIndexController($scope) {
    var ctrl = this;

    ctrl.stats = {};

    ctrl.stats.series = ['Visitors', 'Page Views'];

    ctrl.stats.realtimeLabels = ['Mobile', 'Tablet', 'Desktop', 'Other']
    ctrl.stats.todayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
   
    ctrl.stats.realtime = [
        65, 59, 108, 23
    ];

    ctrl.stats.today = [
        [340, 543, 512, 543, 493, 444, 439]
    ];

    ctrl.stats.barOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };

    ctrl.stats.pieOptions = {
        legend: {
            display: true
        }
    };

}
StatsIndexController.$inject = ['$scope'];
angular.module('stats')
    .controller('StatsIndexController', StatsIndexController);
var userEdit = {
  templateUrl: 'app/components/user/user-edit/user-edit.html',
  controller: UserEditController,
  bindings: {
    user: '<'
  }
}

angular.module('user')
  .component('userEdit', userEdit);
function UserEditController(UserService, $log, $routeParams) {
  var ctrl = this;
  var id = $routeParams.id;

  ctrl.user = {};

  this.$onInit = function(){
    UserService.getUser(id)
      .then(function success(response){
        ctrl.user = response.data.user;
      });
  }

}

UserEditController.$inject = ['UserService', '$log', '$routeParams'];

angular.module('user')
  .controller('UserEditController', UserEditController);
var userIndex = {
  templateUrl: './app/components/user/user-index/user-index.html',
  controller: UserIndexController,
  bindings: {
    users: '<',
    pageSettings: '<'
  }
};

angular.module('user')
  .component('userIndex', userIndex);
function UserIndexController(UserService, $log) {
  var ctrl = this;

  ctrl.users = [];
  ctrl.pageSettings = [];

  this.$onInit = function() {
    UserService.getUsers()
      .then(function success(response){
        ctrl.users = response.data.users.data;
        $log.log(response.data.users.data);
        ctrl.pageSettings = response.data.users;
      });
  }

  ctrl.getNextPage = function() {
    UserService.getUsers(ctrl.pageSettings.current_page + 1)
      .then(function success(response){
        ctrl.users = response.data.users.data;
        ctrl.pageSettings = response.data.users;
      });
  }

  ctrl.getPrevPage = function() {
    UserService.getUsers(ctrl.pageSettings.current_page - 1)
      .then(function success(response){
        ctrl.users = response.data.users.data;
        ctrl.pageSettings = response.data.users;
      });
  }

};

UserIndexController.$inject = ['UserService', '$log'];

angular.module('user')
  .controller('UserIndexController', UserIndexController);
var userNew = {
  templateUrl: './app/components/user/user-new/user-new.html',
  controller: UserNewController,
  bindings: {
    user: '<'
  }
}

angular.module('user')
  .component('userNew', userNew);
function UserNewController(UserService){
  var ctrl = this;

  ctrl.newUser = function(user){
    UserService.newUser(user);
  };

};

UserNewController.$inject = ['UserService'];

angular.module('user')
  .controller('UserNewController', UserNewController);
var facebookWidget = {
  templateUrl: 'app/components/social/social-widgets/facebook-widget/facebook-widget.html'
}

angular.module('social')
  .component('facebookWidget', facebookWidget);
  
var twitterWidget = {
  templateUrl: 'app/components/social/social-widgets/twitter-widget/twitter-widget.html',
  controller: SocialTwitterController
}

angular.module('social')
  .component('twitterWidget', twitterWidget);
function SocialTwitterController(){
  var ctrl = this;
}

angular.module('social')
  .controller('SocialTwitterController', SocialTwitterController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGVzLmpzIiwiY29tbW9uL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQuanMiLCJjb21tb24vbG9hZGluZy9sb2FkaW5nLmNvbnRyb2xsZXIuanMiLCJjb21tb24vc2VydmljZXMvZmFjZWJvb2suc2VydmljZS5qcyIsImNvbW1vbi9zZXJ2aWNlcy9nb29nbGVQbHVzLnNlcnZpY2UuanMiLCJjb21tb24vc2VydmljZXMvdHdpdHRlci5zZXJ2aWNlLmpzIiwiY29tbW9uL3NlcnZpY2VzL3lvdXR1YmUuc2VydmljZS5qcyIsImNvbW1vbi90b3AtbmF2L3RvcC1uYXYuY29tcG9uZW50LmpzIiwiY29tbW9uL3RvcC1uYXYvdG9wLW5hdi5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUuc2VydmljZS5qcyIsImNvbXBvbmVudHMvYmxvZy9ibG9kLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvYmxvZy9ibG9nLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvYmxvZy9ibG9nLnNlcnZpY2UuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5tb2R1bGUuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS5tb2R1bGUuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2Uuc2VydmljZS5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUuanMiLCJjb21wb25lbnRzL2VtYWlsL2VtYWlsLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZW1haWwvZW1haWwucm91dGVzLmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwucm91dGVzLmpzIiwiY29tcG9uZW50cy9zdGF0cy9zdGF0cy5tb2R1bGUuanMiLCJjb21wb25lbnRzL3N0YXRzL3N0YXRzLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvdGFncy90YWcubW9kdWxlLmpzIiwiY29tcG9uZW50cy90YWdzL3RhZy5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXIubW9kdWxlLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXIucm91dGVzLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXIuc2VydmljZS5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1ob21lL2FydGljbGVzLWhvbWUuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWhvbWUvYXJ0aWNsZXMtaG9tZS5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWVkaXQvYXJ0aWNsZS1lZGl0LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1lZGl0L2FydGljbGUtZWRpdC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLW5ldy9hcnRpY2xlLW5ldy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtbmV3L2FydGljbGUtbmV3LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1lZGl0L2Jsb2ctZWRpdC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1lZGl0L2Jsb2ctZWRpdC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9ibG9nL2Jsb2ctaW5kZXgvYmxvZy1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1pbmRleC9ibG9nLWluZGV4LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1uZXcvYmxvZy1uZXcuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9ibG9nL2Jsb2ctbmV3L2Jsb2ctbmV3LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1pbmRleC9jb21tZW50LWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWluZGV4L2NvbW1lbnQtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLWVkaXQvY291cnNlLWVkaXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UtbmV3L2NvdXJzZS1uZXcuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1uZXcvY291cnNlLW5ldy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1zZWFyY2gvY291cnNlLXNlYXJjaC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLXNlYXJjaC9jb3Vyc2Utc2VhcmNoLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYWN0aW9ucy9kYXNoYm9hcmQtYWN0aW9ucy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYWN0aW9ucy9kYXNoYm9hcmQtYWN0aW9ucy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFuYWx5dGljcy9kYXNoYm9hcmQtYW5hbHl0aWNzLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFuYWx5dGljcy9kYXNoYm9hcmQtYW5hbHl0aWNzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuY29tcG9uZW50cy5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1ncm93dGgvZGFzaGJvYXJkLWdyb3d0aC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtZ3Jvd3RoL2Rhc2hib2FyZC1ncm93dGguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1vYXV0aC9kYXNoYm9hcmQtb2F1dGguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLW9hdXRoL2Rhc2hib2FyZC1vYXV0aC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZW1haWwvZW1haWwtZGFzaGJvYXJkL2VtYWlsLWRhc2hib2FyZC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2VtYWlsL2VtYWlsLWRhc2hib2FyZC9lbWFpbC1kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtaW5kZXgvc2V0dGluZ3MtaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1pbmRleC9zZXR0aW5ncy1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLWRhc2hib2FyZC9zb2NpYWwtZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC1kYXNoYm9hcmQvc29jaWFsLWRhc2hib2FyZC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc29jaWFsL3lvdXR1YmUtc3Vic2NyaWJlcnMveW91dHViZS1zdWJzY3JpYmVycy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMtaW5kZXgvc3RhdHMtaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zdGF0cy9zdGF0cy1pbmRleC9zdGF0cy1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLWluZGV4L3VzZXItaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItaW5kZXgvdXNlci1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItbmV3L3VzZXItbmV3LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLW5ldy91c2VyLW5ldy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvZmFjZWJvb2std2lkZ2V0L2ZhY2Vib29rLXdpZGdldC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy90d2l0dGVyLXdpZGdldC90d2l0dGVyLXdpZGdldC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy90d2l0dGVyLXdpZGdldC90d2l0dGVyLXdpZGdldC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FDQUE7QUNBQTtBQ0FBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQ0FBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFkbWluLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdyb290JywgW1xuICAgICduZ1JvdXRlJyxcbiAgICAnYXJ0aWNsZXMnLFxuICAgICdkYXNoYm9hcmQnLFxuICAgICd1c2VyJyxcbiAgICAnY29tbWVudCcsXG4gICAgJ2NvdXJzZXMnLFxuICAgICdzdGF0cycsXG4gICAgJ3NldHRpbmdzJyxcbiAgICAnc29jaWFsJyxcbiAgICAnYmxvZycsXG4gICAgJ3RhZ3MnLFxuICAgICdlbWFpbCdcbl0pO1xuIiwiZnVuY3Rpb24gcm91dGVQcm92aWRlcigkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGRhc2hib2FyZD48L2Rhc2hib2FyZD4nXG4gICAgICB9KTtcbn1cbnJvdXRlUHJvdmlkZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29uZmlnKHJvdXRlUHJvdmlkZXIpO1xuIiwidmFyIGxvYWRpbmcgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9jb21tb24vbG9hZGluZy9sb2FkaW5nLmh0bWwnLFxuICBjb250cm9sbGVyOiBMb2FkaW5nQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBpc0xvYWRpbmc6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2xvYWRpbmcnLCBsb2FkaW5nKTsiLCJmdW5jdGlvbiBMb2FkaW5nQ29udHJvbGxlcigpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignTG9hZGluZ0NvbnRyb2xsZXInLCBMb2FkaW5nQ29udHJvbGxlcik7IiwiIiwiIiwiIiwiIiwidmFyIHRvcE5hdiA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21tb24vdG9wLW5hdi90b3AtbmF2Lmh0bWwnLFxuICBjb250cm9sbGVyOiBUb3BOYXZDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHVzZXI6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCd0b3BOYXYnLCB0b3BOYXYpO1xuIiwiZnVuY3Rpb24gVG9wTmF2Q29udHJvbGxlcigpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignVG9wTmF2Q29udHJvbGxlcicsIFRvcE5hdkNvbnRyb2xsZXIpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJywgW10pOyIsImZ1bmN0aW9uIGFydGljbGVSb3V0ZVByb3ZpZGVyKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9hcnRpY2xlcycse1xuICAgICAgICB0ZW1wbGF0ZTogJzxhcnRpY2xlcy1ob21lPjwvYXJ0aWNsZXMtaG9tZT4nXG4gICAgICB9KVxuICAgICAgLndoZW4oJy9hcnRpY2xlL25ldycsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8YXJ0aWNsZS1uZXc+PC9hcnRpY2xlLW5ldz4nXG4gICAgICB9KVxuICAgICAgLndoZW4oJy9hcnRpY2xlL2VkaXQvOnNsdWcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGFydGljbGUtZWRpdD48L2FydGljbGUtZWRpdD4nXG4gICAgICB9KVxuICAgICAgLm90aGVyd2lzZSh7IFxuICAgICAgICB0ZW1wbGF0ZTogJzxoMT5Ob3QgRm91bmQ8L2gxPidcbiAgICAgIH0pO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJykuY29uZmlnKGFydGljbGVSb3V0ZVByb3ZpZGVyKTtcbmFydGljbGVSb3V0ZVByb3ZpZGVyLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG4iLCJmdW5jdGlvbiBBcnRpY2xlU2VydmljZSgkaHR0cCwgJGxvZywgQ1NSRl9UT0tFTikge1xuXG4gICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUNzcmYtVG9rZW4nXSA9IENTUkZfVE9LRU47XG5cbiAgZnVuY3Rpb24gbmV3QXJ0aWNsZShhcnRpY2xlKSB7XG4gICAgY29uc29sZS5sb2coYXJ0aWNsZSk7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnYXJ0aWNsZXM/dj0nICsgRGF0ZS5ub3coKSxcbiAgICAgIGRhdGE6IGFydGljbGVcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlYXJjaChwYWdlLCB0aXRsZSkge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJ2FwaS9sZXNzb25zP3BhZ2U9JyArIHBhZ2UgKyBcIiZ0aXRsZT1cIiArIHRpdGxlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVBcnRpY2xlKGFydGljbGUpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgdXJsOiAnYXJ0aWNsZXMvJyArIGFydGljbGUuc2x1ZyArIFwiP3Y9XCIgKyBEYXRlLm5vdygpLFxuICAgICAgZGF0YTogYXJ0aWNsZVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlQXJ0aWNsZShpZCkge1xuICAgICRsb2cubG9nKFwiUGxhY2Vob2xkZXIgZm9yIGRlbGV0aW5nIGFuIGFydGljbGVcIik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBcnRpY2xlKHNsdWcpIHtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KFwiYXBpL2xlc3Nvbi9cIiArIHNsdWcgKyBcIj92PVwiICsgRGF0ZS5ub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBcnRpY2xlcyhwYWdlKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KFwiYXBpL2xlc3NvbnM/cGFnZT1cIiArIHBhZ2UgKyBcIiZ2PVwiICsgRGF0ZS5ub3coKSk7XG4gIH1cblxuICB2YXIgc2VydmljZSA9IHtcbiAgICBuZXdBcnRpY2xlIDogbmV3QXJ0aWNsZSxcbiAgICB1cGRhdGVBcnRpY2xlIDogdXBkYXRlQXJ0aWNsZSxcbiAgICBkZWxldGVBcnRpY2xlIDogZGVsZXRlQXJ0aWNsZSxcbiAgICBnZXRBcnRpY2xlIDogZ2V0QXJ0aWNsZSxcbiAgICBzZWFyY2g6IHNlYXJjaCxcbiAgICBnZXRBcnRpY2xlczogZ2V0QXJ0aWNsZXNcbiAgfTtcblxuICByZXR1cm4gc2VydmljZTtcblxufVxuXG5BcnRpY2xlU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCcsICckbG9nJywgJ0NTUkZfVE9LRU4nXTsgIFxuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmZhY3RvcnkoJ0FydGljbGVTZXJ2aWNlJywgQXJ0aWNsZVNlcnZpY2UpOyIsImFuZ3VsYXIubW9kdWxlKCdibG9nJywgW10pOyIsImZ1bmN0aW9uIGJsb2dSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL2Jsb2cnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8YmxvZy1pbmRleD48L2Jsb2ctaW5kZXg+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvYmxvZy9uZXcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGJsb2ctbmV3PjwvYmxvZy1uZXc+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvYmxvZy9lZGl0LzppZCcsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8YmxvZy1lZGl0PjwvYmxvZy1lZGl0PidcbiAgICAgIH0pO1xufTtcblxuYmxvZ1JvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuYW5ndWxhci5tb2R1bGUoJ2Jsb2cnKS5jb25maWcoYmxvZ1JvdXRlcyk7XG4iLCJmdW5jdGlvbiBCbG9nU2VydmljZSgkaHR0cCwgJGxvZyl7XG4gICAgdmFyIHNlcnZpY2UgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZVBvc3Qoc2x1Zykge1xuICAgICAgICAkbG9nLmxvZyhcIkRlbGV0aW5nIGEgcG9zdCB3aXRoIHNsdWc6IFwiICsgc2x1Zyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUG9zdChwb3N0KSB7XG4gICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICBtZXRob2QgOiAnUEFUQ0gnLFxuICAgICAgICB1cmw6ICdwb3N0cy8nICsgcG9zdC5pZCArIFwiP3Y9XCIgKyBEYXRlLm5vdygpLFxuICAgICAgICBkYXRhIDogcG9zdFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV3UG9zdChwb3N0KSB7XG4gICAgICAkbG9nLmxvZyhwb3N0KTtcbiAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICdwb3N0cycsXG4gICAgICAgIGRhdGE6IHBvc3RcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlYXJjaChwYWdlLCB0aXRsZSkge1xuICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJ2FwaS9wb3N0cz9wYWdlPScgKyBwYWdlICsgJyZ0aXRsZT0nICsgdGl0bGVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBvc3QoaWQpIHtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoXCJhcGkvcG9zdHMvXCIgKyBpZCArIFwiJnY9XCIgKyBEYXRlLm5vdygpKTtcbiAgICB9XG4gIFxuXG4gICAgZnVuY3Rpb24gZ2V0UG9zdHMocGFnZSkge1xuICAgICAgcmV0dXJuICRodHRwLmdldChcImFwaS9wb3N0cz9wYWdlPVwiICsgcGFnZSArIFwiJnY9XCIgKyBEYXRlLm5vdygpKTtcbiAgICB9XG4gICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgIGRlbGV0ZVBvc3QgOiBkZWxldGVQb3N0LFxuICAgICAgICB1cGRhdGVQb3N0IDogdXBkYXRlUG9zdCxcbiAgICAgICAgbmV3UG9zdCA6IG5ld1Bvc3QsXG4gICAgICAgIHNlYXJjaCA6IHNlYXJjaCxcbiAgICAgICAgZ2V0UG9zdCA6IGdldFBvc3QsXG4gICAgICAgIGdldFBvc3RzIDogZ2V0UG9zdHNcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlcnZpY2U7XG59XG5CbG9nU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCcsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdibG9nJylcbiAgICAuZmFjdG9yeSgnQmxvZ1NlcnZpY2UnLCBCbG9nU2VydmljZSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnLCBbXSk7IiwiZnVuY3Rpb24gY29tbWVudFJvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvY29tbWVudHMnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8Y29tbWVudC1pbmRleD48L2NvbW1lbnQtaW5kZXg+J1xuICAgICAgfSk7XG59O1xuY29tbWVudFJvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnKS5jb25maWcoY29tbWVudFJvdXRlcyk7XG4iLCJmdW5jdGlvbiBDb21tZW50U2VydmljZSgkbG9nKXtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUNvbW1lbnQoY29tbWVudElkKSB7XG4gICAgICAgICRsb2cubG9nKFwiRGVsZXRpbmcgYSBjb21tZW50IHdpdGggaWQ6IFwiICsgY29tbWVudElkKTtcbiAgICB9XG5cbiAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgZGVsZXRlQ29tbWVudCA6IGRlbGV0ZUNvbW1lbnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlcnZpY2U7XG59XG5Db21tZW50U2VydmljZS4kaW5qZWN0ID0gWyckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdjb21tZW50JylcbiAgICAuZmFjdG9yeSgnQ29tbWVudFNlcnZpY2UnLCBDb21tZW50U2VydmljZSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnLCBbXSk7XG4iLCJmdW5jdGlvbiBjb3Vyc2VSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL2NvdXJzZXMnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8Y291cnNlLXNlYXJjaD48L2NvdXJzZS1zZWFyY2g+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvY291cnNlL25ldycsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8Y291cnNlLW5ldz48L2NvdXJzZS1uZXc+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvY291cnNlL2VkaXQvOnNsdWcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGNvdXJzZS1lZGl0PjwvY291cnNlLWVkaXQ+J1xuICAgICAgfSlcbn1cbmNvdXJzZVJvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuXG5hbmd1bGFyLm1vZHVsZSgnY291cnNlcycpXG4gIC5jb25maWcoY291cnNlUm91dGVzKTtcbiIsImZ1bmN0aW9uIENvdXJzZVNlcnZpY2UoJGh0dHAsICRsb2csIENTUkZfVE9LRU4pIHtcblxuICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1Dc3JmLVRva2VuJ10gPSBDU1JGX1RPS0VOO1xuXG4gIGZ1bmN0aW9uIG5ld0NvdXJzZShjb3Vyc2UpIHtcbiAgICBjb25zb2xlLmxvZyhjb3Vyc2UpO1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJ2NvdXJzZXM/dj0nICsgRGF0ZS5ub3coKSxcbiAgICAgIGRhdGE6IGNvdXJzZVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q291cnNlKHNsdWcpIHtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KFwiYXBpL2NvdXJzZS9cIiArIHNsdWcgKyBcIj92PVwiICsgRGF0ZS5ub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb3Vyc2VzKHBhZ2Upe1xuICAgIHJldHVybiAkaHR0cC5nZXQoXCJhcGkvY291cnNlcz9wYWdlPVwiICsgcGFnZSArIFwiJnY9XCIgKyBEYXRlLm5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlYXJjaChwYWdlLCB0aXRsZSkge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJ2FwaS9sZXNzb25zP3BhZ2U9JyArIHBhZ2UgKyBcIiZ0aXRsZT1cIiArIHRpdGxlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDb3Vyc2UoY291cnNlKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHVybDogJ2NvdXJzZXMvJyArIGNvdXJzZS5zbHVnICsgXCI/dj1cIiArIERhdGUubm93KCksXG4gICAgICBkYXRhOiBjb3Vyc2VcbiAgICB9KTtcbiAgfVxuICBcblxuICB2YXIgc2VydmljZSA9IHtcbiAgICB1cGRhdGVDb3Vyc2UgOiB1cGRhdGVDb3Vyc2UsXG4gICAgZ2V0Q291cnNlIDogZ2V0Q291cnNlLFxuICAgIG5ld0NvdXJzZSA6IG5ld0NvdXJzZSxcbiAgICBzZWFyY2ggOiBzZWFyY2gsXG4gICAgZ2V0Q291cnNlcyA6IGdldENvdXJzZXNcbiAgfTtcblxuICByZXR1cm4gc2VydmljZTtcbn1cblxuQ291cnNlU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCcsICckbG9nJywgJ0NTUkZfVE9LRU4nXTsgIFxuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuZmFjdG9yeSgnQ291cnNlU2VydmljZScsIENvdXJzZVNlcnZpY2UpOyIsInZhciBkYXNoYm9hcmQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRDb250cm9sbGVyXG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZCcsIGRhc2hib2FyZCk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQ29udHJvbGxlcigpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkQ29udHJvbGxlcicsIERhc2hib2FyZENvbnRyb2xsZXIpOyIsImFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnLCBbJ2NoYXJ0LmpzJ10pOyIsImFuZ3VsYXIubW9kdWxlKCdlbWFpbCcsIFtdKTtcbiIsImZ1bmN0aW9uIGVtYWlsUm91dGVQcm92aWRlcigkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvZW1haWwnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8ZW1haWwtZGFzaGJvYXJkPjwvZW1haWwtZGFzaGJvYXJkPidcbiAgICAgIH0pO1xufVxuZW1haWxSb3V0ZVByb3ZpZGVyLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdlbWFpbCcpXG4gIC5jb25maWcoZW1haWxSb3V0ZVByb3ZpZGVyKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdzZXR0aW5ncycsW10pOyIsImZ1bmN0aW9uIHNldHRpbmdzUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9zZXR0aW5ncycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxzZXR0aW5ncy1pbmRleD48L3NldHRpbmdzLWluZGV4PidcbiAgICAgIH0pO1xufVxuc2V0dGluZ3NSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuXG5hbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnKVxuICAuY29uZmlnKHNldHRpbmdzUm91dGVzKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnLCBbXSk7IiwiZnVuY3Rpb24gc29jaWFsUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9zb2NpYWwnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8c29jaWFsLWRhc2hib2FyZD48L3NvY2lhbC1kYXNoYm9hcmQ+J1xuICAgICAgfSk7XG59XG5zb2NpYWxSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb25maWcoc29jaWFsUm91dGVzKTtcbiAgIiwiYW5ndWxhci5tb2R1bGUoJ3N0YXRzJywgWydjaGFydC5qcyddKTsiLCJmdW5jdGlvbiBzdGF0c1JvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvc3RhdHMnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8c3RhdHMtaW5kZXg+PC9zdGF0cy1pbmRleD4nXG4gICAgICB9KTtcbn07XG5cbnN0YXRzUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5hbmd1bGFyLm1vZHVsZSgnc3RhdHMnKS5jb25maWcoc3RhdHNSb3V0ZXMpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ3RhZ3MnLCBbXSk7IiwiZnVuY3Rpb24gVGFnU2VydmljZSgkaHR0cCwgJGxvZykge1xuXG4gIGZ1bmN0aW9uIGdldFRhZ3MoKSB7XG4gICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3RhZ3MnKTtcbiAgfVxuXG4gIHZhciBzZXJ2aWNlID0ge1xuICAgIGdldFRhZ3MgOiBnZXRUYWdzXG4gIH07XG5cbiAgcmV0dXJuIHNlcnZpY2U7XG5cbn1cblxuVGFnU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCcsICckbG9nJ107ICBcblxuYW5ndWxhclxuICAubW9kdWxlKCd0YWdzJylcbiAgLmZhY3RvcnkoJ1RhZ1NlcnZpY2UnLCBUYWdTZXJ2aWNlKTsiLCJhbmd1bGFyLm1vZHVsZSgndXNlcicsIFtdKTsiLCJmdW5jdGlvbiB1c2VyUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy91c2VycycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzx1c2VyLWluZGV4PjwvdXNlci1pbmRleD4nXG4gICAgICB9KVxuICAgICAgLndoZW4oJy91c2VyL2VkaXQvOmlkJywge1xuICAgICAgICB0ZW1wbGF0ZTogJzx1c2VyLWVkaXQ+PC91c2VyLWVkaXQ+JyAgXG4gICAgICB9KVxuICAgICAgLndoZW4oJy91c2VyL25ldycsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8dXNlci1uZXc+PC91c2VyLW5ldz4nXG4gICAgICB9KTtcbn07XG5cbnVzZXJSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmFuZ3VsYXIubW9kdWxlKCd1c2VyJykuY29uZmlnKHVzZXJSb3V0ZXMpO1xuIiwiZnVuY3Rpb24gVXNlclNlcnZpY2UoJGxvZywgJGh0dHApIHtcblxuICAgIGZ1bmN0aW9uIG5ld1VzZXIodXNlcikge1xuICAgICAgICAkbG9nLmxvZyhcIkFkZGluZyBOZXcgVXNlclwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVc2VyKGlkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS91c2VyLycgKyBpZCArIFwiP3Y9XCIgKyBEYXRlLm5vdygpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVc2VycyhwYWdlKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS91c2Vycz9wYWdlPScgKyBwYWdlICsgXCI/dj1cIiArIERhdGUubm93KCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEdyb3d0aCgpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXJzL2dyb3d0aCcgKyBcIj92PVwiICsgRGF0ZS5ub3coKSk7XG4gICAgfVxuXG4gICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgIG5ld1VzZXI6IG5ld1VzZXIsXG4gICAgICAgIGdldFVzZXI6IGdldFVzZXIsXG4gICAgICAgIGdldFVzZXJzOiBnZXRVc2VycyxcbiAgICAgICAgZ2V0R3Jvd3RoOiBnZXRHcm93dGhcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlcnZpY2U7XG59O1xuXG5Vc2VyU2VydmljZS4kaW5qZWN0ID0gWyckbG9nJywgJyRodHRwJ107XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgICAuZmFjdG9yeSgnVXNlclNlcnZpY2UnLCBVc2VyU2VydmljZSk7IiwidmFyIGFydGljbGVzSG9tZSA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtaG9tZS9hcnRpY2xlcy1ob21lLmh0bWwnLFxuICBjb250cm9sbGVyOiBBcnRpY2xlc0hvbWVDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGVzOiAnPCcsXG4gICAgcGFnZVNldHRpbmdzOiAnPCcsXG4gICAgdGl0bGU6ICc9PydcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbXBvbmVudCgnYXJ0aWNsZXNIb21lJywgYXJ0aWNsZXNIb21lKTsiLCJmdW5jdGlvbiBBcnRpY2xlc0hvbWVDb250cm9sbGVyKEFydGljbGVTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmFydGljbGVzID0gW107XG5cbiAgY3RybC5wYWdlID0gMTtcbiAgY3RybC5wYWdlU2V0dGluZ3MgPSBbXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpe1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zO1xuICAgICAgfSk7XG4gICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgUmV0cmlldmVkIGxlc3NvbnM6IFwiICsgY3RybC5hcnRpY2xlcyk7ICBcbiAgfVxuXG4gIGN0cmwuZ2V0UGFnZXMgPSBmdW5jdGlvbihudW1iZXIpIHtcbiAgICBpZihudW1iZXIgPT0gdW5kZWZpbmVkKXtcbiAgICAgIG51bWJlciA9IDE7XG4gICAgfVxuICAgIHZhciB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKG51bWJlciAvIDEwKTtcbiAgICByZXR1cm4gbmV3IEFycmF5KHRvdGFsUGFnZXMpO1xuICB9O1xuXG4gIGN0cmwuc2VhcmNoID0gZnVuY3Rpb24oKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2Uuc2VhcmNoKGN0cmwucGFnZSwgY3RybC50aXRsZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zO1xuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLnNldFBhZ2UgPSBmdW5jdGlvbihwYWdlKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZXMocGFnZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zO1xuICAgICAgfSk7XG4gIH07XG5cbiAgY3RybC5nZXROZXh0UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSArIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucztcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5nZXRQcmV2UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSAtIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucztcbiAgICAgIH0pO1xuICB9XG5cblxufTtcblxuQXJ0aWNsZXNIb21lQ29udHJvbGxlci4kaW5qZWN0ID0gWydBcnRpY2xlU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb250cm9sbGVyKCdBcnRpY2xlc0hvbWVDb250cm9sbGVyJywgQXJ0aWNsZXNIb21lQ29udHJvbGxlcik7IiwidmFyIGFydGljbGVFZGl0ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1lZGl0L2FydGljbGUtZWRpdC5odG1sJyxcbiAgY29udHJvbGxlcjogQXJ0aWNsZUVkaXRDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGU6ICc8JyxcbiAgICB0YWdzOiAnPCcsXG4gICAgY291cnNlczogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbXBvbmVudCgnYXJ0aWNsZUVkaXQnLCBhcnRpY2xlRWRpdCk7IiwiZnVuY3Rpb24gQXJ0aWNsZUVkaXRDb250cm9sbGVyKCRsb2csIEFydGljbGVTZXJ2aWNlLCAkcm91dGVQYXJhbXMsIFRhZ1NlcnZpY2UsIENvdXJzZVNlcnZpY2UsICRxLCAkdGltZW91dCkge1xuICB2YXIgY3RybCA9IHRoaXM7XG4gIHZhciBzbHVnID0gJHJvdXRlUGFyYW1zLnNsdWc7XG4gIGN0cmwuYXJ0aWNsZSA9IHt9O1xuICBjdHJsLnRhZ3MgPSBbXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBBcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlKHNsdWcpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlID0gcmVzcG9uc2UuZGF0YS5sZXNzb247XG4gICAgICAgIHJldHVybiBUYWdTZXJ2aWNlLmdldFRhZ3MoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC50YWdzID0gcmVzcG9uc2UuZGF0YS50YWdzLmRhdGE7XG4gICAgICAgIHJldHVybiBDb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5jb3Vyc2VzID0gcmVzcG9uc2UuZGF0YS5jb3Vyc2VzLmRhdGE7XG4gICAgICAgICRsb2cubG9nKFwiQ29tcGxldGVkIExvYWRpbmdcIik7XG4gICAgICB9KVxuICB9O1xuICBcbiAgY3RybC5zYXZlID0gZnVuY3Rpb24oYXJ0aWNsZSkge1xuICAgICRsb2cubG9nKFwiU2F2ZSBhbnkgdXBkYXRlcyB0byB0aGUgYXJ0aWNsZVwiKTtcbiAgICBBcnRpY2xlU2VydmljZS51cGRhdGVBcnRpY2xlKGFydGljbGUpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgU2F2ZWQgQXJ0aWNsZVwiKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSwgZnVuY3Rpb24gZXJyb3IocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhcIkZhaWxlZCB0byBzYXZlIGFydGljbGVcIik7XG4gICAgICB9KTtcbiAgfTtcblxufTtcblxuQXJ0aWNsZUVkaXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnLCAnQXJ0aWNsZVNlcnZpY2UnLCAnJHJvdXRlUGFyYW1zJywgJ1RhZ1NlcnZpY2UnLCAnQ291cnNlU2VydmljZScsICckcScsICckdGltZW91dCddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29udHJvbGxlcignQXJ0aWNsZUVkaXRDb250cm9sbGVyJywgQXJ0aWNsZUVkaXRDb250cm9sbGVyKTtcbiIsInZhciBhcnRpY2xlTmV3ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1uZXcvYXJ0aWNsZS1uZXcuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IEFydGljbGVOZXdDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGU6ICc8JyxcbiAgICB0YWdzOiAnPCcsXG4gICAgZXJyb3I6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29tcG9uZW50KCdhcnRpY2xlTmV3JywgYXJ0aWNsZU5ldyk7IiwiZnVuY3Rpb24gQXJ0aWNsZU5ld0NvbnRyb2xsZXIoQXJ0aWNsZVNlcnZpY2UsIENvdXJzZVNlcnZpY2UsICRsb2csIFRhZ1NlcnZpY2UsICRsb2NhdGlvbikge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5hcnRpY2xlID0ge307XG4gIGN0cmwuY291cnNlcyA9IFtdO1xuICBjdHJsLnRhZ3MgPSBbXTtcblxuICBjdHJsLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBDb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSkge1xuICAgICAgICBjdHJsLmNvdXJzZXMgPSByZXNwb25zZS5kYXRhLmNvdXJzZXMuZGF0YTtcbiAgICAgICAgcmV0dXJuIFRhZ1NlcnZpY2UuZ2V0VGFncygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnRhZ3MgPSByZXNwb25zZS5kYXRhLnRhZ3MuZGF0YTtcbiAgICAgICAgJGxvZy5sb2coXCJGaW5pc2hlZCBsb2FkaW5nXCIpOyAgICAgIFxuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLnNhdmUgPSBmdW5jdGlvbihhcnRpY2xlKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UubmV3QXJ0aWNsZShhcnRpY2xlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IFNhdmVkIEFydGljbGVcIik7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKFwiYXJ0aWNsZS9lZGl0L1wiICsgYXJ0aWNsZS5zbHVnKTtcbiAgICAgIH0sIGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJFcnJvcjogXCIgKyByZXNwb25zZSk7XG4gICAgICAgIGN0cmwuZXJyb3IgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuICB9OyAgXG5cbn07XG5cbkFydGljbGVOZXdDb250cm9sbGVyLiRpbmplY3QgPSBbJ0FydGljbGVTZXJ2aWNlJywgJ0NvdXJzZVNlcnZpY2UnLCAnJGxvZycsICdUYWdTZXJ2aWNlJywgJyRsb2NhdGlvbiddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29udHJvbGxlcignQXJ0aWNsZU5ld0NvbnRyb2xsZXInLCBBcnRpY2xlTmV3Q29udHJvbGxlcik7IiwidmFyIGJsb2dFZGl0ID0ge1xuICB0ZW1wbGF0ZVVybDogXCIuL2FwcC9jb21wb25lbnRzL2Jsb2cvYmxvZy1lZGl0L2Jsb2ctZWRpdC5odG1sXCIsXG4gIGNvbnRyb2xsZXI6IEJsb2dFZGl0Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBwb3N0OiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnYmxvZycpXG4gIC5jb21wb25lbnQoJ2Jsb2dFZGl0JywgYmxvZ0VkaXQpOyIsImZ1bmN0aW9uIEJsb2dFZGl0Q29udHJvbGxlcihCbG9nU2VydmljZSwgJGxvZywgJHJvdXRlUGFyYW1zKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbiAgY3RybC5hcnRpY2xlID0ge307XG4gIHZhciBpZCA9ICRyb3V0ZVBhcmFtcy5pZDtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBCbG9nU2VydmljZS5nZXRQb3N0KGlkKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwucG9zdCA9IHJlc3BvbnNlLmRhdGEucG9zdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5zYXZlID0gZnVuY3Rpb24ocG9zdCkge1xuICAgIEJsb2dTZXJ2aWNlLnVwZGF0ZVBvc3QocG9zdClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9KTtcbiAgfVxuXG59XG5cbkJsb2dFZGl0Q29udHJvbGxlci4kaW5qZWN0ID0gWydCbG9nU2VydmljZScsICckbG9nJywgJyRyb3V0ZVBhcmFtcyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYmxvZycpXG4gIC5jb250cm9sbGVyKCdCbG9nRWRpdENvbnRyb2xsZXInLCBCbG9nRWRpdENvbnRyb2xsZXIpOyIsInZhciBibG9nSW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9ibG9nL2Jsb2ctaW5kZXgvYmxvZy1pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogQmxvZ0luZGV4Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBwb3N0czogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Jsb2cnKVxuICAuY29tcG9uZW50KCdibG9nSW5kZXgnLCBibG9nSW5kZXgpOyIsImZ1bmN0aW9uIEJsb2dJbmRleENvbnRyb2xsZXIoQmxvZ1NlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuYXJ0aWNsZXMgPSBbXTtcblxuICBjdHJsLnBhZ2UgPSAxO1xuICBjdHJsLnBhZ2VTZXR0aW5ncyA9IFtdO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIEJsb2dTZXJ2aWNlLmdldFBvc3RzKGN0cmwucGFnZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnBvc3RzID0gcmVzcG9uc2UuZGF0YS5wb3N0cy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucztcbiAgICAgIH0pO1xuICAgICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgcmV0cmlldmVkIHBvc3RzOiBcIiArIGN0cmwucG9zdHMpO1xuICB9XG5cbiAgY3RybC5nZXROZXh0UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSArIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEucG9zdHMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLnBvc3RzO1xuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLmdldFByZXZQYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZXMoY3RybC5wYWdlU2V0dGluZ3MuY3VycmVudF9wYWdlIC0gMSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5wb3N0cy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEucG9zdHM7XG4gICAgICB9KTtcbiAgfVxuXG59XG5cbkJsb2dJbmRleENvbnRyb2xsZXIuJGluamVjdCA9IFsnQmxvZ1NlcnZpY2UnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYmxvZycpXG4gIC5jb250cm9sbGVyKCdCbG9nSW5kZXhDb250cm9sbGVyJywgQmxvZ0luZGV4Q29udHJvbGxlcik7IiwidmFyIGJsb2dOZXcgPSB7XG4gIHRlbXBsYXRlVXJsOiBcIi4vYXBwL2NvbXBvbmVudHMvYmxvZy9ibG9nLW5ldy9ibG9nLW5ldy5odG1sXCIsXG4gIGNvbnRyb2xsZXI6IEJsb2dOZXdDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHBvc3Q6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdibG9nJylcbiAgLmNvbXBvbmVudCgnYmxvZ05ldycsIGJsb2dOZXcpOyIsImZ1bmN0aW9uIEJsb2dOZXdDb250cm9sbGVyKEJsb2dTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLnNhdmUgPSBmdW5jdGlvbihwb3N0KSB7XG4gICAgQmxvZ1NlcnZpY2UubmV3UG9zdChwb3N0KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IHNhdmVkIG5ldyBwb3N0XCIpO1xuICAgICAgICAkbG9jYXRpb24ucGF0aChcImJsb2dzL2VkaXQvXCIgKyBwb3N0LnNsdWcpO1xuICAgICAgfSwgZnVuY3Rpb24gZXJyb3IocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhcIkVycm9yOlwiICsgcmVzcG9uc2UpO1xuICAgICAgICBjdHJsLmVycm9yID0gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgfTtcblxufVxuXG5CbG9nTmV3Q29udHJvbGxlci4kaW5qZWN0ID0gWydCbG9nU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdibG9nJylcbiAgLmNvbnRyb2xsZXIoJ0Jsb2dOZXdDb250cm9sbGVyJywgQmxvZ05ld0NvbnRyb2xsZXIpOyIsInZhciBjb21tZW50SW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtaW5kZXgvY29tbWVudC1pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogQ29tbWVudEluZGV4Q29udHJvbGxlclxuICBcbn1cblxuYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnKVxuICAuY29tcG9uZW50KCdjb21tZW50SW5kZXgnLCBjb21tZW50SW5kZXgpOyIsImZ1bmN0aW9uIENvbW1lbnRJbmRleENvbnRyb2xsZXIoQ29tbWVudFNlcnZpY2Upe1xuICAgIHZhciBjdHJsID0gdGhpcztcblxuICAgIGN0cmwuZGVsZXRlQ29tbWVudCA9IGZ1bmN0aW9uKGNvbW1lbnRJZCl7XG4gICAgICAgIENvbW1lbnRTZXJ2aWNlLmRlbGV0ZUNvbW1lbnQoY29tbWVudElkKTtcbiAgICB9XG59XG5cbkNvbW1lbnRJbmRleENvbnRyb2xsZXIuJGluamVjdCA9IFsnQ29tbWVudFNlcnZpY2UnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnKVxuICAgIC5jb250cm9sbGVyKCdDb21tZW50SW5kZXhDb250cm9sbGVyJywgQ29tbWVudEluZGV4Q29udHJvbGxlcik7IiwidmFyIGNvdXJzZUVkaXQgPSB7XG4gIHRlbXBsYXRlVXJsIDogJy4vYXBwL2NvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5odG1sJyxcbiAgY29udHJvbGxlcjogQ291cnNlRWRpdENvbnRyb2xsZXIsIFxuICBiaW5kaW5ncyA6IHtcbiAgICBjb3Vyc2U6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmNvbXBvbmVudCgnY291cnNlRWRpdCcsIGNvdXJzZUVkaXQpO1xuICAiLCJmdW5jdGlvbiBDb3Vyc2VFZGl0Q29udHJvbGxlcihDb3Vyc2VTZXJ2aWNlLCAkbG9nLCAkcm91dGVQYXJhbXMpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuICBcbiAgdmFyIHNsdWcgPSAkcm91dGVQYXJhbXMuc2x1ZztcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBDb3Vyc2VTZXJ2aWNlLmdldENvdXJzZShzbHVnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuY291cnNlID0gcmVzcG9uc2UuZGF0YS5jb3Vyc2U7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKGNvdXJzZSkge1xuICAgIENvdXJzZVNlcnZpY2UudXBkYXRlQ291cnNlKGNvdXJzZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IFNhdmVkXCIpO1xuICAgICAgfSk7XG4gIH1cblxufVxuXG5Db3Vyc2VFZGl0Q29udHJvbGxlci4kaW5qZWN0ID0gWydDb3Vyc2VTZXJ2aWNlJywgJyRsb2cnLCAnJHJvdXRlUGFyYW1zJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmNvbnRyb2xsZXIoJ0NvdXJzZUVkaXRDb250cm9sbGVyJywgQ291cnNlRWRpdENvbnRyb2xsZXIpOyIsInZhciBjb3Vyc2VOZXcgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1uZXcvY291cnNlLW5ldy5odG1sJyxcbiAgY29udHJvbGxlcjogQ291cnNlTmV3Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBjb3Vyc2UgOiAnPT8nXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29tcG9uZW50KCdjb3Vyc2VOZXcnLCBjb3Vyc2VOZXcpO1xuICAiLCJmdW5jdGlvbiBDb3Vyc2VOZXdDb250cm9sbGVyKENvdXJzZVNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKGNvdXJzZSkge1xuICAgIENvdXJzZVNlcnZpY2UubmV3Q291cnNlKGNvdXJzZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhcIlN1Y2Nlc3NmdWxseSBTYXZlZCBDb3Vyc2VcIik7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKFwiY291cnNlL2VkaXQvXCIgKyBjb3Vyc2Uuc2x1Zyk7XG4gICAgICB9LCBmdW5jdGlvbiBlcnJvcihyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiRXJyb3I6IFwiICsgcmVzcG9uc2UpO1xuICAgICAgICBjdHJsLmVycm9yID0gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgfVxuXG59XG5cbkNvdXJzZU5ld0NvbnRyb2xsZXIuJGluamVjdCA9IFsnQ291cnNlU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmNvbnRyb2xsZXIoJ0NvdXJzZU5ld0NvbnRyb2xsZXInLCBDb3Vyc2VOZXdDb250cm9sbGVyKTsiLCJ2YXIgY291cnNlU2VhcmNoID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY291cnNlcy9jb3Vyc2Utc2VhcmNoL2NvdXJzZS1zZWFyY2guaHRtbCcsXG4gIGNvbnRyb2xsZXI6IENvdXJzZVNlYXJjaENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgY291cnNlczogJzwnLFxuICAgIHBhZ2VTZXR0aW5nczogJzwnLFxuICAgIHRpdGxlOiAnPT8nXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29tcG9uZW50KCdjb3Vyc2VTZWFyY2gnLCBjb3Vyc2VTZWFyY2gpOyIsImZ1bmN0aW9uIENvdXJzZVNlYXJjaENvbnRyb2xsZXIoQ291cnNlU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5jb3Vyc2VzID0gW107XG5cbiAgY3RybC5wYWdlID0gMTtcbiAgY3RybC5wYWdlU2V0dGluZ3MgPSBbXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpe1xuICAgIENvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcyhjdHJsLnBhZ2UpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5jb3Vyc2VzID0gcmVzcG9uc2UuZGF0YS5jb3Vyc2VzLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5jb3Vyc2VzO1xuICAgICAgfSk7XG4gICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgUmV0cmlldmVkIGNvdXJzZXM6IFwiICsgY3RybC5jb3Vyc2VzKTsgIFxuICB9XG5cbn1cblxuQ291cnNlU2VhcmNoQ29udHJvbGxlci4kaW5qZWN0ID0gWydDb3Vyc2VTZXJ2aWNlJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29udHJvbGxlcignQ291cnNlU2VhcmNoQ29udHJvbGxlcicsIENvdXJzZVNlYXJjaENvbnRyb2xsZXIpOyIsInZhciBkYXNoYm9hcmRBY3Rpb25zID0ge1xuICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hY3Rpb25zL2Rhc2hib2FyZC1hY3Rpb25zLmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6IERhc2hib2FyZEFjdGlvbkNvbnRyb2xsZXJcbiAgICBcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb21wb25lbnQoJ2Rhc2hib2FyZEFjdGlvbnMnLCBkYXNoYm9hcmRBY3Rpb25zKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRBY3Rpb25Db250cm9sbGVyKCl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgICAuY29udHJvbGxlcignRGFzaGJvYXJkQWN0aW9uQ29udHJvbGxlcicsIERhc2hib2FyZEFjdGlvbkNvbnRyb2xsZXIpOyIsInZhciBkYXNoYm9hcmRBbmFseXRpY3MgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFuYWx5dGljcy9kYXNoYm9hcmQtYW5hbHl0aWNzLmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHNlcmllczogJzwnLFxuICAgIGxhYmVsczogJzwnLFxuICAgIGRhdGE6ICc8JyxcbiAgICBvcHRpb25zOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCdkYXNoYm9hcmRBbmFseXRpY3MnLCBkYXNoYm9hcmRBbmFseXRpY3MpOyIsImZ1bmN0aW9uIERhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXIoJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5sYWJlbHMgPSBbJzIwMDYnLCAnMjAwNycsICcyMDA4JywgJzIwMDknLCAnMjAxMCcsICcyMDExJywgJzIwMTInXTtcbiAgY3RybC5zZXJpZXMgPSBbJ1Zpc2l0b3JzJywgJ1BhZ2UgVmlld3MnXTtcblxuICBjdHJsLmRhdGEgPSBbXG4gICAgWzY1LCA1OSwgODAsIDgxLCA1NiwgNTUsIDQwXSxcbiAgICBbMjgsIDQ4LCA0MCwgMTksIDg2LCAyNywgOTBdXG4gIF07XG5cbiAgY3RybC5vcHRpb25zID0ge1xuICAgIHNjYWxlczoge1xuICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgfTtcblxuICBjdHJsLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAkbG9nLmxvZyhcIlRoaXMgd2lsbCBwZXJmb3JtIHRoZSBSRVNUIEFQSSBjYWxsIHRvIGdvb2dsZSBhbmFseXRpY3Mgb24gcGFnZSBsb2FkXCIpO1xuICB9O1xuXG59O1xuXG5EYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlcicsIERhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXIpOyIsIiIsInZhciBkYXNoYm9hcmRDb21tZW50cyA9IHtcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtY29tbWVudHMvZGFzaGJvYXJkLWNvbW1lbnRzLmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6IERhc2hib2FyZENvbW1lbnRzQ29udHJvbGxlcixcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBjb21tZW50czogJzwnXG4gICAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgICAuY29tcG9uZW50KCdkYXNoYm9hcmRDb21tZW50cycsIGRhc2hib2FyZENvbW1lbnRzKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXIoJHNjb3BlKXtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG59XG5cbkRhc2hib2FyZENvbW1lbnRzQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gICAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZENvbW1lbnRzQ29udHJvbGxlcicsIERhc2hib2FyZENvbW1lbnRzQ29udHJvbGxlcik7IiwidmFyIGRhc2hib2FyZEdyb3d0aCA9IHtcbiAgdGVtcGxhdGVVcmwgOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWdyb3d0aC9kYXNoYm9hcmQtZ3Jvd3RoLmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRHcm93dGhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHRvdGFsIDogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZEdyb3d0aCcsIGRhc2hib2FyZEdyb3d0aCk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkR3Jvd3RoQ29udHJvbGxlcihVc2VyU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UuZ2V0VXNlcnMoKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgY3RybC50b3RhbCA9IHJlc3BvbnNlLmRhdGEudXNlcnMudG90YWw7XG4gICAgICB9KTtcbiAgfTtcblxufVxuXG5EYXNoYm9hcmRHcm93dGhDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJywgICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkR3Jvd3RoQ29udHJvbGxlcicsIERhc2hib2FyZEdyb3d0aENvbnRyb2xsZXIpOyIsInZhciBkYXNoYm9hcmRPYXV0aCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtb2F1dGgvZGFzaGJvYXJkLW9hdXRoLmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRPYXV0aENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgY2xpZW50czogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZE9hdXRoJywgZGFzaGJvYXJkT2F1dGgpOyIsImZ1bmN0aW9uIERhc2hib2FyZE9hdXRoQ29udHJvbGxlcigkaHR0cCwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgJGh0dHAuZ2V0KCdvYXV0aC9jbGllbnRzJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2cocmVzcG9uc2UpO1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbkRhc2hib2FyZE9hdXRoQ29udHJvbGxlci4kaW5qZWN0ID0gWyckaHR0cCcsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkT2F1dGhDb250cm9sbGVyJywgRGFzaGJvYXJkT2F1dGhDb250cm9sbGVyKTsiLCJ2YXIgZGFzaGJvYXJkVXNlcnMgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5odG1sJyxcbiAgY29udHJvbGxlcjogRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHNlcmllczogJzwnLFxuICAgIGxhYmVsczogJzwnLFxuICAgIGRhdGE6ICc8JyxcbiAgICBvcHRpb25zOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCdkYXNoYm9hcmRVc2VycycsIGRhc2hib2FyZFVzZXJzKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXIoVXNlclNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwubGFiZWxzID0gWyctNCBXZWVrJywgJy0zIFdlZWsnLCAnLTIgV2VlaycsICctMSBXZWVrJ107XG4gIGN0cmwuc2VyaWVzID0gWydOZXcgVXNlcnMnXTtcblxuICBjdHJsLm9wdGlvbnMgPSB7XG4gICAgc2NhbGVzOiB7XG4gICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzp0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICB9O1xuXG4gIGN0cmwuZGF0YSA9IFtcbiAgICBbNiwgMywgNCwgMl1cbiAgXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBVc2VyU2VydmljZS5nZXRHcm93dGgoKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKGN0cmwuZGF0YSk7XG4gICAgICAgIGN0cmwuZGF0YVswXSA9IHJlc3BvbnNlLmRhdGEuZ3Jvd3RoO1xuICAgICAgICAkbG9nLmxvZyhjdHJsLmRhdGEpO1xuICAgICAgfSk7XG4gIH07XG5cbn07XG5cbkRhc2hib2FyZFVzZXJzQ29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyJywgRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyKTsiLCIiLCJ2YXIgZW1haWxEYXNoYm9hcmQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9lbWFpbC9lbWFpbC1kYXNoYm9hcmQvZW1haWwtZGFzaGJvYXJkLmh0bWwnLFxuICBjb250cm9sbGVyOiBFbWFpbERhc2hib2FyZENvbnRyb2xsZXJcbn1cblxuYW5ndWxhci5tb2R1bGUoJ2VtYWlsJylcbiAgLmNvbXBvbmVudCgnZW1haWxEYXNoYm9hcmQnLCBlbWFpbERhc2hib2FyZCk7IiwiZnVuY3Rpb24gRW1haWxEYXNoYm9hcmRDb250cm9sbGVyKCRsb2cpe1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgJGxvZy5sb2coXCJFbWFpbCBDb250cm9sbGVyIEluaXRpYWxpemVkXCIpO1xuICB9XG5cbn1cblxuRW1haWxEYXNoYm9hcmRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2VtYWlsJylcbiAgLmNvbnRyb2xsZXIoJ0VtYWlsRGFzaGJvYXJkQ29udHJvbGxlcicsIEVtYWlsRGFzaGJvYXJkQ29udHJvbGxlcik7IiwidmFyIHNldHRpbmdzSW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtaW5kZXgvc2V0dGluZ3MtaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFNldHRpbmdzSW5kZXhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHNldHRpbmdzOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbXBvbmVudCgnc2V0dGluZ3NJbmRleCcsIHNldHRpbmdzSW5kZXgpOyIsImZ1bmN0aW9uIFNldHRpbmdzSW5kZXhDb250cm9sbGVyKCl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLnNldHRpbmdzID0ge1xuICAgIHRhZ2xpbmU6IFwiSGlnaCBRdWFsaXR5IFByb2dyYW1taW5nIFR1dG9yaWFsc1wiLFxuICAgIHNpdGVVcmw6IFwiaHR0cHM6Ly90dXRvcmlhbGVkZ2UubmV0XCIsXG4gICAgYWRtaW5FbWFpbDogXCJhZG1pbkB0dXRvcmlhbGVkZ2UubmV0XCIsXG4gICAgbWV0YTogXCJ8IFR1dG9yaWFsZWRnZS5uZXRcIlxuICB9XG5cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbnRyb2xsZXIoJ1NldHRpbmdzSW5kZXhDb250cm9sbGVyJywgU2V0dGluZ3NJbmRleENvbnRyb2xsZXIpOyIsInZhciBzb2NpYWxEYXNoYm9hcmQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc29jaWFsL3NvY2lhbC1kYXNoYm9hcmQvc29jaWFsLWRhc2hib2FyZC5odG1sJyxcbiAgY29udHJvbGxlcjogU29jaWFsRGFzaGJvYXJkQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzb2NpYWxEYXNoYm9hcmQ6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29tcG9uZW50KCdzb2NpYWxEYXNoYm9hcmQnLCBzb2NpYWxEYXNoYm9hcmQpOyIsImZ1bmN0aW9uIFNvY2lhbERhc2hib2FyZENvbnRyb2xsZXIoJGxvZyl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAkbG9nLmxvZyhcIkhlbGxvIFdvcmxkXCIpO1xuICB9XG59XG5cblNvY2lhbERhc2hib2FyZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbnRyb2xsZXIoJ1NvY2lhbERhc2hib2FyZENvbnRyb2xsZXInLCBTb2NpYWxEYXNoYm9hcmRDb250cm9sbGVyKTsiLCJ2YXIgeW91dHViZVN1YnNjcmliZXJzID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NvY2lhbC95b3V0dWJlLXN1YnNjcmliZXJzL3lvdXR1YmUtc3Vic2NyaWJlcnMuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFlvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlciwgXG4gIGJpbmRpbmdzOiB7XG4gICAgeW91dHViZVN1YnNjcmliZXJzOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbXBvbmVudCgneW91dHViZVN1YnNjcmliZXJzJywgeW91dHViZVN1YnNjcmliZXJzKTsiLCJmdW5jdGlvbiBZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXIoKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwueW91dHViZVN1YnNjcmliZXJzID0gW3sgbmFtZTogJ2VsbGlvdCd9XTtcblxufVxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb250cm9sbGVyKCdZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXInLCBZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXIpOyIsImZ1bmN0aW9uIHlvdXR1YmVTdWJzY3JpYmVyUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy95b3V0dWJlLXN1YnNjcmliZXJzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHlvdXR1YmUtc3Vic2NyaWJlcnM+PC95b3V0dWJlLXN1YnNjcmliZXJzPidcbiAgICAgIH0pO1xufVxueW91dHViZVN1YnNjcmliZXJSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb25maWcoeW91dHViZVN1YnNjcmliZXJSb3V0ZXMpOyIsInZhciBzdGF0c0luZGV4ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3N0YXRzL3N0YXRzLWluZGV4L3N0YXRzLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBTdGF0c0luZGV4Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzdGF0czogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3N0YXRzJylcbiAgLmNvbXBvbmVudCgnc3RhdHNJbmRleCcsIHN0YXRzSW5kZXgpOyIsImZ1bmN0aW9uIFN0YXRzSW5kZXhDb250cm9sbGVyKCRzY29wZSkge1xuICAgIHZhciBjdHJsID0gdGhpcztcblxuICAgIGN0cmwuc3RhdHMgPSB7fTtcblxuICAgIGN0cmwuc3RhdHMuc2VyaWVzID0gWydWaXNpdG9ycycsICdQYWdlIFZpZXdzJ107XG5cbiAgICBjdHJsLnN0YXRzLnJlYWx0aW1lTGFiZWxzID0gWydNb2JpbGUnLCAnVGFibGV0JywgJ0Rlc2t0b3AnLCAnT3RoZXInXVxuICAgIGN0cmwuc3RhdHMudG9kYXlMYWJlbHMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J107XG4gICBcbiAgICBjdHJsLnN0YXRzLnJlYWx0aW1lID0gW1xuICAgICAgICA2NSwgNTksIDEwOCwgMjNcbiAgICBdO1xuXG4gICAgY3RybC5zdGF0cy50b2RheSA9IFtcbiAgICAgICAgWzM0MCwgNTQzLCA1MTIsIDU0MywgNDkzLCA0NDQsIDQzOV1cbiAgICBdO1xuXG4gICAgY3RybC5zdGF0cy5iYXJPcHRpb25zID0ge1xuICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGN0cmwuc3RhdHMucGllT3B0aW9ucyA9IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiB0cnVlXG4gICAgICAgIH1cbiAgICB9O1xuXG59XG5TdGF0c0luZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcbmFuZ3VsYXIubW9kdWxlKCdzdGF0cycpXG4gICAgLmNvbnRyb2xsZXIoJ1N0YXRzSW5kZXhDb250cm9sbGVyJywgU3RhdHNJbmRleENvbnRyb2xsZXIpOyIsInZhciB1c2VyRWRpdCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFVzZXJFZGl0Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb21wb25lbnQoJ3VzZXJFZGl0JywgdXNlckVkaXQpOyIsImZ1bmN0aW9uIFVzZXJFZGl0Q29udHJvbGxlcihVc2VyU2VydmljZSwgJGxvZywgJHJvdXRlUGFyYW1zKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbiAgdmFyIGlkID0gJHJvdXRlUGFyYW1zLmlkO1xuXG4gIGN0cmwudXNlciA9IHt9O1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCl7XG4gICAgVXNlclNlcnZpY2UuZ2V0VXNlcihpZClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4gICAgICB9KTtcbiAgfVxuXG59XG5cblVzZXJFZGl0Q29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICckbG9nJywgJyRyb3V0ZVBhcmFtcyddO1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb250cm9sbGVyKCdVc2VyRWRpdENvbnRyb2xsZXInLCBVc2VyRWRpdENvbnRyb2xsZXIpOyIsInZhciB1c2VySW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy91c2VyL3VzZXItaW5kZXgvdXNlci1pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogVXNlckluZGV4Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyczogJzwnLFxuICAgIHBhZ2VTZXR0aW5nczogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbXBvbmVudCgndXNlckluZGV4JywgdXNlckluZGV4KTsiLCJmdW5jdGlvbiBVc2VySW5kZXhDb250cm9sbGVyKFVzZXJTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLnVzZXJzID0gW107XG4gIGN0cmwucGFnZVNldHRpbmdzID0gW107XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UuZ2V0VXNlcnMoKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudXNlcnMgPSByZXNwb25zZS5kYXRhLnVzZXJzLmRhdGE7XG4gICAgICAgICRsb2cubG9nKHJlc3BvbnNlLmRhdGEudXNlcnMuZGF0YSk7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS51c2VycztcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5nZXROZXh0UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmdldFVzZXJzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSArIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC51c2VycyA9IHJlc3BvbnNlLmRhdGEudXNlcnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLnVzZXJzO1xuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLmdldFByZXZQYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UuZ2V0VXNlcnMoY3RybC5wYWdlU2V0dGluZ3MuY3VycmVudF9wYWdlIC0gMSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnVzZXJzID0gcmVzcG9uc2UuZGF0YS51c2Vycy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEudXNlcnM7XG4gICAgICB9KTtcbiAgfVxuXG59O1xuXG5Vc2VySW5kZXhDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29udHJvbGxlcignVXNlckluZGV4Q29udHJvbGxlcicsIFVzZXJJbmRleENvbnRyb2xsZXIpOyIsInZhciB1c2VyTmV3ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvdXNlci91c2VyLW5ldy91c2VyLW5ldy5odG1sJyxcbiAgY29udHJvbGxlcjogVXNlck5ld0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgdXNlcjogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29tcG9uZW50KCd1c2VyTmV3JywgdXNlck5ldyk7IiwiZnVuY3Rpb24gVXNlck5ld0NvbnRyb2xsZXIoVXNlclNlcnZpY2Upe1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5uZXdVc2VyID0gZnVuY3Rpb24odXNlcil7XG4gICAgVXNlclNlcnZpY2UubmV3VXNlcih1c2VyKTtcbiAgfTtcblxufTtcblxuVXNlck5ld0NvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29udHJvbGxlcignVXNlck5ld0NvbnRyb2xsZXInLCBVc2VyTmV3Q29udHJvbGxlcik7IiwidmFyIGZhY2Vib29rV2lkZ2V0ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy9mYWNlYm9vay13aWRnZXQvZmFjZWJvb2std2lkZ2V0Lmh0bWwnXG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29tcG9uZW50KCdmYWNlYm9va1dpZGdldCcsIGZhY2Vib29rV2lkZ2V0KTtcbiAgIiwidmFyIHR3aXR0ZXJXaWRnZXQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc29jaWFsL3NvY2lhbC13aWRnZXRzL3R3aXR0ZXItd2lkZ2V0L3R3aXR0ZXItd2lkZ2V0Lmh0bWwnLFxuICBjb250cm9sbGVyOiBTb2NpYWxUd2l0dGVyQ29udHJvbGxlclxufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbXBvbmVudCgndHdpdHRlcldpZGdldCcsIHR3aXR0ZXJXaWRnZXQpOyIsImZ1bmN0aW9uIFNvY2lhbFR3aXR0ZXJDb250cm9sbGVyKCl7XG4gIHZhciBjdHJsID0gdGhpcztcbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb250cm9sbGVyKCdTb2NpYWxUd2l0dGVyQ29udHJvbGxlcicsIFNvY2lhbFR3aXR0ZXJDb250cm9sbGVyKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
