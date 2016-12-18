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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGVzLmpzIiwiY29tbW9uL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQuanMiLCJjb21tb24vbG9hZGluZy9sb2FkaW5nLmNvbnRyb2xsZXIuanMiLCJjb21tb24vc2VydmljZXMvZmFjZWJvb2suc2VydmljZS5qcyIsImNvbW1vbi9zZXJ2aWNlcy9nb29nbGVQbHVzLnNlcnZpY2UuanMiLCJjb21tb24vc2VydmljZXMvdHdpdHRlci5zZXJ2aWNlLmpzIiwiY29tbW9uL3NlcnZpY2VzL3lvdXR1YmUuc2VydmljZS5qcyIsImNvbW1vbi90b3AtbmF2L3RvcC1uYXYuY29tcG9uZW50LmpzIiwiY29tbW9uL3RvcC1uYXYvdG9wLW5hdi5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUuc2VydmljZS5qcyIsImNvbXBvbmVudHMvYmxvZy9ibG9kLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvYmxvZy9ibG9nLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvYmxvZy9ibG9nLnNlcnZpY2UuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5tb2R1bGUuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS5tb2R1bGUuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2Uuc2VydmljZS5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUuanMiLCJjb21wb25lbnRzL2VtYWlsL2VtYWlsLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZW1haWwvZW1haWwucm91dGVzLmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwucm91dGVzLmpzIiwiY29tcG9uZW50cy9zdGF0cy9zdGF0cy5tb2R1bGUuanMiLCJjb21wb25lbnRzL3N0YXRzL3N0YXRzLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvdGFncy90YWcubW9kdWxlLmpzIiwiY29tcG9uZW50cy90YWdzL3RhZy5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXIubW9kdWxlLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXIucm91dGVzLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXIuc2VydmljZS5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1lZGl0L2FydGljbGUtZWRpdC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtZWRpdC9hcnRpY2xlLWVkaXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1ob21lL2FydGljbGVzLWhvbWUuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWhvbWUvYXJ0aWNsZXMtaG9tZS5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLW5ldy9hcnRpY2xlLW5ldy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtbmV3L2FydGljbGUtbmV3LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1lZGl0L2Jsb2ctZWRpdC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1lZGl0L2Jsb2ctZWRpdC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9ibG9nL2Jsb2ctaW5kZXgvYmxvZy1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1pbmRleC9ibG9nLWluZGV4LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLW5ldy9jb3Vyc2UtbmV3LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UtbmV3L2NvdXJzZS1uZXcuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLWVkaXQvY291cnNlLWVkaXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2Utc2VhcmNoL2NvdXJzZS1zZWFyY2guY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1zZWFyY2gvY291cnNlLXNlYXJjaC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFjdGlvbnMvZGFzaGJvYXJkLWFjdGlvbnMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFjdGlvbnMvZGFzaGJvYXJkLWFjdGlvbnMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYW5hbHl0aWNzL2Rhc2hib2FyZC1hbmFseXRpY3MuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5tb2R1bGUuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtY29tbWVudHMvZGFzaGJvYXJkLWNvbW1lbnRzLmNvbXBvbmVudHMuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtY29tbWVudHMvZGFzaGJvYXJkLWNvbW1lbnRzLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtZ3Jvd3RoL2Rhc2hib2FyZC1ncm93dGguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWdyb3d0aC9kYXNoYm9hcmQtZ3Jvd3RoLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1pbmRleC9jb21tZW50LWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWluZGV4L2NvbW1lbnQtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvYmxvZy9ibG9nLW5ldy9ibG9nLW5ldy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1uZXcvYmxvZy1uZXcuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1vYXV0aC9kYXNoYm9hcmQtb2F1dGguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLW9hdXRoL2Rhc2hib2FyZC1vYXV0aC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZW1haWwvZW1haWwtZGFzaGJvYXJkL2VtYWlsLWRhc2hib2FyZC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2VtYWlsL2VtYWlsLWRhc2hib2FyZC9lbWFpbC1kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtaW5kZXgvc2V0dGluZ3MtaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1pbmRleC9zZXR0aW5ncy1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLWRhc2hib2FyZC9zb2NpYWwtZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC1kYXNoYm9hcmQvc29jaWFsLWRhc2hib2FyZC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc29jaWFsL3lvdXR1YmUtc3Vic2NyaWJlcnMveW91dHViZS1zdWJzY3JpYmVycy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMtaW5kZXgvc3RhdHMtaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zdGF0cy9zdGF0cy1pbmRleC9zdGF0cy1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLWluZGV4L3VzZXItaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItaW5kZXgvdXNlci1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItbmV3L3VzZXItbmV3LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLW5ldy91c2VyLW5ldy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvZmFjZWJvb2std2lkZ2V0L2ZhY2Vib29rLXdpZGdldC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy90d2l0dGVyLXdpZGdldC90d2l0dGVyLXdpZGdldC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy90d2l0dGVyLXdpZGdldC90d2l0dGVyLXdpZGdldC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUNBQTtBQ0FBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FDQUE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWRtaW4tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3Jvb3QnLCBbXG4gICAgJ25nUm91dGUnLFxuICAgICdhcnRpY2xlcycsXG4gICAgJ2Rhc2hib2FyZCcsXG4gICAgJ3VzZXInLFxuICAgICdjb21tZW50JyxcbiAgICAnY291cnNlcycsXG4gICAgJ3N0YXRzJyxcbiAgICAnc2V0dGluZ3MnLFxuICAgICdzb2NpYWwnLFxuICAgICdibG9nJyxcbiAgICAndGFncycsXG4gICAgJ2VtYWlsJ1xuXSk7XG4iLCJmdW5jdGlvbiByb3V0ZVByb3ZpZGVyKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy8nLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8ZGFzaGJvYXJkPjwvZGFzaGJvYXJkPidcbiAgICAgIH0pO1xufVxucm91dGVQcm92aWRlci4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb25maWcocm91dGVQcm92aWRlcik7XG4iLCJ2YXIgbG9hZGluZyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbW1vbi9sb2FkaW5nL2xvYWRpbmcuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IExvYWRpbmdDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGlzTG9hZGluZzogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgnbG9hZGluZycsIGxvYWRpbmcpO1xuIiwiZnVuY3Rpb24gTG9hZGluZ0NvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0xvYWRpbmdDb250cm9sbGVyJywgTG9hZGluZ0NvbnRyb2xsZXIpOyIsIiIsIiIsIiIsIiIsInZhciB0b3BOYXYgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tbW9uL3RvcC1uYXYvdG9wLW5hdi5odG1sJyxcbiAgY29udHJvbGxlcjogVG9wTmF2Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhclxuICAubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgndG9wTmF2JywgdG9wTmF2KTtcbiIsImZ1bmN0aW9uIFRvcE5hdkNvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ1RvcE5hdkNvbnRyb2xsZXInLCBUb3BOYXZDb250cm9sbGVyKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycsIFtdKTsiLCJmdW5jdGlvbiBhcnRpY2xlUm91dGVQcm92aWRlcigkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvYXJ0aWNsZXMnLHtcbiAgICAgICAgdGVtcGxhdGU6ICc8YXJ0aWNsZXMtaG9tZT48L2FydGljbGVzLWhvbWU+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvYXJ0aWNsZS9uZXcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGFydGljbGUtbmV3PjwvYXJ0aWNsZS1uZXc+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvYXJ0aWNsZS9lZGl0LzpzbHVnJywge1xuICAgICAgICB0ZW1wbGF0ZTogJzxhcnRpY2xlLWVkaXQ+PC9hcnRpY2xlLWVkaXQ+J1xuICAgICAgfSlcbiAgICAgIC5vdGhlcndpc2UoeyBcbiAgICAgICAgdGVtcGxhdGU6ICc8aDE+Tm90IEZvdW5kPC9oMT4nXG4gICAgICB9KTtcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpLmNvbmZpZyhhcnRpY2xlUm91dGVQcm92aWRlcik7XG5hcnRpY2xlUm91dGVQcm92aWRlci4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuIiwiZnVuY3Rpb24gQXJ0aWNsZVNlcnZpY2UoJGh0dHAsICRsb2csIENTUkZfVE9LRU4pIHtcblxuICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1Dc3JmLVRva2VuJ10gPSBDU1JGX1RPS0VOO1xuXG4gIGZ1bmN0aW9uIG5ld0FydGljbGUoYXJ0aWNsZSkge1xuICAgIGNvbnNvbGUubG9nKGFydGljbGUpO1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJ2FydGljbGVzP3Y9JyArIERhdGUubm93KCksXG4gICAgICBkYXRhOiBhcnRpY2xlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWFyY2gocGFnZSwgdGl0bGUpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICdhcGkvbGVzc29ucz9wYWdlPScgKyBwYWdlICsgXCImdGl0bGU9XCIgKyB0aXRsZVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQXJ0aWNsZShhcnRpY2xlKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHVybDogJ2FydGljbGVzLycgKyBhcnRpY2xlLnNsdWcgKyBcIj92PVwiICsgRGF0ZS5ub3coKSxcbiAgICAgIGRhdGE6IGFydGljbGVcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZUFydGljbGUoaWQpIHtcbiAgICAkbG9nLmxvZyhcIlBsYWNlaG9sZGVyIGZvciBkZWxldGluZyBhbiBhcnRpY2xlXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXJ0aWNsZShzbHVnKSB7XG4gICAgcmV0dXJuICRodHRwLmdldChcImFwaS9sZXNzb24vXCIgKyBzbHVnICsgXCI/dj1cIiArIERhdGUubm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXJ0aWNsZXMocGFnZSl7XG4gICAgcmV0dXJuICRodHRwLmdldChcImFwaS9sZXNzb25zP3BhZ2U9XCIgKyBwYWdlICsgXCImdj1cIiArIERhdGUubm93KCkpO1xuICB9XG5cbiAgdmFyIHNlcnZpY2UgPSB7XG4gICAgbmV3QXJ0aWNsZSA6IG5ld0FydGljbGUsXG4gICAgdXBkYXRlQXJ0aWNsZSA6IHVwZGF0ZUFydGljbGUsXG4gICAgZGVsZXRlQXJ0aWNsZSA6IGRlbGV0ZUFydGljbGUsXG4gICAgZ2V0QXJ0aWNsZSA6IGdldEFydGljbGUsXG4gICAgc2VhcmNoOiBzZWFyY2gsXG4gICAgZ2V0QXJ0aWNsZXM6IGdldEFydGljbGVzXG4gIH07XG5cbiAgcmV0dXJuIHNlcnZpY2U7XG5cbn1cblxuQXJ0aWNsZVNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZycsICdDU1JGX1RPS0VOJ107ICBcblxuYW5ndWxhclxuICAubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5mYWN0b3J5KCdBcnRpY2xlU2VydmljZScsIEFydGljbGVTZXJ2aWNlKTsiLCJhbmd1bGFyLm1vZHVsZSgnYmxvZycsIFtdKTsiLCJmdW5jdGlvbiBibG9nUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9ibG9nJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGJsb2ctaW5kZXg+PC9ibG9nLWluZGV4PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL2Jsb2cvbmV3Jywge1xuICAgICAgICB0ZW1wbGF0ZTogJzxibG9nLW5ldz48L2Jsb2ctbmV3PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL2Jsb2cvZWRpdC86aWQnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGJsb2ctZWRpdD48L2Jsb2ctZWRpdD4nXG4gICAgICB9KTtcbn07XG5cbmJsb2dSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmFuZ3VsYXIubW9kdWxlKCdibG9nJykuY29uZmlnKGJsb2dSb3V0ZXMpO1xuIiwiZnVuY3Rpb24gQmxvZ1NlcnZpY2UoJGh0dHAsICRsb2cpe1xuICAgIHZhciBzZXJ2aWNlID0ge307XG5cbiAgICBmdW5jdGlvbiBkZWxldGVQb3N0KHNsdWcpIHtcbiAgICAgICAgJGxvZy5sb2coXCJEZWxldGluZyBhIHBvc3Qgd2l0aCBzbHVnOiBcIiArIHNsdWcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc3QocG9zdCkge1xuICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgbWV0aG9kIDogJ1BBVENIJyxcbiAgICAgICAgdXJsOiAncG9zdHMvJyArIHBvc3QuaWQgKyBcIj92PVwiICsgRGF0ZS5ub3coKSxcbiAgICAgICAgZGF0YSA6IHBvc3RcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5ld1Bvc3QocG9zdCkge1xuICAgICAgJGxvZy5sb2cocG9zdCk7XG4gICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAncG9zdHMnLFxuICAgICAgICBkYXRhOiBwb3N0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWFyY2gocGFnZSwgdGl0bGUpIHtcbiAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICdhcGkvcG9zdHM/cGFnZT0nICsgcGFnZSArICcmdGl0bGU9JyArIHRpdGxlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQb3N0KGlkKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KFwiYXBpL3Bvc3RzL1wiICsgaWQgKyBcIiZ2PVwiICsgRGF0ZS5ub3coKSk7XG4gICAgfVxuICBcblxuICAgIGZ1bmN0aW9uIGdldFBvc3RzKHBhZ2UpIHtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoXCJhcGkvcG9zdHM/cGFnZT1cIiArIHBhZ2UgKyBcIiZ2PVwiICsgRGF0ZS5ub3coKSk7XG4gICAgfVxuICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICBkZWxldGVQb3N0IDogZGVsZXRlUG9zdCxcbiAgICAgICAgdXBkYXRlUG9zdCA6IHVwZGF0ZVBvc3QsXG4gICAgICAgIG5ld1Bvc3QgOiBuZXdQb3N0LFxuICAgICAgICBzZWFyY2ggOiBzZWFyY2gsXG4gICAgICAgIGdldFBvc3QgOiBnZXRQb3N0LFxuICAgICAgICBnZXRQb3N0cyA6IGdldFBvc3RzXG4gICAgfTtcblxuICAgIHJldHVybiBzZXJ2aWNlO1xufVxuQmxvZ1NlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYmxvZycpXG4gICAgLmZhY3RvcnkoJ0Jsb2dTZXJ2aWNlJywgQmxvZ1NlcnZpY2UpOyIsImFuZ3VsYXIubW9kdWxlKCdjb21tZW50JywgW10pOyIsImZ1bmN0aW9uIGNvbW1lbnRSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL2NvbW1lbnRzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGNvbW1lbnQtaW5kZXg+PC9jb21tZW50LWluZGV4PidcbiAgICAgIH0pO1xufTtcbmNvbW1lbnRSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmFuZ3VsYXIubW9kdWxlKCdjb21tZW50JykuY29uZmlnKGNvbW1lbnRSb3V0ZXMpO1xuIiwiZnVuY3Rpb24gQ29tbWVudFNlcnZpY2UoJGxvZyl7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVDb21tZW50KGNvbW1lbnRJZCkge1xuICAgICAgICAkbG9nLmxvZyhcIkRlbGV0aW5nIGEgY29tbWVudCB3aXRoIGlkOiBcIiArIGNvbW1lbnRJZCk7XG4gICAgfVxuXG4gICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgIGRlbGV0ZUNvbW1lbnQgOiBkZWxldGVDb21tZW50XG4gICAgfTtcblxuICAgIHJldHVybiBzZXJ2aWNlO1xufVxuQ29tbWVudFNlcnZpY2UuJGluamVjdCA9IFsnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpXG4gICAgLmZhY3RvcnkoJ0NvbW1lbnRTZXJ2aWNlJywgQ29tbWVudFNlcnZpY2UpOyIsImFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJywgW10pO1xuIiwiZnVuY3Rpb24gY291cnNlUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9jb3Vyc2VzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGNvdXJzZS1zZWFyY2g+PC9jb3Vyc2Utc2VhcmNoPidcbiAgICAgIH0pXG4gICAgICAud2hlbignL2NvdXJzZS9uZXcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGNvdXJzZS1uZXc+PC9jb3Vyc2UtbmV3PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL2NvdXJzZS9lZGl0LzpzbHVnJywge1xuICAgICAgICB0ZW1wbGF0ZTogJzxjb3Vyc2UtZWRpdD48L2NvdXJzZS1lZGl0PidcbiAgICAgIH0pXG59XG5jb3Vyc2VSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29uZmlnKGNvdXJzZVJvdXRlcyk7XG4iLCJmdW5jdGlvbiBDb3Vyc2VTZXJ2aWNlKCRodHRwLCAkbG9nLCBDU1JGX1RPS0VOKSB7XG5cbiAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtQ3NyZi1Ub2tlbiddID0gQ1NSRl9UT0tFTjtcblxuICBmdW5jdGlvbiBuZXdDb3Vyc2UoY291cnNlKSB7XG4gICAgY29uc29sZS5sb2coY291cnNlKTtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICdjb3Vyc2VzP3Y9JyArIERhdGUubm93KCksXG4gICAgICBkYXRhOiBjb3Vyc2VcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvdXJzZShzbHVnKSB7XG4gICAgcmV0dXJuICRodHRwLmdldChcImFwaS9jb3Vyc2UvXCIgKyBzbHVnICsgXCI/dj1cIiArIERhdGUubm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q291cnNlcyhwYWdlKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KFwiYXBpL2NvdXJzZXM/cGFnZT1cIiArIHBhZ2UgKyBcIiZ2PVwiICsgRGF0ZS5ub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWFyY2gocGFnZSwgdGl0bGUpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICdhcGkvbGVzc29ucz9wYWdlPScgKyBwYWdlICsgXCImdGl0bGU9XCIgKyB0aXRsZVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ291cnNlKGNvdXJzZSkge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB1cmw6ICdjb3Vyc2VzLycgKyBjb3Vyc2Uuc2x1ZyArIFwiP3Y9XCIgKyBEYXRlLm5vdygpLFxuICAgICAgZGF0YTogY291cnNlXG4gICAgfSk7XG4gIH1cbiAgXG5cbiAgdmFyIHNlcnZpY2UgPSB7XG4gICAgdXBkYXRlQ291cnNlIDogdXBkYXRlQ291cnNlLFxuICAgIGdldENvdXJzZSA6IGdldENvdXJzZSxcbiAgICBuZXdDb3Vyc2UgOiBuZXdDb3Vyc2UsXG4gICAgc2VhcmNoIDogc2VhcmNoLFxuICAgIGdldENvdXJzZXMgOiBnZXRDb3Vyc2VzXG4gIH07XG5cbiAgcmV0dXJuIHNlcnZpY2U7XG59XG5cbkNvdXJzZVNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZycsICdDU1JGX1RPS0VOJ107ICBcblxuYW5ndWxhclxuICAubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmZhY3RvcnkoJ0NvdXJzZVNlcnZpY2UnLCBDb3Vyc2VTZXJ2aWNlKTsiLCJ2YXIgZGFzaGJvYXJkID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogRGFzaGJvYXJkQ29udHJvbGxlclxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCdkYXNoYm9hcmQnLCBkYXNoYm9hcmQpOyIsImZ1bmN0aW9uIERhc2hib2FyZENvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZENvbnRyb2xsZXInLCBEYXNoYm9hcmRDb250cm9sbGVyKTsiLCJhbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJywgWydjaGFydC5qcyddKTsiLCJhbmd1bGFyLm1vZHVsZSgnZW1haWwnLCBbXSk7XG4iLCJmdW5jdGlvbiBlbWFpbFJvdXRlUHJvdmlkZXIoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL2VtYWlsJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGVtYWlsLWRhc2hib2FyZD48L2VtYWlsLWRhc2hib2FyZD4nXG4gICAgICB9KTtcbn1cbmVtYWlsUm91dGVQcm92aWRlci4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuXG5hbmd1bGFyLm1vZHVsZSgnZW1haWwnKVxuICAuY29uZmlnKGVtYWlsUm91dGVQcm92aWRlcik7XG4iLCJhbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnLFtdKTsiLCJmdW5jdGlvbiBzZXR0aW5nc1JvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvc2V0dGluZ3MnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8c2V0dGluZ3MtaW5kZXg+PC9zZXR0aW5ncy1pbmRleD4nXG4gICAgICB9KTtcbn1cbnNldHRpbmdzUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbmZpZyhzZXR0aW5nc1JvdXRlcyk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnc29jaWFsJywgW10pOyIsImZ1bmN0aW9uIHNvY2lhbFJvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvc29jaWFsJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHNvY2lhbC1kYXNoYm9hcmQ+PC9zb2NpYWwtZGFzaGJvYXJkPidcbiAgICAgIH0pO1xufVxuc29jaWFsUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29uZmlnKHNvY2lhbFJvdXRlcyk7XG4gICIsImFuZ3VsYXIubW9kdWxlKCdzdGF0cycsIFsnY2hhcnQuanMnXSk7IiwiZnVuY3Rpb24gc3RhdHNSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3N0YXRzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHN0YXRzLWluZGV4Pjwvc3RhdHMtaW5kZXg+J1xuICAgICAgfSk7XG59O1xuXG5zdGF0c1JvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuYW5ndWxhci5tb2R1bGUoJ3N0YXRzJykuY29uZmlnKHN0YXRzUm91dGVzKTtcbiIsImFuZ3VsYXIubW9kdWxlKCd0YWdzJywgW10pOyIsImZ1bmN0aW9uIFRhZ1NlcnZpY2UoJGh0dHAsICRsb2cpIHtcblxuICBmdW5jdGlvbiBnZXRUYWdzKCkge1xuICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS90YWdzJyk7XG4gIH1cblxuICB2YXIgc2VydmljZSA9IHtcbiAgICBnZXRUYWdzIDogZ2V0VGFnc1xuICB9O1xuXG4gIHJldHVybiBzZXJ2aWNlO1xuXG59XG5cblRhZ1NlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZyddOyAgXG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgndGFncycpXG4gIC5mYWN0b3J5KCdUYWdTZXJ2aWNlJywgVGFnU2VydmljZSk7IiwiYW5ndWxhci5tb2R1bGUoJ3VzZXInLCBbXSk7IiwiZnVuY3Rpb24gdXNlclJvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvdXNlcnMnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8dXNlci1pbmRleD48L3VzZXItaW5kZXg+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvdXNlci9lZGl0LzppZCcsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8dXNlci1lZGl0PjwvdXNlci1lZGl0PicgIFxuICAgICAgfSlcbiAgICAgIC53aGVuKCcvdXNlci9uZXcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPHVzZXItbmV3PjwvdXNlci1uZXc+J1xuICAgICAgfSk7XG59O1xuXG51c2VyUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5hbmd1bGFyLm1vZHVsZSgndXNlcicpLmNvbmZpZyh1c2VyUm91dGVzKTtcbiIsImZ1bmN0aW9uIFVzZXJTZXJ2aWNlKCRsb2csICRodHRwKSB7XG5cbiAgICBmdW5jdGlvbiBuZXdVc2VyKHVzZXIpIHtcbiAgICAgICAgJGxvZy5sb2coXCJBZGRpbmcgTmV3IFVzZXJcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VXNlcihpZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvdXNlci8nICsgaWQgKyBcIj92PVwiICsgRGF0ZS5ub3coKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VXNlcnMocGFnZSkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvdXNlcnM/cGFnZT0nICsgcGFnZSArIFwiP3Y9XCIgKyBEYXRlLm5vdygpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRHcm93dGgoKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS91c2Vycy9ncm93dGgnICsgXCI/dj1cIiArIERhdGUubm93KCkpO1xuICAgIH1cblxuICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICBuZXdVc2VyOiBuZXdVc2VyLFxuICAgICAgICBnZXRVc2VyOiBnZXRVc2VyLFxuICAgICAgICBnZXRVc2VyczogZ2V0VXNlcnMsXG4gICAgICAgIGdldEdyb3d0aDogZ2V0R3Jvd3RoXG4gICAgfTtcblxuICAgIHJldHVybiBzZXJ2aWNlO1xufTtcblxuVXNlclNlcnZpY2UuJGluamVjdCA9IFsnJGxvZycsICckaHR0cCddO1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gICAgLmZhY3RvcnkoJ1VzZXJTZXJ2aWNlJywgVXNlclNlcnZpY2UpOyIsInZhciBhcnRpY2xlRWRpdCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtZWRpdC9hcnRpY2xlLWVkaXQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IEFydGljbGVFZGl0Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBhcnRpY2xlOiAnPCcsXG4gICAgdGFnczogJzwnLFxuICAgIGNvdXJzZXM6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb21wb25lbnQoJ2FydGljbGVFZGl0JywgYXJ0aWNsZUVkaXQpOyIsImZ1bmN0aW9uIEFydGljbGVFZGl0Q29udHJvbGxlcigkbG9nLCBBcnRpY2xlU2VydmljZSwgJHJvdXRlUGFyYW1zLCBUYWdTZXJ2aWNlLCBDb3Vyc2VTZXJ2aWNlLCAkcSwgJHRpbWVvdXQpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuICB2YXIgc2x1ZyA9ICRyb3V0ZVBhcmFtcy5zbHVnO1xuICBjdHJsLmFydGljbGUgPSB7fTtcbiAgY3RybC50YWdzID0gW107XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZShzbHVnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZSA9IHJlc3BvbnNlLmRhdGEubGVzc29uO1xuICAgICAgICByZXR1cm4gVGFnU2VydmljZS5nZXRUYWdzKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudGFncyA9IHJlc3BvbnNlLmRhdGEudGFncy5kYXRhO1xuICAgICAgICByZXR1cm4gQ291cnNlU2VydmljZS5nZXRDb3Vyc2VzKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuY291cnNlcyA9IHJlc3BvbnNlLmRhdGEuY291cnNlcy5kYXRhO1xuICAgICAgICAkbG9nLmxvZyhcIkNvbXBsZXRlZCBMb2FkaW5nXCIpO1xuICAgICAgfSlcbiAgfTtcbiAgXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKGFydGljbGUpIHtcbiAgICAkbG9nLmxvZyhcIlNhdmUgYW55IHVwZGF0ZXMgdG8gdGhlIGFydGljbGVcIik7XG4gICAgQXJ0aWNsZVNlcnZpY2UudXBkYXRlQXJ0aWNsZShhcnRpY2xlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IFNhdmVkIEFydGljbGVcIik7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJGYWlsZWQgdG8gc2F2ZSBhcnRpY2xlXCIpO1xuICAgICAgfSk7XG4gIH07XG5cbn07XG5cbkFydGljbGVFZGl0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJywgJ0FydGljbGVTZXJ2aWNlJywgJyRyb3V0ZVBhcmFtcycsICdUYWdTZXJ2aWNlJywgJ0NvdXJzZVNlcnZpY2UnLCAnJHEnLCAnJHRpbWVvdXQnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbnRyb2xsZXIoJ0FydGljbGVFZGl0Q29udHJvbGxlcicsIEFydGljbGVFZGl0Q29udHJvbGxlcik7XG4iLCJ2YXIgYXJ0aWNsZXNIb21lID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1ob21lL2FydGljbGVzLWhvbWUuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IEFydGljbGVzSG9tZUNvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgYXJ0aWNsZXM6ICc8JyxcbiAgICBwYWdlU2V0dGluZ3M6ICc8JyxcbiAgICB0aXRsZTogJz0/J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29tcG9uZW50KCdhcnRpY2xlc0hvbWUnLCBhcnRpY2xlc0hvbWUpOyIsImZ1bmN0aW9uIEFydGljbGVzSG9tZUNvbnRyb2xsZXIoQXJ0aWNsZVNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuYXJ0aWNsZXMgPSBbXTtcblxuICBjdHJsLnBhZ2UgPSAxO1xuICBjdHJsLnBhZ2VTZXR0aW5ncyA9IFtdO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCl7XG4gICAgQXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZXMoY3RybC5wYWdlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLmxlc3NvbnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmxlc3NvbnM7XG4gICAgICB9KTtcbiAgICAkbG9nLmxvZyhcIlN1Y2Nlc3NmdWxseSBSZXRyaWV2ZWQgbGVzc29uczogXCIgKyBjdHJsLmFydGljbGVzKTsgIFxuICB9XG5cbiAgY3RybC5nZXRQYWdlcyA9IGZ1bmN0aW9uKG51bWJlcikge1xuICAgIGlmKG51bWJlciA9PSB1bmRlZmluZWQpe1xuICAgICAgbnVtYmVyID0gMTtcbiAgICB9XG4gICAgdmFyIHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwobnVtYmVyIC8gMTApO1xuICAgIHJldHVybiBuZXcgQXJyYXkodG90YWxQYWdlcyk7XG4gIH07XG5cbiAgY3RybC5zZWFyY2ggPSBmdW5jdGlvbigpIHtcbiAgICBBcnRpY2xlU2VydmljZS5zZWFyY2goY3RybC5wYWdlLCBjdHJsLnRpdGxlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLmxlc3NvbnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmxlc3NvbnM7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuc2V0UGFnZSA9IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICBBcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlcyhwYWdlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLmxlc3NvbnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmxlc3NvbnM7XG4gICAgICB9KTtcbiAgfTtcblxuICBjdHJsLmdldE5leHRQYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZXMoY3RybC5wYWdlU2V0dGluZ3MuY3VycmVudF9wYWdlICsgMSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zO1xuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLmdldFByZXZQYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZXMoY3RybC5wYWdlU2V0dGluZ3MuY3VycmVudF9wYWdlIC0gMSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zO1xuICAgICAgfSk7XG4gIH1cblxuXG59O1xuXG5BcnRpY2xlc0hvbWVDb250cm9sbGVyLiRpbmplY3QgPSBbJ0FydGljbGVTZXJ2aWNlJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbnRyb2xsZXIoJ0FydGljbGVzSG9tZUNvbnRyb2xsZXInLCBBcnRpY2xlc0hvbWVDb250cm9sbGVyKTsiLCJ2YXIgYXJ0aWNsZU5ldyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtbmV3L2FydGljbGUtbmV3Lmh0bWwnLFxuICBjb250cm9sbGVyOiBBcnRpY2xlTmV3Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBhcnRpY2xlOiAnPCcsXG4gICAgdGFnczogJzwnLFxuICAgIGVycm9yOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbXBvbmVudCgnYXJ0aWNsZU5ldycsIGFydGljbGVOZXcpOyIsImZ1bmN0aW9uIEFydGljbGVOZXdDb250cm9sbGVyKEFydGljbGVTZXJ2aWNlLCBDb3Vyc2VTZXJ2aWNlLCAkbG9nLCBUYWdTZXJ2aWNlLCAkbG9jYXRpb24pIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuYXJ0aWNsZSA9IHt9O1xuICBjdHJsLmNvdXJzZXMgPSBbXTtcbiAgY3RybC50YWdzID0gW107XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgQ291cnNlU2VydmljZS5nZXRDb3Vyc2VzKClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2UpIHtcbiAgICAgICAgY3RybC5jb3Vyc2VzID0gcmVzcG9uc2UuZGF0YS5jb3Vyc2VzLmRhdGE7XG4gICAgICAgIHJldHVybiBUYWdTZXJ2aWNlLmdldFRhZ3MoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC50YWdzID0gcmVzcG9uc2UuZGF0YS50YWdzLmRhdGE7XG4gICAgICAgICRsb2cubG9nKFwiRmluaXNoZWQgbG9hZGluZ1wiKTsgICAgICBcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5zYXZlID0gZnVuY3Rpb24oYXJ0aWNsZSkge1xuICAgIEFydGljbGVTZXJ2aWNlLm5ld0FydGljbGUoYXJ0aWNsZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhcIlN1Y2Nlc3NmdWxseSBTYXZlZCBBcnRpY2xlXCIpO1xuICAgICAgICAkbG9jYXRpb24ucGF0aChcImFydGljbGUvZWRpdC9cIiArIGFydGljbGUuc2x1Zyk7XG4gICAgICB9LCBmdW5jdGlvbiBlcnJvcihyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiRXJyb3I6IFwiICsgcmVzcG9uc2UpO1xuICAgICAgICBjdHJsLmVycm9yID0gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgfTsgIFxuXG59O1xuXG5BcnRpY2xlTmV3Q29udHJvbGxlci4kaW5qZWN0ID0gWydBcnRpY2xlU2VydmljZScsICdDb3Vyc2VTZXJ2aWNlJywgJyRsb2cnLCAnVGFnU2VydmljZScsICckbG9jYXRpb24nXTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbnRyb2xsZXIoJ0FydGljbGVOZXdDb250cm9sbGVyJywgQXJ0aWNsZU5ld0NvbnRyb2xsZXIpOyIsInZhciBibG9nRWRpdCA9IHtcbiAgdGVtcGxhdGVVcmw6IFwiLi9hcHAvY29tcG9uZW50cy9ibG9nL2Jsb2ctZWRpdC9ibG9nLWVkaXQuaHRtbFwiLFxuICBjb250cm9sbGVyOiBCbG9nRWRpdENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgcG9zdDogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Jsb2cnKVxuICAuY29tcG9uZW50KCdibG9nRWRpdCcsIGJsb2dFZGl0KTsiLCJmdW5jdGlvbiBCbG9nRWRpdENvbnRyb2xsZXIoQmxvZ1NlcnZpY2UsICRsb2csICRyb3V0ZVBhcmFtcykge1xuICB2YXIgY3RybCA9IHRoaXM7XG4gIGN0cmwuYXJ0aWNsZSA9IHt9O1xuICB2YXIgaWQgPSAkcm91dGVQYXJhbXMuaWQ7XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgQmxvZ1NlcnZpY2UuZ2V0UG9zdChpZClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnBvc3QgPSByZXNwb25zZS5kYXRhLnBvc3Q7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKHBvc3QpIHtcbiAgICBCbG9nU2VydmljZS51cGRhdGVQb3N0KHBvc3QpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxufVxuXG5CbG9nRWRpdENvbnRyb2xsZXIuJGluamVjdCA9IFsnQmxvZ1NlcnZpY2UnLCAnJGxvZycsICckcm91dGVQYXJhbXMnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2Jsb2cnKVxuICAuY29udHJvbGxlcignQmxvZ0VkaXRDb250cm9sbGVyJywgQmxvZ0VkaXRDb250cm9sbGVyKTsiLCJ2YXIgYmxvZ0luZGV4ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYmxvZy9ibG9nLWluZGV4L2Jsb2ctaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IEJsb2dJbmRleENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgcG9zdHM6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdibG9nJylcbiAgLmNvbXBvbmVudCgnYmxvZ0luZGV4JywgYmxvZ0luZGV4KTsiLCJmdW5jdGlvbiBCbG9nSW5kZXhDb250cm9sbGVyKEJsb2dTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmFydGljbGVzID0gW107XG5cbiAgY3RybC5wYWdlID0gMTtcbiAgY3RybC5wYWdlU2V0dGluZ3MgPSBbXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBCbG9nU2VydmljZS5nZXRQb3N0cyhjdHJsLnBhZ2UpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5wb3N0cyA9IHJlc3BvbnNlLmRhdGEucG9zdHMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmxlc3NvbnM7XG4gICAgICB9KTtcbiAgICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IHJldHJpZXZlZCBwb3N0czogXCIgKyBjdHJsLnBvc3RzKTtcbiAgfVxuXG4gIGN0cmwuZ2V0TmV4dFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBBcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlcyhjdHJsLnBhZ2VTZXR0aW5ncy5jdXJyZW50X3BhZ2UgKyAxKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLnBvc3RzLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5wb3N0cztcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5nZXRQcmV2UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSAtIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEucG9zdHMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLnBvc3RzO1xuICAgICAgfSk7XG4gIH1cblxufVxuXG5CbG9nSW5kZXhDb250cm9sbGVyLiRpbmplY3QgPSBbJ0Jsb2dTZXJ2aWNlJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2Jsb2cnKVxuICAuY29udHJvbGxlcignQmxvZ0luZGV4Q29udHJvbGxlcicsIEJsb2dJbmRleENvbnRyb2xsZXIpOyIsInZhciBjb3Vyc2VOZXcgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1uZXcvY291cnNlLW5ldy5odG1sJyxcbiAgY29udHJvbGxlcjogQ291cnNlTmV3Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBjb3Vyc2UgOiAnPT8nXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29tcG9uZW50KCdjb3Vyc2VOZXcnLCBjb3Vyc2VOZXcpO1xuICAiLCJmdW5jdGlvbiBDb3Vyc2VOZXdDb250cm9sbGVyKENvdXJzZVNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKGNvdXJzZSkge1xuICAgIENvdXJzZVNlcnZpY2UubmV3Q291cnNlKGNvdXJzZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhcIlN1Y2Nlc3NmdWxseSBTYXZlZCBDb3Vyc2VcIik7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKFwiY291cnNlL2VkaXQvXCIgKyBjb3Vyc2Uuc2x1Zyk7XG4gICAgICB9LCBmdW5jdGlvbiBlcnJvcihyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiRXJyb3I6IFwiICsgcmVzcG9uc2UpO1xuICAgICAgICBjdHJsLmVycm9yID0gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgfVxuXG59XG5cbkNvdXJzZU5ld0NvbnRyb2xsZXIuJGluamVjdCA9IFsnQ291cnNlU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmNvbnRyb2xsZXIoJ0NvdXJzZU5ld0NvbnRyb2xsZXInLCBDb3Vyc2VOZXdDb250cm9sbGVyKTsiLCJ2YXIgY291cnNlRWRpdCA9IHtcbiAgdGVtcGxhdGVVcmwgOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0Lmh0bWwnLFxuICBjb250cm9sbGVyOiBDb3Vyc2VFZGl0Q29udHJvbGxlciwgXG4gIGJpbmRpbmdzIDoge1xuICAgIGNvdXJzZTogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29tcG9uZW50KCdjb3Vyc2VFZGl0JywgY291cnNlRWRpdCk7XG4gICIsImZ1bmN0aW9uIENvdXJzZUVkaXRDb250cm9sbGVyKENvdXJzZVNlcnZpY2UsICRsb2csICRyb3V0ZVBhcmFtcykge1xuICB2YXIgY3RybCA9IHRoaXM7XG4gIFxuICB2YXIgc2x1ZyA9ICRyb3V0ZVBhcmFtcy5zbHVnO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIENvdXJzZVNlcnZpY2UuZ2V0Q291cnNlKHNsdWcpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5jb3Vyc2UgPSByZXNwb25zZS5kYXRhLmNvdXJzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5zYXZlID0gZnVuY3Rpb24oY291cnNlKSB7XG4gICAgQ291cnNlU2VydmljZS51cGRhdGVDb3Vyc2UoY291cnNlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgU2F2ZWRcIik7XG4gICAgICB9KTtcbiAgfVxuXG59XG5cbkNvdXJzZUVkaXRDb250cm9sbGVyLiRpbmplY3QgPSBbJ0NvdXJzZVNlcnZpY2UnLCAnJGxvZycsICckcm91dGVQYXJhbXMnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29udHJvbGxlcignQ291cnNlRWRpdENvbnRyb2xsZXInLCBDb3Vyc2VFZGl0Q29udHJvbGxlcik7IiwidmFyIGNvdXJzZVNlYXJjaCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvdXJzZXMvY291cnNlLXNlYXJjaC9jb3Vyc2Utc2VhcmNoLmh0bWwnLFxuICBjb250cm9sbGVyOiBDb3Vyc2VTZWFyY2hDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGNvdXJzZXM6ICc8JyxcbiAgICBwYWdlU2V0dGluZ3M6ICc8JyxcbiAgICB0aXRsZTogJz0/J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmNvbXBvbmVudCgnY291cnNlU2VhcmNoJywgY291cnNlU2VhcmNoKTsiLCJmdW5jdGlvbiBDb3Vyc2VTZWFyY2hDb250cm9sbGVyKENvdXJzZVNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuY291cnNlcyA9IFtdO1xuXG4gIGN0cmwucGFnZSA9IDE7XG4gIGN0cmwucGFnZVNldHRpbmdzID0gW107XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKXtcbiAgICBDb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoY3RybC5wYWdlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuY291cnNlcyA9IHJlc3BvbnNlLmRhdGEuY291cnNlcy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEuY291cnNlcztcbiAgICAgIH0pO1xuICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IFJldHJpZXZlZCBjb3Vyc2VzOiBcIiArIGN0cmwuY291cnNlcyk7ICBcbiAgfVxuXG59XG5cbkNvdXJzZVNlYXJjaENvbnRyb2xsZXIuJGluamVjdCA9IFsnQ291cnNlU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmNvbnRyb2xsZXIoJ0NvdXJzZVNlYXJjaENvbnRyb2xsZXInLCBDb3Vyc2VTZWFyY2hDb250cm9sbGVyKTsiLCJ2YXIgZGFzaGJvYXJkQWN0aW9ucyA9IHtcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYWN0aW9ucy9kYXNoYm9hcmQtYWN0aW9ucy5odG1sJyxcbiAgICBjb250cm9sbGVyOiBEYXNoYm9hcmRBY3Rpb25Db250cm9sbGVyXG4gICAgXG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgICAuY29tcG9uZW50KCdkYXNoYm9hcmRBY3Rpb25zJywgZGFzaGJvYXJkQWN0aW9ucyk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQWN0aW9uQ29udHJvbGxlcigpe1xuICAgIHZhciBjdHJsID0gdGhpcztcbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gICAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEFjdGlvbkNvbnRyb2xsZXInLCBEYXNoYm9hcmRBY3Rpb25Db250cm9sbGVyKTsiLCJ2YXIgZGFzaGJvYXJkQW5hbHl0aWNzID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5odG1sJyxcbiAgY29udHJvbGxlcjogRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzZXJpZXM6ICc8JyxcbiAgICBsYWJlbHM6ICc8JyxcbiAgICBkYXRhOiAnPCcsXG4gICAgb3B0aW9uczogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgnZGFzaGJvYXJkQW5hbHl0aWNzJywgZGFzaGJvYXJkQW5hbHl0aWNzKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyKCRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwubGFiZWxzID0gWycyMDA2JywgJzIwMDcnLCAnMjAwOCcsICcyMDA5JywgJzIwMTAnLCAnMjAxMScsICcyMDEyJ107XG4gIGN0cmwuc2VyaWVzID0gWydWaXNpdG9ycycsICdQYWdlIFZpZXdzJ107XG5cbiAgY3RybC5kYXRhID0gW1xuICAgIFs2NSwgNTksIDgwLCA4MSwgNTYsIDU1LCA0MF0sXG4gICAgWzI4LCA0OCwgNDAsIDE5LCA4NiwgMjcsIDkwXVxuICBdO1xuXG4gIGN0cmwub3B0aW9ucyA9IHtcbiAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gIH07XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgJGxvZy5sb2coXCJUaGlzIHdpbGwgcGVyZm9ybSB0aGUgUkVTVCBBUEkgY2FsbCB0byBnb29nbGUgYW5hbHl0aWNzIG9uIHBhZ2UgbG9hZFwiKTtcbiAgfTtcblxufTtcblxuRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXInLCBEYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyKTsiLCIiLCJ2YXIgZGFzaGJvYXJkQ29tbWVudHMgPSB7XG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWNvbW1lbnRzL2Rhc2hib2FyZC1jb21tZW50cy5odG1sJyxcbiAgICBjb250cm9sbGVyOiBEYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXIsXG4gICAgYmluZGluZ3M6IHtcbiAgICAgICAgY29tbWVudHM6ICc8J1xuICAgIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gICAgLmNvbXBvbmVudCgnZGFzaGJvYXJkQ29tbWVudHMnLCBkYXNoYm9hcmRDb21tZW50cyk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyKCRzY29wZSl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xufVxuXG5EYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb250cm9sbGVyKCdEYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXInLCBEYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXIpOyIsInZhciBkYXNoYm9hcmRHcm93dGggPSB7XG4gIHRlbXBsYXRlVXJsIDogJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1ncm93dGgvZGFzaGJvYXJkLWdyb3d0aC5odG1sJyxcbiAgY29udHJvbGxlcjogRGFzaGJvYXJkR3Jvd3RoQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB0b3RhbCA6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAuY29tcG9uZW50KCdkYXNoYm9hcmRHcm93dGgnLCBkYXNoYm9hcmRHcm93dGgpOyIsImZ1bmN0aW9uIERhc2hib2FyZEdyb3d0aENvbnRyb2xsZXIoVXNlclNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmdldFVzZXJzKClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIGN0cmwudG90YWwgPSByZXNwb25zZS5kYXRhLnVzZXJzLnRvdGFsO1xuICAgICAgfSk7XG4gIH07XG5cbn1cblxuRGFzaGJvYXJkR3Jvd3RoQ29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEdyb3d0aENvbnRyb2xsZXInLCBEYXNoYm9hcmRHcm93dGhDb250cm9sbGVyKTsiLCJ2YXIgY29tbWVudEluZGV4ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWluZGV4L2NvbW1lbnQtaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IENvbW1lbnRJbmRleENvbnRyb2xsZXJcbiAgXG59XG5cbmFuZ3VsYXIubW9kdWxlKCdjb21tZW50JylcbiAgLmNvbXBvbmVudCgnY29tbWVudEluZGV4JywgY29tbWVudEluZGV4KTsiLCJmdW5jdGlvbiBDb21tZW50SW5kZXhDb250cm9sbGVyKENvbW1lbnRTZXJ2aWNlKXtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgICBjdHJsLmRlbGV0ZUNvbW1lbnQgPSBmdW5jdGlvbihjb21tZW50SWQpe1xuICAgICAgICBDb21tZW50U2VydmljZS5kZWxldGVDb21tZW50KGNvbW1lbnRJZCk7XG4gICAgfVxufVxuXG5Db21tZW50SW5kZXhDb250cm9sbGVyLiRpbmplY3QgPSBbJ0NvbW1lbnRTZXJ2aWNlJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdjb21tZW50JylcbiAgICAuY29udHJvbGxlcignQ29tbWVudEluZGV4Q29udHJvbGxlcicsIENvbW1lbnRJbmRleENvbnRyb2xsZXIpOyIsInZhciBibG9nTmV3ID0ge1xuICB0ZW1wbGF0ZVVybDogXCIuL2FwcC9jb21wb25lbnRzL2Jsb2cvYmxvZy1uZXcvYmxvZy1uZXcuaHRtbFwiLFxuICBjb250cm9sbGVyOiBCbG9nTmV3Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBwb3N0OiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnYmxvZycpXG4gIC5jb21wb25lbnQoJ2Jsb2dOZXcnLCBibG9nTmV3KTsiLCJmdW5jdGlvbiBCbG9nTmV3Q29udHJvbGxlcihCbG9nU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5zYXZlID0gZnVuY3Rpb24ocG9zdCkge1xuICAgIEJsb2dTZXJ2aWNlLm5ld1Bvc3QocG9zdClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhcIlN1Y2Nlc3NmdWxseSBzYXZlZCBuZXcgcG9zdFwiKTtcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCJibG9ncy9lZGl0L1wiICsgcG9zdC5zbHVnKTtcbiAgICAgIH0sIGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJFcnJvcjpcIiArIHJlc3BvbnNlKTtcbiAgICAgICAgY3RybC5lcnJvciA9IHJlc3BvbnNlO1xuICAgICAgfSk7XG4gIH07XG5cbn1cblxuQmxvZ05ld0NvbnRyb2xsZXIuJGluamVjdCA9IFsnQmxvZ1NlcnZpY2UnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYmxvZycpXG4gIC5jb250cm9sbGVyKCdCbG9nTmV3Q29udHJvbGxlcicsIEJsb2dOZXdDb250cm9sbGVyKTsiLCJ2YXIgZGFzaGJvYXJkT2F1dGggPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLW9hdXRoL2Rhc2hib2FyZC1vYXV0aC5odG1sJyxcbiAgY29udHJvbGxlcjogRGFzaGJvYXJkT2F1dGhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGNsaWVudHM6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAuY29tcG9uZW50KCdkYXNoYm9hcmRPYXV0aCcsIGRhc2hib2FyZE9hdXRoKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRPYXV0aENvbnRyb2xsZXIoJGh0dHAsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICRodHRwLmdldCgnb2F1dGgvY2xpZW50cycpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2cocmVzcG9uc2UpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiBlcnJvcihyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgJGxvZy5sb2cocmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgJGxvZy5sb2cocmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5EYXNoYm9hcmRPYXV0aENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZE9hdXRoQ29udHJvbGxlcicsIERhc2hib2FyZE9hdXRoQ29udHJvbGxlcik7IiwidmFyIGRhc2hib2FyZFVzZXJzID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC11c2Vycy9kYXNoYm9hcmQtdXNlcnMuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IERhc2hib2FyZFVzZXJzQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzZXJpZXM6ICc8JyxcbiAgICBsYWJlbHM6ICc8JyxcbiAgICBkYXRhOiAnPCcsXG4gICAgb3B0aW9uczogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgnZGFzaGJvYXJkVXNlcnMnLCBkYXNoYm9hcmRVc2Vycyk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyKFVzZXJTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmxhYmVscyA9IFsnLTQgV2VlaycsICctMyBXZWVrJywgJy0yIFdlZWsnLCAnLTEgV2VlayddO1xuICBjdHJsLnNlcmllcyA9IFsnTmV3IFVzZXJzJ107XG5cbiAgY3RybC5vcHRpb25zID0ge1xuICAgIHNjYWxlczoge1xuICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgfTtcblxuICBjdHJsLmRhdGEgPSBbXG4gICAgWzYsIDMsIDQsIDJdXG4gIF07XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UuZ2V0R3Jvd3RoKClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhjdHJsLmRhdGEpO1xuICAgICAgICBjdHJsLmRhdGFbMF0gPSByZXNwb25zZS5kYXRhLmdyb3d0aDtcbiAgICAgICAgJGxvZy5sb2coY3RybC5kYXRhKTtcbiAgICAgIH0pO1xuICB9O1xuXG59O1xuXG5EYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZFVzZXJzQ29udHJvbGxlcicsIERhc2hib2FyZFVzZXJzQ29udHJvbGxlcik7IiwiIiwidmFyIGVtYWlsRGFzaGJvYXJkID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZW1haWwvZW1haWwtZGFzaGJvYXJkL2VtYWlsLWRhc2hib2FyZC5odG1sJyxcbiAgY29udHJvbGxlcjogRW1haWxEYXNoYm9hcmRDb250cm9sbGVyXG59XG5cbmFuZ3VsYXIubW9kdWxlKCdlbWFpbCcpXG4gIC5jb21wb25lbnQoJ2VtYWlsRGFzaGJvYXJkJywgZW1haWxEYXNoYm9hcmQpOyIsImZ1bmN0aW9uIEVtYWlsRGFzaGJvYXJkQ29udHJvbGxlcigkbG9nKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICRsb2cubG9nKFwiRW1haWwgQ29udHJvbGxlciBJbml0aWFsaXplZFwiKTtcbiAgfVxuXG59XG5cbkVtYWlsRGFzaGJvYXJkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdlbWFpbCcpXG4gIC5jb250cm9sbGVyKCdFbWFpbERhc2hib2FyZENvbnRyb2xsZXInLCBFbWFpbERhc2hib2FyZENvbnRyb2xsZXIpOyIsInZhciBzZXR0aW5nc0luZGV4ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWluZGV4L3NldHRpbmdzLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBTZXR0aW5nc0luZGV4Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzZXR0aW5nczogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdzZXR0aW5ncycpXG4gIC5jb21wb25lbnQoJ3NldHRpbmdzSW5kZXgnLCBzZXR0aW5nc0luZGV4KTsiLCJmdW5jdGlvbiBTZXR0aW5nc0luZGV4Q29udHJvbGxlcigpe1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5zZXR0aW5ncyA9IHtcbiAgICB0YWdsaW5lOiBcIkhpZ2ggUXVhbGl0eSBQcm9ncmFtbWluZyBUdXRvcmlhbHNcIixcbiAgICBzaXRlVXJsOiBcImh0dHBzOi8vdHV0b3JpYWxlZGdlLm5ldFwiLFxuICAgIGFkbWluRW1haWw6IFwiYWRtaW5AdHV0b3JpYWxlZGdlLm5ldFwiLFxuICAgIG1ldGE6IFwifCBUdXRvcmlhbGVkZ2UubmV0XCJcbiAgfVxuXG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzZXR0aW5ncycpXG4gIC5jb250cm9sbGVyKCdTZXR0aW5nc0luZGV4Q29udHJvbGxlcicsIFNldHRpbmdzSW5kZXhDb250cm9sbGVyKTsiLCJ2YXIgc29jaWFsRGFzaGJvYXJkID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtZGFzaGJvYXJkL3NvY2lhbC1kYXNoYm9hcmQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFNvY2lhbERhc2hib2FyZENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgc29jaWFsRGFzaGJvYXJkOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbXBvbmVudCgnc29jaWFsRGFzaGJvYXJkJywgc29jaWFsRGFzaGJvYXJkKTsiLCJmdW5jdGlvbiBTb2NpYWxEYXNoYm9hcmRDb250cm9sbGVyKCRsb2cpe1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgJGxvZy5sb2coXCJIZWxsbyBXb3JsZFwiKTtcbiAgfVxufVxuXG5Tb2NpYWxEYXNoYm9hcmRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb250cm9sbGVyKCdTb2NpYWxEYXNoYm9hcmRDb250cm9sbGVyJywgU29jaWFsRGFzaGJvYXJkQ29udHJvbGxlcik7IiwidmFyIHlvdXR1YmVTdWJzY3JpYmVycyA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLmh0bWwnLFxuICBjb250cm9sbGVyOiBZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXIsIFxuICBiaW5kaW5nczoge1xuICAgIHlvdXR1YmVTdWJzY3JpYmVyczogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb21wb25lbnQoJ3lvdXR1YmVTdWJzY3JpYmVycycsIHlvdXR1YmVTdWJzY3JpYmVycyk7IiwiZnVuY3Rpb24gWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyKCl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLnlvdXR1YmVTdWJzY3JpYmVycyA9IFt7IG5hbWU6ICdlbGxpb3QnfV07XG5cbn1cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29udHJvbGxlcignWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyJywgWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyKTsiLCJmdW5jdGlvbiB5b3V0dWJlU3Vic2NyaWJlclJvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcveW91dHViZS1zdWJzY3JpYmVycycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzx5b3V0dWJlLXN1YnNjcmliZXJzPjwveW91dHViZS1zdWJzY3JpYmVycz4nXG4gICAgICB9KTtcbn1cbnlvdXR1YmVTdWJzY3JpYmVyUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29uZmlnKHlvdXR1YmVTdWJzY3JpYmVyUm91dGVzKTsiLCJ2YXIgc3RhdHNJbmRleCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zdGF0cy9zdGF0cy1pbmRleC9zdGF0cy1pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogU3RhdHNJbmRleENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgc3RhdHM6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzdGF0cycpXG4gIC5jb21wb25lbnQoJ3N0YXRzSW5kZXgnLCBzdGF0c0luZGV4KTsiLCJmdW5jdGlvbiBTdGF0c0luZGV4Q29udHJvbGxlcigkc2NvcGUpIHtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgICBjdHJsLnN0YXRzID0ge307XG5cbiAgICBjdHJsLnN0YXRzLnNlcmllcyA9IFsnVmlzaXRvcnMnLCAnUGFnZSBWaWV3cyddO1xuXG4gICAgY3RybC5zdGF0cy5yZWFsdGltZUxhYmVscyA9IFsnTW9iaWxlJywgJ1RhYmxldCcsICdEZXNrdG9wJywgJ090aGVyJ11cbiAgICBjdHJsLnN0YXRzLnRvZGF5TGFiZWxzID0gWydNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5JywgJ1N1bmRheSddO1xuICAgXG4gICAgY3RybC5zdGF0cy5yZWFsdGltZSA9IFtcbiAgICAgICAgNjUsIDU5LCAxMDgsIDIzXG4gICAgXTtcblxuICAgIGN0cmwuc3RhdHMudG9kYXkgPSBbXG4gICAgICAgIFszNDAsIDU0MywgNTEyLCA1NDMsIDQ5MywgNDQ0LCA0MzldXG4gICAgXTtcblxuICAgIGN0cmwuc3RhdHMuYmFyT3B0aW9ucyA9IHtcbiAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzp0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjdHJsLnN0YXRzLnBpZU9wdGlvbnMgPSB7XG4gICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgZGlzcGxheTogdHJ1ZVxuICAgICAgICB9XG4gICAgfTtcblxufVxuU3RhdHNJbmRleENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107XG5hbmd1bGFyLm1vZHVsZSgnc3RhdHMnKVxuICAgIC5jb250cm9sbGVyKCdTdGF0c0luZGV4Q29udHJvbGxlcicsIFN0YXRzSW5kZXhDb250cm9sbGVyKTsiLCJ2YXIgdXNlckVkaXQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvdXNlci91c2VyLWVkaXQvdXNlci1lZGl0Lmh0bWwnLFxuICBjb250cm9sbGVyOiBVc2VyRWRpdENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgdXNlcjogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29tcG9uZW50KCd1c2VyRWRpdCcsIHVzZXJFZGl0KTsiLCJmdW5jdGlvbiBVc2VyRWRpdENvbnRyb2xsZXIoVXNlclNlcnZpY2UsICRsb2csICRyb3V0ZVBhcmFtcykge1xuICB2YXIgY3RybCA9IHRoaXM7XG4gIHZhciBpZCA9ICRyb3V0ZVBhcmFtcy5pZDtcblxuICBjdHJsLnVzZXIgPSB7fTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpe1xuICAgIFVzZXJTZXJ2aWNlLmdldFVzZXIoaWQpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC51c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuICAgICAgfSk7XG4gIH1cblxufVxuXG5Vc2VyRWRpdENvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAnJGxvZycsICckcm91dGVQYXJhbXMnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29udHJvbGxlcignVXNlckVkaXRDb250cm9sbGVyJywgVXNlckVkaXRDb250cm9sbGVyKTsiLCJ2YXIgdXNlckluZGV4ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvdXNlci91c2VyLWluZGV4L3VzZXItaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFVzZXJJbmRleENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgdXNlcnM6ICc8JyxcbiAgICBwYWdlU2V0dGluZ3M6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb21wb25lbnQoJ3VzZXJJbmRleCcsIHVzZXJJbmRleCk7IiwiZnVuY3Rpb24gVXNlckluZGV4Q29udHJvbGxlcihVc2VyU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC51c2VycyA9IFtdO1xuICBjdHJsLnBhZ2VTZXR0aW5ncyA9IFtdO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmdldFVzZXJzKClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnVzZXJzID0gcmVzcG9uc2UuZGF0YS51c2Vycy5kYXRhO1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZS5kYXRhLnVzZXJzLmRhdGEpO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEudXNlcnM7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuZ2V0TmV4dFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBVc2VyU2VydmljZS5nZXRVc2VycyhjdHJsLnBhZ2VTZXR0aW5ncy5jdXJyZW50X3BhZ2UgKyAxKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudXNlcnMgPSByZXNwb25zZS5kYXRhLnVzZXJzLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS51c2VycztcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5nZXRQcmV2UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmdldFVzZXJzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSAtIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC51c2VycyA9IHJlc3BvbnNlLmRhdGEudXNlcnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLnVzZXJzO1xuICAgICAgfSk7XG4gIH1cblxufTtcblxuVXNlckluZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbnRyb2xsZXIoJ1VzZXJJbmRleENvbnRyb2xsZXInLCBVc2VySW5kZXhDb250cm9sbGVyKTsiLCJ2YXIgdXNlck5ldyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3VzZXIvdXNlci1uZXcvdXNlci1uZXcuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFVzZXJOZXdDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHVzZXI6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbXBvbmVudCgndXNlck5ldycsIHVzZXJOZXcpOyIsImZ1bmN0aW9uIFVzZXJOZXdDb250cm9sbGVyKFVzZXJTZXJ2aWNlKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwubmV3VXNlciA9IGZ1bmN0aW9uKHVzZXIpe1xuICAgIFVzZXJTZXJ2aWNlLm5ld1VzZXIodXNlcik7XG4gIH07XG5cbn07XG5cblVzZXJOZXdDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJ107XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbnRyb2xsZXIoJ1VzZXJOZXdDb250cm9sbGVyJywgVXNlck5ld0NvbnRyb2xsZXIpOyIsInZhciBmYWNlYm9va1dpZGdldCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvZmFjZWJvb2std2lkZ2V0L2ZhY2Vib29rLXdpZGdldC5odG1sJ1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbXBvbmVudCgnZmFjZWJvb2tXaWRnZXQnLCBmYWNlYm9va1dpZGdldCk7XG4gICIsInZhciB0d2l0dGVyV2lkZ2V0ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy90d2l0dGVyLXdpZGdldC90d2l0dGVyLXdpZGdldC5odG1sJyxcbiAgY29udHJvbGxlcjogU29jaWFsVHdpdHRlckNvbnRyb2xsZXJcbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb21wb25lbnQoJ3R3aXR0ZXJXaWRnZXQnLCB0d2l0dGVyV2lkZ2V0KTsiLCJmdW5jdGlvbiBTb2NpYWxUd2l0dGVyQ29udHJvbGxlcigpe1xuICB2YXIgY3RybCA9IHRoaXM7XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29udHJvbGxlcignU29jaWFsVHdpdHRlckNvbnRyb2xsZXInLCBTb2NpYWxUd2l0dGVyQ29udHJvbGxlcik7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
