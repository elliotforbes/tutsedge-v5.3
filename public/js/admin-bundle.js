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
      return $http.get("api/posts/" + id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGVzLmpzIiwiY29tbW9uL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQuanMiLCJjb21tb24vbG9hZGluZy9sb2FkaW5nLmNvbnRyb2xsZXIuanMiLCJjb21tb24vc2VydmljZXMvZmFjZWJvb2suc2VydmljZS5qcyIsImNvbW1vbi9zZXJ2aWNlcy9nb29nbGVQbHVzLnNlcnZpY2UuanMiLCJjb21tb24vc2VydmljZXMvdHdpdHRlci5zZXJ2aWNlLmpzIiwiY29tbW9uL3NlcnZpY2VzL3lvdXR1YmUuc2VydmljZS5qcyIsImNvbW1vbi90b3AtbmF2L3RvcC1uYXYuY29tcG9uZW50LmpzIiwiY29tbW9uL3RvcC1uYXYvdG9wLW5hdi5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUuc2VydmljZS5qcyIsImNvbXBvbmVudHMvYmxvZy9ibG9kLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvYmxvZy9ibG9nLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvYmxvZy9ibG9nLnNlcnZpY2UuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5tb2R1bGUuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS5tb2R1bGUuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2Uuc2VydmljZS5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUuanMiLCJjb21wb25lbnRzL2VtYWlsL2VtYWlsLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZW1haWwvZW1haWwucm91dGVzLmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwucm91dGVzLmpzIiwiY29tcG9uZW50cy9zdGF0cy9zdGF0cy5tb2R1bGUuanMiLCJjb21wb25lbnRzL3N0YXRzL3N0YXRzLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvdGFncy90YWcubW9kdWxlLmpzIiwiY29tcG9uZW50cy90YWdzL3RhZy5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXIubW9kdWxlLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXIucm91dGVzLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXIuc2VydmljZS5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1lZGl0L2FydGljbGUtZWRpdC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtZWRpdC9hcnRpY2xlLWVkaXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1ob21lL2FydGljbGVzLWhvbWUuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWhvbWUvYXJ0aWNsZXMtaG9tZS5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLW5ldy9hcnRpY2xlLW5ldy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtbmV3L2FydGljbGUtbmV3LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1lZGl0L2Jsb2ctZWRpdC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1lZGl0L2Jsb2ctZWRpdC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9ibG9nL2Jsb2ctaW5kZXgvYmxvZy1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1pbmRleC9ibG9nLWluZGV4LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Jsb2cvYmxvZy1uZXcvYmxvZy1uZXcuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9ibG9nL2Jsb2ctbmV3L2Jsb2ctbmV3LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1pbmRleC9jb21tZW50LWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWluZGV4L2NvbW1lbnQtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLWVkaXQvY291cnNlLWVkaXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UtbmV3L2NvdXJzZS1uZXcuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1uZXcvY291cnNlLW5ldy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1zZWFyY2gvY291cnNlLXNlYXJjaC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLXNlYXJjaC9jb3Vyc2Utc2VhcmNoLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYWN0aW9ucy9kYXNoYm9hcmQtYWN0aW9ucy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYWN0aW9ucy9kYXNoYm9hcmQtYWN0aW9ucy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFuYWx5dGljcy9kYXNoYm9hcmQtYW5hbHl0aWNzLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFuYWx5dGljcy9kYXNoYm9hcmQtYW5hbHl0aWNzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuY29tcG9uZW50cy5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1ncm93dGgvZGFzaGJvYXJkLWdyb3d0aC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtZ3Jvd3RoL2Rhc2hib2FyZC1ncm93dGguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1vYXV0aC9kYXNoYm9hcmQtb2F1dGguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLW9hdXRoL2Rhc2hib2FyZC1vYXV0aC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZW1haWwvZW1haWwtZGFzaGJvYXJkL2VtYWlsLWRhc2hib2FyZC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2VtYWlsL2VtYWlsLWRhc2hib2FyZC9lbWFpbC1kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtaW5kZXgvc2V0dGluZ3MtaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1pbmRleC9zZXR0aW5ncy1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLWRhc2hib2FyZC9zb2NpYWwtZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC1kYXNoYm9hcmQvc29jaWFsLWRhc2hib2FyZC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc29jaWFsL3lvdXR1YmUtc3Vic2NyaWJlcnMveW91dHViZS1zdWJzY3JpYmVycy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMtaW5kZXgvc3RhdHMtaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zdGF0cy9zdGF0cy1pbmRleC9zdGF0cy1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLWluZGV4L3VzZXItaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItaW5kZXgvdXNlci1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItbmV3L3VzZXItbmV3LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLW5ldy91c2VyLW5ldy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvZmFjZWJvb2std2lkZ2V0L2ZhY2Vib29rLXdpZGdldC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy90d2l0dGVyLXdpZGdldC90d2l0dGVyLXdpZGdldC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy90d2l0dGVyLXdpZGdldC90d2l0dGVyLXdpZGdldC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FDQUE7QUNBQTtBQ0FBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUNBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhZG1pbi1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgncm9vdCcsIFtcbiAgICAnbmdSb3V0ZScsXG4gICAgJ2FydGljbGVzJyxcbiAgICAnZGFzaGJvYXJkJyxcbiAgICAndXNlcicsXG4gICAgJ2NvbW1lbnQnLFxuICAgICdjb3Vyc2VzJyxcbiAgICAnc3RhdHMnLFxuICAgICdzZXR0aW5ncycsXG4gICAgJ3NvY2lhbCcsXG4gICAgJ2Jsb2cnLFxuICAgICd0YWdzJyxcbiAgICAnZW1haWwnXG5dKTtcbiIsImZ1bmN0aW9uIHJvdXRlUHJvdmlkZXIoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignLycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxkYXNoYm9hcmQ+PC9kYXNoYm9hcmQ+J1xuICAgICAgfSk7XG59XG5yb3V0ZVByb3ZpZGVyLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbmZpZyhyb3V0ZVByb3ZpZGVyKTtcbiIsInZhciBsb2FkaW5nID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vY29tbW9uL2xvYWRpbmcvbG9hZGluZy5odG1sJyxcbiAgY29udHJvbGxlcjogTG9hZGluZ0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgaXNMb2FkaW5nOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCdsb2FkaW5nJywgbG9hZGluZyk7IiwiZnVuY3Rpb24gTG9hZGluZ0NvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0xvYWRpbmdDb250cm9sbGVyJywgTG9hZGluZ0NvbnRyb2xsZXIpOyIsIiIsIiIsIiIsIiIsInZhciB0b3BOYXYgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tbW9uL3RvcC1uYXYvdG9wLW5hdi5odG1sJyxcbiAgY29udHJvbGxlcjogVG9wTmF2Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhclxuICAubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgndG9wTmF2JywgdG9wTmF2KTtcbiIsImZ1bmN0aW9uIFRvcE5hdkNvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ1RvcE5hdkNvbnRyb2xsZXInLCBUb3BOYXZDb250cm9sbGVyKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycsIFtdKTsiLCJmdW5jdGlvbiBhcnRpY2xlUm91dGVQcm92aWRlcigkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvYXJ0aWNsZXMnLHtcbiAgICAgICAgdGVtcGxhdGU6ICc8YXJ0aWNsZXMtaG9tZT48L2FydGljbGVzLWhvbWU+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvYXJ0aWNsZS9uZXcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGFydGljbGUtbmV3PjwvYXJ0aWNsZS1uZXc+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvYXJ0aWNsZS9lZGl0LzpzbHVnJywge1xuICAgICAgICB0ZW1wbGF0ZTogJzxhcnRpY2xlLWVkaXQ+PC9hcnRpY2xlLWVkaXQ+J1xuICAgICAgfSlcbiAgICAgIC5vdGhlcndpc2UoeyBcbiAgICAgICAgdGVtcGxhdGU6ICc8aDE+Tm90IEZvdW5kPC9oMT4nXG4gICAgICB9KTtcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpLmNvbmZpZyhhcnRpY2xlUm91dGVQcm92aWRlcik7XG5hcnRpY2xlUm91dGVQcm92aWRlci4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuIiwiZnVuY3Rpb24gQXJ0aWNsZVNlcnZpY2UoJGh0dHAsICRsb2csIENTUkZfVE9LRU4pIHtcblxuICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1Dc3JmLVRva2VuJ10gPSBDU1JGX1RPS0VOO1xuXG4gIGZ1bmN0aW9uIG5ld0FydGljbGUoYXJ0aWNsZSkge1xuICAgIGNvbnNvbGUubG9nKGFydGljbGUpO1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJ2FydGljbGVzP3Y9JyArIERhdGUubm93KCksXG4gICAgICBkYXRhOiBhcnRpY2xlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWFyY2gocGFnZSwgdGl0bGUpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICdhcGkvbGVzc29ucz9wYWdlPScgKyBwYWdlICsgXCImdGl0bGU9XCIgKyB0aXRsZVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQXJ0aWNsZShhcnRpY2xlKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHVybDogJ2FydGljbGVzLycgKyBhcnRpY2xlLnNsdWcgKyBcIj92PVwiICsgRGF0ZS5ub3coKSxcbiAgICAgIGRhdGE6IGFydGljbGVcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZUFydGljbGUoaWQpIHtcbiAgICAkbG9nLmxvZyhcIlBsYWNlaG9sZGVyIGZvciBkZWxldGluZyBhbiBhcnRpY2xlXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXJ0aWNsZShzbHVnKSB7XG4gICAgcmV0dXJuICRodHRwLmdldChcImFwaS9sZXNzb24vXCIgKyBzbHVnICsgXCI/dj1cIiArIERhdGUubm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXJ0aWNsZXMocGFnZSl7XG4gICAgcmV0dXJuICRodHRwLmdldChcImFwaS9sZXNzb25zP3BhZ2U9XCIgKyBwYWdlICsgXCImdj1cIiArIERhdGUubm93KCkpO1xuICB9XG5cbiAgdmFyIHNlcnZpY2UgPSB7XG4gICAgbmV3QXJ0aWNsZSA6IG5ld0FydGljbGUsXG4gICAgdXBkYXRlQXJ0aWNsZSA6IHVwZGF0ZUFydGljbGUsXG4gICAgZGVsZXRlQXJ0aWNsZSA6IGRlbGV0ZUFydGljbGUsXG4gICAgZ2V0QXJ0aWNsZSA6IGdldEFydGljbGUsXG4gICAgc2VhcmNoOiBzZWFyY2gsXG4gICAgZ2V0QXJ0aWNsZXM6IGdldEFydGljbGVzXG4gIH07XG5cbiAgcmV0dXJuIHNlcnZpY2U7XG5cbn1cblxuQXJ0aWNsZVNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZycsICdDU1JGX1RPS0VOJ107ICBcblxuYW5ndWxhclxuICAubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5mYWN0b3J5KCdBcnRpY2xlU2VydmljZScsIEFydGljbGVTZXJ2aWNlKTsiLCJhbmd1bGFyLm1vZHVsZSgnYmxvZycsIFtdKTsiLCJmdW5jdGlvbiBibG9nUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9ibG9nJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGJsb2ctaW5kZXg+PC9ibG9nLWluZGV4PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL2Jsb2cvbmV3Jywge1xuICAgICAgICB0ZW1wbGF0ZTogJzxibG9nLW5ldz48L2Jsb2ctbmV3PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL2Jsb2cvZWRpdC86aWQnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGJsb2ctZWRpdD48L2Jsb2ctZWRpdD4nXG4gICAgICB9KTtcbn07XG5cbmJsb2dSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmFuZ3VsYXIubW9kdWxlKCdibG9nJykuY29uZmlnKGJsb2dSb3V0ZXMpO1xuIiwiZnVuY3Rpb24gQmxvZ1NlcnZpY2UoJGh0dHAsICRsb2cpe1xuICAgIHZhciBzZXJ2aWNlID0ge307XG5cbiAgICBmdW5jdGlvbiBkZWxldGVQb3N0KHNsdWcpIHtcbiAgICAgICAgJGxvZy5sb2coXCJEZWxldGluZyBhIHBvc3Qgd2l0aCBzbHVnOiBcIiArIHNsdWcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc3QocG9zdCkge1xuICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgbWV0aG9kIDogJ1BBVENIJyxcbiAgICAgICAgdXJsOiAncG9zdHMvJyArIHBvc3QuaWQgKyBcIj92PVwiICsgRGF0ZS5ub3coKSxcbiAgICAgICAgZGF0YSA6IHBvc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBuZXdQb3N0KHBvc3QpIHtcbiAgICAgICRsb2cubG9nKHBvc3QpO1xuICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJ3Bvc3RzJyxcbiAgICAgICAgZGF0YTogcG9zdFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VhcmNoKHBhZ2UsIHRpdGxlKSB7XG4gICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnYXBpL3Bvc3RzP3BhZ2U9JyArIHBhZ2UgKyAnJnRpdGxlPScgKyB0aXRsZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UG9zdChpZCkge1xuICAgICAgcmV0dXJuICRodHRwLmdldChcImFwaS9wb3N0cy9cIiArIGlkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQb3N0cyhwYWdlKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KFwiYXBpL3Bvc3RzP3BhZ2U9XCIgKyBwYWdlICsgXCImdj1cIiArIERhdGUubm93KCkpO1xuICAgIH1cbiAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgZGVsZXRlUG9zdCA6IGRlbGV0ZVBvc3QsXG4gICAgICAgIHVwZGF0ZVBvc3QgOiB1cGRhdGVQb3N0LFxuICAgICAgICBuZXdQb3N0IDogbmV3UG9zdCxcbiAgICAgICAgc2VhcmNoIDogc2VhcmNoLFxuICAgICAgICBnZXRQb3N0IDogZ2V0UG9zdCxcbiAgICAgICAgZ2V0UG9zdHMgOiBnZXRQb3N0c1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VydmljZTtcbn1cbkJsb2dTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2Jsb2cnKVxuICAgIC5mYWN0b3J5KCdCbG9nU2VydmljZScsIEJsb2dTZXJ2aWNlKTsiLCJhbmd1bGFyLm1vZHVsZSgnY29tbWVudCcsIFtdKTsiLCJmdW5jdGlvbiBjb21tZW50Um91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9jb21tZW50cycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxjb21tZW50LWluZGV4PjwvY29tbWVudC1pbmRleD4nXG4gICAgICB9KTtcbn07XG5jb21tZW50Um91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpLmNvbmZpZyhjb21tZW50Um91dGVzKTtcbiIsImZ1bmN0aW9uIENvbW1lbnRTZXJ2aWNlKCRsb2cpe1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlQ29tbWVudChjb21tZW50SWQpIHtcbiAgICAgICAgJGxvZy5sb2coXCJEZWxldGluZyBhIGNvbW1lbnQgd2l0aCBpZDogXCIgKyBjb21tZW50SWQpO1xuICAgIH1cblxuICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICBkZWxldGVDb21tZW50IDogZGVsZXRlQ29tbWVudFxuICAgIH07XG5cbiAgICByZXR1cm4gc2VydmljZTtcbn1cbkNvbW1lbnRTZXJ2aWNlLiRpbmplY3QgPSBbJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnKVxuICAgIC5mYWN0b3J5KCdDb21tZW50U2VydmljZScsIENvbW1lbnRTZXJ2aWNlKTsiLCJhbmd1bGFyLm1vZHVsZSgnY291cnNlcycsIFtdKTtcbiIsImZ1bmN0aW9uIGNvdXJzZVJvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvY291cnNlcycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxjb3Vyc2Utc2VhcmNoPjwvY291cnNlLXNlYXJjaD4nXG4gICAgICB9KVxuICAgICAgLndoZW4oJy9jb3Vyc2UvbmV3Jywge1xuICAgICAgICB0ZW1wbGF0ZTogJzxjb3Vyc2UtbmV3PjwvY291cnNlLW5ldz4nXG4gICAgICB9KVxuICAgICAgLndoZW4oJy9jb3Vyc2UvZWRpdC86c2x1ZycsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8Y291cnNlLWVkaXQ+PC9jb3Vyc2UtZWRpdD4nXG4gICAgICB9KVxufVxuY291cnNlUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmNvbmZpZyhjb3Vyc2VSb3V0ZXMpO1xuIiwiZnVuY3Rpb24gQ291cnNlU2VydmljZSgkaHR0cCwgJGxvZywgQ1NSRl9UT0tFTikge1xuXG4gICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUNzcmYtVG9rZW4nXSA9IENTUkZfVE9LRU47XG5cbiAgZnVuY3Rpb24gbmV3Q291cnNlKGNvdXJzZSkge1xuICAgIGNvbnNvbGUubG9nKGNvdXJzZSk7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnY291cnNlcz92PScgKyBEYXRlLm5vdygpLFxuICAgICAgZGF0YTogY291cnNlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb3Vyc2Uoc2x1Zykge1xuICAgIHJldHVybiAkaHR0cC5nZXQoXCJhcGkvY291cnNlL1wiICsgc2x1ZyArIFwiP3Y9XCIgKyBEYXRlLm5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvdXJzZXMocGFnZSl7XG4gICAgcmV0dXJuICRodHRwLmdldChcImFwaS9jb3Vyc2VzP3BhZ2U9XCIgKyBwYWdlICsgXCImdj1cIiArIERhdGUubm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VhcmNoKHBhZ2UsIHRpdGxlKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnYXBpL2xlc3NvbnM/cGFnZT0nICsgcGFnZSArIFwiJnRpdGxlPVwiICsgdGl0bGVcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNvdXJzZShjb3Vyc2UpIHtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgdXJsOiAnY291cnNlcy8nICsgY291cnNlLnNsdWcgKyBcIj92PVwiICsgRGF0ZS5ub3coKSxcbiAgICAgIGRhdGE6IGNvdXJzZVxuICAgIH0pO1xuICB9XG4gIFxuXG4gIHZhciBzZXJ2aWNlID0ge1xuICAgIHVwZGF0ZUNvdXJzZSA6IHVwZGF0ZUNvdXJzZSxcbiAgICBnZXRDb3Vyc2UgOiBnZXRDb3Vyc2UsXG4gICAgbmV3Q291cnNlIDogbmV3Q291cnNlLFxuICAgIHNlYXJjaCA6IHNlYXJjaCxcbiAgICBnZXRDb3Vyc2VzIDogZ2V0Q291cnNlc1xuICB9O1xuXG4gIHJldHVybiBzZXJ2aWNlO1xufVxuXG5Db3Vyc2VTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnLCAnQ1NSRl9UT0tFTiddOyAgXG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgnY291cnNlcycpXG4gIC5mYWN0b3J5KCdDb3Vyc2VTZXJ2aWNlJywgQ291cnNlU2VydmljZSk7IiwidmFyIGRhc2hib2FyZCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IERhc2hib2FyZENvbnRyb2xsZXJcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgnZGFzaGJvYXJkJywgZGFzaGJvYXJkKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRDb250cm9sbGVyKCkge1xuICB2YXIgY3RybCA9IHRoaXM7XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb250cm9sbGVyKCdEYXNoYm9hcmRDb250cm9sbGVyJywgRGFzaGJvYXJkQ29udHJvbGxlcik7IiwiYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcsIFsnY2hhcnQuanMnXSk7IiwiYW5ndWxhci5tb2R1bGUoJ2VtYWlsJywgW10pO1xuIiwiZnVuY3Rpb24gZW1haWxSb3V0ZVByb3ZpZGVyKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9lbWFpbCcsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxlbWFpbC1kYXNoYm9hcmQ+PC9lbWFpbC1kYXNoYm9hcmQ+J1xuICAgICAgfSk7XG59XG5lbWFpbFJvdXRlUHJvdmlkZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ2VtYWlsJylcbiAgLmNvbmZpZyhlbWFpbFJvdXRlUHJvdmlkZXIpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJyxbXSk7IiwiZnVuY3Rpb24gc2V0dGluZ3NSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3NldHRpbmdzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHNldHRpbmdzLWluZGV4Pjwvc2V0dGluZ3MtaW5kZXg+J1xuICAgICAgfSk7XG59XG5zZXR0aW5nc1JvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdzZXR0aW5ncycpXG4gIC5jb25maWcoc2V0dGluZ3NSb3V0ZXMpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcsIFtdKTsiLCJmdW5jdGlvbiBzb2NpYWxSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3NvY2lhbCcsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxzb2NpYWwtZGFzaGJvYXJkPjwvc29jaWFsLWRhc2hib2FyZD4nXG4gICAgICB9KTtcbn1cbnNvY2lhbFJvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbmZpZyhzb2NpYWxSb3V0ZXMpO1xuICAiLCJhbmd1bGFyLm1vZHVsZSgnc3RhdHMnLCBbJ2NoYXJ0LmpzJ10pOyIsImZ1bmN0aW9uIHN0YXRzUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9zdGF0cycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxzdGF0cy1pbmRleD48L3N0YXRzLWluZGV4PidcbiAgICAgIH0pO1xufTtcblxuc3RhdHNSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmFuZ3VsYXIubW9kdWxlKCdzdGF0cycpLmNvbmZpZyhzdGF0c1JvdXRlcyk7XG4iLCJhbmd1bGFyLm1vZHVsZSgndGFncycsIFtdKTsiLCJmdW5jdGlvbiBUYWdTZXJ2aWNlKCRodHRwLCAkbG9nKSB7XG5cbiAgZnVuY3Rpb24gZ2V0VGFncygpIHtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvdGFncycpO1xuICB9XG5cbiAgdmFyIHNlcnZpY2UgPSB7XG4gICAgZ2V0VGFncyA6IGdldFRhZ3NcbiAgfTtcblxuICByZXR1cm4gc2VydmljZTtcblxufVxuXG5UYWdTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnXTsgIFxuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ3RhZ3MnKVxuICAuZmFjdG9yeSgnVGFnU2VydmljZScsIFRhZ1NlcnZpY2UpOyIsImFuZ3VsYXIubW9kdWxlKCd1c2VyJywgW10pOyIsImZ1bmN0aW9uIHVzZXJSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3VzZXJzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHVzZXItaW5kZXg+PC91c2VyLWluZGV4PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL3VzZXIvZWRpdC86aWQnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPHVzZXItZWRpdD48L3VzZXItZWRpdD4nICBcbiAgICAgIH0pXG4gICAgICAud2hlbignL3VzZXIvbmV3Jywge1xuICAgICAgICB0ZW1wbGF0ZTogJzx1c2VyLW5ldz48L3VzZXItbmV3PidcbiAgICAgIH0pO1xufTtcblxudXNlclJvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuYW5ndWxhci5tb2R1bGUoJ3VzZXInKS5jb25maWcodXNlclJvdXRlcyk7XG4iLCJmdW5jdGlvbiBVc2VyU2VydmljZSgkbG9nLCAkaHR0cCkge1xuXG4gICAgZnVuY3Rpb24gbmV3VXNlcih1c2VyKSB7XG4gICAgICAgICRsb2cubG9nKFwiQWRkaW5nIE5ldyBVc2VyXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVzZXIoaWQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXIvJyArIGlkICsgXCI/dj1cIiArIERhdGUubm93KCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVzZXJzKHBhZ2UpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXJzP3BhZ2U9JyArIHBhZ2UgKyBcIj92PVwiICsgRGF0ZS5ub3coKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0R3Jvd3RoKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvdXNlcnMvZ3Jvd3RoJyArIFwiP3Y9XCIgKyBEYXRlLm5vdygpKTtcbiAgICB9XG5cbiAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgbmV3VXNlcjogbmV3VXNlcixcbiAgICAgICAgZ2V0VXNlcjogZ2V0VXNlcixcbiAgICAgICAgZ2V0VXNlcnM6IGdldFVzZXJzLFxuICAgICAgICBnZXRHcm93dGg6IGdldEdyb3d0aFxuICAgIH07XG5cbiAgICByZXR1cm4gc2VydmljZTtcbn07XG5cblVzZXJTZXJ2aWNlLiRpbmplY3QgPSBbJyRsb2cnLCAnJGh0dHAnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAgIC5mYWN0b3J5KCdVc2VyU2VydmljZScsIFVzZXJTZXJ2aWNlKTsiLCJ2YXIgYXJ0aWNsZUVkaXQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWVkaXQvYXJ0aWNsZS1lZGl0Lmh0bWwnLFxuICBjb250cm9sbGVyOiBBcnRpY2xlRWRpdENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgYXJ0aWNsZTogJzwnLFxuICAgIHRhZ3M6ICc8JyxcbiAgICBjb3Vyc2VzOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29tcG9uZW50KCdhcnRpY2xlRWRpdCcsIGFydGljbGVFZGl0KTsiLCJmdW5jdGlvbiBBcnRpY2xlRWRpdENvbnRyb2xsZXIoJGxvZywgQXJ0aWNsZVNlcnZpY2UsICRyb3V0ZVBhcmFtcywgVGFnU2VydmljZSwgQ291cnNlU2VydmljZSwgJHEsICR0aW1lb3V0KSB7XG4gIHZhciBjdHJsID0gdGhpcztcbiAgdmFyIHNsdWcgPSAkcm91dGVQYXJhbXMuc2x1ZztcbiAgY3RybC5hcnRpY2xlID0ge307XG4gIGN0cmwudGFncyA9IFtdO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGUoc2x1ZylcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGUgPSByZXNwb25zZS5kYXRhLmxlc3NvbjtcbiAgICAgICAgcmV0dXJuIFRhZ1NlcnZpY2UuZ2V0VGFncygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnRhZ3MgPSByZXNwb25zZS5kYXRhLnRhZ3MuZGF0YTtcbiAgICAgICAgcmV0dXJuIENvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmNvdXJzZXMgPSByZXNwb25zZS5kYXRhLmNvdXJzZXMuZGF0YTtcbiAgICAgICAgJGxvZy5sb2coXCJDb21wbGV0ZWQgTG9hZGluZ1wiKTtcbiAgICAgIH0pXG4gIH07XG4gIFxuICBjdHJsLnNhdmUgPSBmdW5jdGlvbihhcnRpY2xlKSB7XG4gICAgJGxvZy5sb2coXCJTYXZlIGFueSB1cGRhdGVzIHRvIHRoZSBhcnRpY2xlXCIpO1xuICAgIEFydGljbGVTZXJ2aWNlLnVwZGF0ZUFydGljbGUoYXJ0aWNsZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhcIlN1Y2Nlc3NmdWxseSBTYXZlZCBBcnRpY2xlXCIpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9LCBmdW5jdGlvbiBlcnJvcihyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiRmFpbGVkIHRvIHNhdmUgYXJ0aWNsZVwiKTtcbiAgICAgIH0pO1xuICB9O1xuXG59O1xuXG5BcnRpY2xlRWRpdENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZycsICdBcnRpY2xlU2VydmljZScsICckcm91dGVQYXJhbXMnLCAnVGFnU2VydmljZScsICdDb3Vyc2VTZXJ2aWNlJywgJyRxJywgJyR0aW1lb3V0J107XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb250cm9sbGVyKCdBcnRpY2xlRWRpdENvbnRyb2xsZXInLCBBcnRpY2xlRWRpdENvbnRyb2xsZXIpO1xuIiwidmFyIGFydGljbGVzSG9tZSA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtaG9tZS9hcnRpY2xlcy1ob21lLmh0bWwnLFxuICBjb250cm9sbGVyOiBBcnRpY2xlc0hvbWVDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGVzOiAnPCcsXG4gICAgcGFnZVNldHRpbmdzOiAnPCcsXG4gICAgdGl0bGU6ICc9PydcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbXBvbmVudCgnYXJ0aWNsZXNIb21lJywgYXJ0aWNsZXNIb21lKTsiLCJmdW5jdGlvbiBBcnRpY2xlc0hvbWVDb250cm9sbGVyKEFydGljbGVTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmFydGljbGVzID0gW107XG5cbiAgY3RybC5wYWdlID0gMTtcbiAgY3RybC5wYWdlU2V0dGluZ3MgPSBbXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpe1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zO1xuICAgICAgfSk7XG4gICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgUmV0cmlldmVkIGxlc3NvbnM6IFwiICsgY3RybC5hcnRpY2xlcyk7ICBcbiAgfVxuXG4gIGN0cmwuZ2V0UGFnZXMgPSBmdW5jdGlvbihudW1iZXIpIHtcbiAgICBpZihudW1iZXIgPT0gdW5kZWZpbmVkKXtcbiAgICAgIG51bWJlciA9IDE7XG4gICAgfVxuICAgIHZhciB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKG51bWJlciAvIDEwKTtcbiAgICByZXR1cm4gbmV3IEFycmF5KHRvdGFsUGFnZXMpO1xuICB9O1xuXG4gIGN0cmwuc2VhcmNoID0gZnVuY3Rpb24oKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2Uuc2VhcmNoKGN0cmwucGFnZSwgY3RybC50aXRsZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zO1xuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLnNldFBhZ2UgPSBmdW5jdGlvbihwYWdlKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZXMocGFnZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zO1xuICAgICAgfSk7XG4gIH07XG5cbiAgY3RybC5nZXROZXh0UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSArIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucztcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5nZXRQcmV2UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSAtIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucztcbiAgICAgIH0pO1xuICB9XG5cblxufTtcblxuQXJ0aWNsZXNIb21lQ29udHJvbGxlci4kaW5qZWN0ID0gWydBcnRpY2xlU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb250cm9sbGVyKCdBcnRpY2xlc0hvbWVDb250cm9sbGVyJywgQXJ0aWNsZXNIb21lQ29udHJvbGxlcik7IiwidmFyIGFydGljbGVOZXcgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLW5ldy9hcnRpY2xlLW5ldy5odG1sJyxcbiAgY29udHJvbGxlcjogQXJ0aWNsZU5ld0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgYXJ0aWNsZTogJzwnLFxuICAgIHRhZ3M6ICc8JyxcbiAgICBlcnJvcjogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb21wb25lbnQoJ2FydGljbGVOZXcnLCBhcnRpY2xlTmV3KTsiLCJmdW5jdGlvbiBBcnRpY2xlTmV3Q29udHJvbGxlcihBcnRpY2xlU2VydmljZSwgQ291cnNlU2VydmljZSwgJGxvZywgVGFnU2VydmljZSwgJGxvY2F0aW9uKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmFydGljbGUgPSB7fTtcbiAgY3RybC5jb3Vyc2VzID0gW107XG4gIGN0cmwudGFncyA9IFtdO1xuXG4gIGN0cmwuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIENvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKSB7XG4gICAgICAgIGN0cmwuY291cnNlcyA9IHJlc3BvbnNlLmRhdGEuY291cnNlcy5kYXRhO1xuICAgICAgICByZXR1cm4gVGFnU2VydmljZS5nZXRUYWdzKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudGFncyA9IHJlc3BvbnNlLmRhdGEudGFncy5kYXRhO1xuICAgICAgICAkbG9nLmxvZyhcIkZpbmlzaGVkIGxvYWRpbmdcIik7ICAgICAgXG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKGFydGljbGUpIHtcbiAgICBBcnRpY2xlU2VydmljZS5uZXdBcnRpY2xlKGFydGljbGUpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgU2F2ZWQgQXJ0aWNsZVwiKTtcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCJhcnRpY2xlL2VkaXQvXCIgKyBhcnRpY2xlLnNsdWcpO1xuICAgICAgfSwgZnVuY3Rpb24gZXJyb3IocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhcIkVycm9yOiBcIiArIHJlc3BvbnNlKTtcbiAgICAgICAgY3RybC5lcnJvciA9IHJlc3BvbnNlO1xuICAgICAgfSk7XG4gIH07ICBcblxufTtcblxuQXJ0aWNsZU5ld0NvbnRyb2xsZXIuJGluamVjdCA9IFsnQXJ0aWNsZVNlcnZpY2UnLCAnQ291cnNlU2VydmljZScsICckbG9nJywgJ1RhZ1NlcnZpY2UnLCAnJGxvY2F0aW9uJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb250cm9sbGVyKCdBcnRpY2xlTmV3Q29udHJvbGxlcicsIEFydGljbGVOZXdDb250cm9sbGVyKTsiLCJ2YXIgYmxvZ0VkaXQgPSB7XG4gIHRlbXBsYXRlVXJsOiBcIi4vYXBwL2NvbXBvbmVudHMvYmxvZy9ibG9nLWVkaXQvYmxvZy1lZGl0Lmh0bWxcIixcbiAgY29udHJvbGxlcjogQmxvZ0VkaXRDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHBvc3Q6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdibG9nJylcbiAgLmNvbXBvbmVudCgnYmxvZ0VkaXQnLCBibG9nRWRpdCk7IiwiZnVuY3Rpb24gQmxvZ0VkaXRDb250cm9sbGVyKEJsb2dTZXJ2aWNlLCAkbG9nLCAkcm91dGVQYXJhbXMpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuICBjdHJsLmFydGljbGUgPSB7fTtcbiAgdmFyIGlkID0gJHJvdXRlUGFyYW1zLmlkO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIEJsb2dTZXJ2aWNlLmdldFBvc3QoaWQpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5wb3N0ID0gcmVzcG9uc2UuZGF0YS5wb3N0O1xuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLnNhdmUgPSBmdW5jdGlvbihwb3N0KSB7XG4gICAgQmxvZ1NlcnZpY2UudXBkYXRlUG9zdChwb3N0KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbn1cblxuQmxvZ0VkaXRDb250cm9sbGVyLiRpbmplY3QgPSBbJ0Jsb2dTZXJ2aWNlJywgJyRsb2cnLCAnJHJvdXRlUGFyYW1zJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdibG9nJylcbiAgLmNvbnRyb2xsZXIoJ0Jsb2dFZGl0Q29udHJvbGxlcicsIEJsb2dFZGl0Q29udHJvbGxlcik7IiwidmFyIGJsb2dJbmRleCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Jsb2cvYmxvZy1pbmRleC9ibG9nLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBCbG9nSW5kZXhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHBvc3RzOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnYmxvZycpXG4gIC5jb21wb25lbnQoJ2Jsb2dJbmRleCcsIGJsb2dJbmRleCk7IiwiZnVuY3Rpb24gQmxvZ0luZGV4Q29udHJvbGxlcihCbG9nU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5hcnRpY2xlcyA9IFtdO1xuXG4gIGN0cmwucGFnZSA9IDE7XG4gIGN0cmwucGFnZVNldHRpbmdzID0gW107XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgQmxvZ1NlcnZpY2UuZ2V0UG9zdHMoY3RybC5wYWdlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwucG9zdHMgPSByZXNwb25zZS5kYXRhLnBvc3RzLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zO1xuICAgICAgfSk7XG4gICAgICAkbG9nLmxvZyhcIlN1Y2Nlc3NmdWxseSByZXRyaWV2ZWQgcG9zdHM6IFwiICsgY3RybC5wb3N0cyk7XG4gIH1cblxuICBjdHJsLmdldE5leHRQYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZXMoY3RybC5wYWdlU2V0dGluZ3MuY3VycmVudF9wYWdlICsgMSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5wb3N0cy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEucG9zdHM7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuZ2V0UHJldlBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBBcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlcyhjdHJsLnBhZ2VTZXR0aW5ncy5jdXJyZW50X3BhZ2UgLSAxKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLnBvc3RzLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5wb3N0cztcbiAgICAgIH0pO1xuICB9XG5cbn1cblxuQmxvZ0luZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWydCbG9nU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdibG9nJylcbiAgLmNvbnRyb2xsZXIoJ0Jsb2dJbmRleENvbnRyb2xsZXInLCBCbG9nSW5kZXhDb250cm9sbGVyKTsiLCJ2YXIgYmxvZ05ldyA9IHtcbiAgdGVtcGxhdGVVcmw6IFwiLi9hcHAvY29tcG9uZW50cy9ibG9nL2Jsb2ctbmV3L2Jsb2ctbmV3Lmh0bWxcIixcbiAgY29udHJvbGxlcjogQmxvZ05ld0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgcG9zdDogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Jsb2cnKVxuICAuY29tcG9uZW50KCdibG9nTmV3JywgYmxvZ05ldyk7IiwiZnVuY3Rpb24gQmxvZ05ld0NvbnRyb2xsZXIoQmxvZ1NlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKHBvc3QpIHtcbiAgICBCbG9nU2VydmljZS5uZXdQb3N0KHBvc3QpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgc2F2ZWQgbmV3IHBvc3RcIik7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKFwiYmxvZ3MvZWRpdC9cIiArIHBvc3Quc2x1Zyk7XG4gICAgICB9LCBmdW5jdGlvbiBlcnJvcihyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiRXJyb3I6XCIgKyByZXNwb25zZSk7XG4gICAgICAgIGN0cmwuZXJyb3IgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuICB9O1xuXG59XG5cbkJsb2dOZXdDb250cm9sbGVyLiRpbmplY3QgPSBbJ0Jsb2dTZXJ2aWNlJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2Jsb2cnKVxuICAuY29udHJvbGxlcignQmxvZ05ld0NvbnRyb2xsZXInLCBCbG9nTmV3Q29udHJvbGxlcik7IiwidmFyIGNvbW1lbnRJbmRleCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1pbmRleC9jb21tZW50LWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBDb21tZW50SW5kZXhDb250cm9sbGVyXG4gIFxufVxuXG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpXG4gIC5jb21wb25lbnQoJ2NvbW1lbnRJbmRleCcsIGNvbW1lbnRJbmRleCk7IiwiZnVuY3Rpb24gQ29tbWVudEluZGV4Q29udHJvbGxlcihDb21tZW50U2VydmljZSl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gICAgY3RybC5kZWxldGVDb21tZW50ID0gZnVuY3Rpb24oY29tbWVudElkKXtcbiAgICAgICAgQ29tbWVudFNlcnZpY2UuZGVsZXRlQ29tbWVudChjb21tZW50SWQpO1xuICAgIH1cbn1cblxuQ29tbWVudEluZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWydDb21tZW50U2VydmljZSddO1xuXG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpXG4gICAgLmNvbnRyb2xsZXIoJ0NvbW1lbnRJbmRleENvbnRyb2xsZXInLCBDb21tZW50SW5kZXhDb250cm9sbGVyKTsiLCJ2YXIgY291cnNlRWRpdCA9IHtcbiAgdGVtcGxhdGVVcmwgOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0Lmh0bWwnLFxuICBjb250cm9sbGVyOiBDb3Vyc2VFZGl0Q29udHJvbGxlciwgXG4gIGJpbmRpbmdzIDoge1xuICAgIGNvdXJzZTogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29tcG9uZW50KCdjb3Vyc2VFZGl0JywgY291cnNlRWRpdCk7XG4gICIsImZ1bmN0aW9uIENvdXJzZUVkaXRDb250cm9sbGVyKENvdXJzZVNlcnZpY2UsICRsb2csICRyb3V0ZVBhcmFtcykge1xuICB2YXIgY3RybCA9IHRoaXM7XG4gIFxuICB2YXIgc2x1ZyA9ICRyb3V0ZVBhcmFtcy5zbHVnO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIENvdXJzZVNlcnZpY2UuZ2V0Q291cnNlKHNsdWcpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5jb3Vyc2UgPSByZXNwb25zZS5kYXRhLmNvdXJzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5zYXZlID0gZnVuY3Rpb24oY291cnNlKSB7XG4gICAgQ291cnNlU2VydmljZS51cGRhdGVDb3Vyc2UoY291cnNlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgU2F2ZWRcIik7XG4gICAgICB9KTtcbiAgfVxuXG59XG5cbkNvdXJzZUVkaXRDb250cm9sbGVyLiRpbmplY3QgPSBbJ0NvdXJzZVNlcnZpY2UnLCAnJGxvZycsICckcm91dGVQYXJhbXMnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29udHJvbGxlcignQ291cnNlRWRpdENvbnRyb2xsZXInLCBDb3Vyc2VFZGl0Q29udHJvbGxlcik7IiwidmFyIGNvdXJzZU5ldyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvdXJzZXMvY291cnNlLW5ldy9jb3Vyc2UtbmV3Lmh0bWwnLFxuICBjb250cm9sbGVyOiBDb3Vyc2VOZXdDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGNvdXJzZSA6ICc9PydcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnY291cnNlcycpXG4gIC5jb21wb25lbnQoJ2NvdXJzZU5ldycsIGNvdXJzZU5ldyk7XG4gICIsImZ1bmN0aW9uIENvdXJzZU5ld0NvbnRyb2xsZXIoQ291cnNlU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5zYXZlID0gZnVuY3Rpb24oY291cnNlKSB7XG4gICAgQ291cnNlU2VydmljZS5uZXdDb3Vyc2UoY291cnNlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IFNhdmVkIENvdXJzZVwiKTtcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCJjb3Vyc2UvZWRpdC9cIiArIGNvdXJzZS5zbHVnKTtcbiAgICAgIH0sIGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJFcnJvcjogXCIgKyByZXNwb25zZSk7XG4gICAgICAgIGN0cmwuZXJyb3IgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuICB9XG5cbn1cblxuQ291cnNlTmV3Q29udHJvbGxlci4kaW5qZWN0ID0gWydDb3Vyc2VTZXJ2aWNlJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29udHJvbGxlcignQ291cnNlTmV3Q29udHJvbGxlcicsIENvdXJzZU5ld0NvbnRyb2xsZXIpOyIsInZhciBjb3Vyc2VTZWFyY2ggPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1zZWFyY2gvY291cnNlLXNlYXJjaC5odG1sJyxcbiAgY29udHJvbGxlcjogQ291cnNlU2VhcmNoQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBjb3Vyc2VzOiAnPCcsXG4gICAgcGFnZVNldHRpbmdzOiAnPCcsXG4gICAgdGl0bGU6ICc9PydcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnY291cnNlcycpXG4gIC5jb21wb25lbnQoJ2NvdXJzZVNlYXJjaCcsIGNvdXJzZVNlYXJjaCk7IiwiZnVuY3Rpb24gQ291cnNlU2VhcmNoQ29udHJvbGxlcihDb3Vyc2VTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmNvdXJzZXMgPSBbXTtcblxuICBjdHJsLnBhZ2UgPSAxO1xuICBjdHJsLnBhZ2VTZXR0aW5ncyA9IFtdO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCl7XG4gICAgQ291cnNlU2VydmljZS5nZXRDb3Vyc2VzKGN0cmwucGFnZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmNvdXJzZXMgPSByZXNwb25zZS5kYXRhLmNvdXJzZXMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmNvdXJzZXM7XG4gICAgICB9KTtcbiAgICAkbG9nLmxvZyhcIlN1Y2Nlc3NmdWxseSBSZXRyaWV2ZWQgY291cnNlczogXCIgKyBjdHJsLmNvdXJzZXMpOyAgXG4gIH1cblxufVxuXG5Db3Vyc2VTZWFyY2hDb250cm9sbGVyLiRpbmplY3QgPSBbJ0NvdXJzZVNlcnZpY2UnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnY291cnNlcycpXG4gIC5jb250cm9sbGVyKCdDb3Vyc2VTZWFyY2hDb250cm9sbGVyJywgQ291cnNlU2VhcmNoQ29udHJvbGxlcik7IiwidmFyIGRhc2hib2FyZEFjdGlvbnMgPSB7XG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFjdGlvbnMvZGFzaGJvYXJkLWFjdGlvbnMuaHRtbCcsXG4gICAgY29udHJvbGxlcjogRGFzaGJvYXJkQWN0aW9uQ29udHJvbGxlclxuICAgIFxufTtcblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gICAgLmNvbXBvbmVudCgnZGFzaGJvYXJkQWN0aW9ucycsIGRhc2hib2FyZEFjdGlvbnMpOyIsImZ1bmN0aW9uIERhc2hib2FyZEFjdGlvbkNvbnRyb2xsZXIoKXtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb250cm9sbGVyKCdEYXNoYm9hcmRBY3Rpb25Db250cm9sbGVyJywgRGFzaGJvYXJkQWN0aW9uQ29udHJvbGxlcik7IiwidmFyIGRhc2hib2FyZEFuYWx5dGljcyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYW5hbHl0aWNzL2Rhc2hib2FyZC1hbmFseXRpY3MuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IERhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgc2VyaWVzOiAnPCcsXG4gICAgbGFiZWxzOiAnPCcsXG4gICAgZGF0YTogJzwnLFxuICAgIG9wdGlvbnM6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZEFuYWx5dGljcycsIGRhc2hib2FyZEFuYWx5dGljcyk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlcigkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmxhYmVscyA9IFsnMjAwNicsICcyMDA3JywgJzIwMDgnLCAnMjAwOScsICcyMDEwJywgJzIwMTEnLCAnMjAxMiddO1xuICBjdHJsLnNlcmllcyA9IFsnVmlzaXRvcnMnLCAnUGFnZSBWaWV3cyddO1xuXG4gIGN0cmwuZGF0YSA9IFtcbiAgICBbNjUsIDU5LCA4MCwgODEsIDU2LCA1NSwgNDBdLFxuICAgIFsyOCwgNDgsIDQwLCAxOSwgODYsIDI3LCA5MF1cbiAgXTtcblxuICBjdHJsLm9wdGlvbnMgPSB7XG4gICAgc2NhbGVzOiB7XG4gICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzp0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICB9O1xuXG4gIGN0cmwuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICRsb2cubG9nKFwiVGhpcyB3aWxsIHBlcmZvcm0gdGhlIFJFU1QgQVBJIGNhbGwgdG8gZ29vZ2xlIGFuYWx5dGljcyBvbiBwYWdlIGxvYWRcIik7XG4gIH07XG5cbn07XG5cbkRhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb250cm9sbGVyKCdEYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyJywgRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlcik7IiwiIiwidmFyIGRhc2hib2FyZENvbW1lbnRzID0ge1xuICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuaHRtbCcsXG4gICAgY29udHJvbGxlcjogRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyLFxuICAgIGJpbmRpbmdzOiB7XG4gICAgICAgIGNvbW1lbnRzOiAnPCdcbiAgICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb21wb25lbnQoJ2Rhc2hib2FyZENvbW1lbnRzJywgZGFzaGJvYXJkQ29tbWVudHMpOyIsImZ1bmN0aW9uIERhc2hib2FyZENvbW1lbnRzQ29udHJvbGxlcigkc2NvcGUpe1xuICAgIHZhciBjdHJsID0gdGhpcztcbn1cblxuRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgICAuY29udHJvbGxlcignRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyJywgRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyKTsiLCJ2YXIgZGFzaGJvYXJkR3Jvd3RoID0ge1xuICB0ZW1wbGF0ZVVybCA6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtZ3Jvd3RoL2Rhc2hib2FyZC1ncm93dGguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IERhc2hib2FyZEdyb3d0aENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgdG90YWwgOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgLmNvbXBvbmVudCgnZGFzaGJvYXJkR3Jvd3RoJywgZGFzaGJvYXJkR3Jvd3RoKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRHcm93dGhDb250cm9sbGVyKFVzZXJTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBVc2VyU2VydmljZS5nZXRVc2VycygpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2cocmVzcG9uc2UpO1xuICAgICAgICBjdHJsLnRvdGFsID0gcmVzcG9uc2UuZGF0YS51c2Vycy50b3RhbDtcbiAgICAgIH0pO1xuICB9O1xuXG59XG5cbkRhc2hib2FyZEdyb3d0aENvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gIC5jb250cm9sbGVyKCdEYXNoYm9hcmRHcm93dGhDb250cm9sbGVyJywgRGFzaGJvYXJkR3Jvd3RoQ29udHJvbGxlcik7IiwidmFyIGRhc2hib2FyZE9hdXRoID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1vYXV0aC9kYXNoYm9hcmQtb2F1dGguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IERhc2hib2FyZE9hdXRoQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBjbGllbnRzOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgLmNvbXBvbmVudCgnZGFzaGJvYXJkT2F1dGgnLCBkYXNoYm9hcmRPYXV0aCk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkT2F1dGhDb250cm9sbGVyKCRodHRwLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAkaHR0cC5nZXQoJ29hdXRoL2NsaWVudHMnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKHJlc3BvbnNlKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gZXJyb3IocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICRsb2cubG9nKHJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgICRsb2cubG9nKHJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuRGFzaGJvYXJkT2F1dGhDb250cm9sbGVyLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gIC5jb250cm9sbGVyKCdEYXNoYm9hcmRPYXV0aENvbnRyb2xsZXInLCBEYXNoYm9hcmRPYXV0aENvbnRyb2xsZXIpOyIsInZhciBkYXNoYm9hcmRVc2VycyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgc2VyaWVzOiAnPCcsXG4gICAgbGFiZWxzOiAnPCcsXG4gICAgZGF0YTogJzwnLFxuICAgIG9wdGlvbnM6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZFVzZXJzJywgZGFzaGJvYXJkVXNlcnMpOyIsImZ1bmN0aW9uIERhc2hib2FyZFVzZXJzQ29udHJvbGxlcihVc2VyU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5sYWJlbHMgPSBbJy00IFdlZWsnLCAnLTMgV2VlaycsICctMiBXZWVrJywgJy0xIFdlZWsnXTtcbiAgY3RybC5zZXJpZXMgPSBbJ05ldyBVc2VycyddO1xuXG4gIGN0cmwub3B0aW9ucyA9IHtcbiAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gIH07XG5cbiAgY3RybC5kYXRhID0gW1xuICAgIFs2LCAzLCA0LCAyXVxuICBdO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmdldEdyb3d0aCgpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coY3RybC5kYXRhKTtcbiAgICAgICAgY3RybC5kYXRhWzBdID0gcmVzcG9uc2UuZGF0YS5ncm93dGg7XG4gICAgICAgICRsb2cubG9nKGN0cmwuZGF0YSk7XG4gICAgICB9KTtcbiAgfTtcblxufTtcblxuRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJywnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb250cm9sbGVyKCdEYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXInLCBEYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXIpOyIsIiIsInZhciBlbWFpbERhc2hib2FyZCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2VtYWlsL2VtYWlsLWRhc2hib2FyZC9lbWFpbC1kYXNoYm9hcmQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IEVtYWlsRGFzaGJvYXJkQ29udHJvbGxlclxufVxuXG5hbmd1bGFyLm1vZHVsZSgnZW1haWwnKVxuICAuY29tcG9uZW50KCdlbWFpbERhc2hib2FyZCcsIGVtYWlsRGFzaGJvYXJkKTsiLCJmdW5jdGlvbiBFbWFpbERhc2hib2FyZENvbnRyb2xsZXIoJGxvZyl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAkbG9nLmxvZyhcIkVtYWlsIENvbnRyb2xsZXIgSW5pdGlhbGl6ZWRcIik7XG4gIH1cblxufVxuXG5FbWFpbERhc2hib2FyZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnZW1haWwnKVxuICAuY29udHJvbGxlcignRW1haWxEYXNoYm9hcmRDb250cm9sbGVyJywgRW1haWxEYXNoYm9hcmRDb250cm9sbGVyKTsiLCJ2YXIgc2V0dGluZ3NJbmRleCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1pbmRleC9zZXR0aW5ncy1pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogU2V0dGluZ3NJbmRleENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgc2V0dGluZ3M6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnKVxuICAuY29tcG9uZW50KCdzZXR0aW5nc0luZGV4Jywgc2V0dGluZ3NJbmRleCk7IiwiZnVuY3Rpb24gU2V0dGluZ3NJbmRleENvbnRyb2xsZXIoKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuc2V0dGluZ3MgPSB7XG4gICAgdGFnbGluZTogXCJIaWdoIFF1YWxpdHkgUHJvZ3JhbW1pbmcgVHV0b3JpYWxzXCIsXG4gICAgc2l0ZVVybDogXCJodHRwczovL3R1dG9yaWFsZWRnZS5uZXRcIixcbiAgICBhZG1pbkVtYWlsOiBcImFkbWluQHR1dG9yaWFsZWRnZS5uZXRcIixcbiAgICBtZXRhOiBcInwgVHV0b3JpYWxlZGdlLm5ldFwiXG4gIH1cblxufVxuXG5hbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnKVxuICAuY29udHJvbGxlcignU2V0dGluZ3NJbmRleENvbnRyb2xsZXInLCBTZXR0aW5nc0luZGV4Q29udHJvbGxlcik7IiwidmFyIHNvY2lhbERhc2hib2FyZCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLWRhc2hib2FyZC9zb2NpYWwtZGFzaGJvYXJkLmh0bWwnLFxuICBjb250cm9sbGVyOiBTb2NpYWxEYXNoYm9hcmRDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHNvY2lhbERhc2hib2FyZDogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb21wb25lbnQoJ3NvY2lhbERhc2hib2FyZCcsIHNvY2lhbERhc2hib2FyZCk7IiwiZnVuY3Rpb24gU29jaWFsRGFzaGJvYXJkQ29udHJvbGxlcigkbG9nKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICRsb2cubG9nKFwiSGVsbG8gV29ybGRcIik7XG4gIH1cbn1cblxuU29jaWFsRGFzaGJvYXJkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29udHJvbGxlcignU29jaWFsRGFzaGJvYXJkQ29udHJvbGxlcicsIFNvY2lhbERhc2hib2FyZENvbnRyb2xsZXIpOyIsInZhciB5b3V0dWJlU3Vic2NyaWJlcnMgPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc29jaWFsL3lvdXR1YmUtc3Vic2NyaWJlcnMveW91dHViZS1zdWJzY3JpYmVycy5odG1sJyxcbiAgY29udHJvbGxlcjogWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyLCBcbiAgYmluZGluZ3M6IHtcbiAgICB5b3V0dWJlU3Vic2NyaWJlcnM6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29tcG9uZW50KCd5b3V0dWJlU3Vic2NyaWJlcnMnLCB5b3V0dWJlU3Vic2NyaWJlcnMpOyIsImZ1bmN0aW9uIFlvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlcigpe1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC55b3V0dWJlU3Vic2NyaWJlcnMgPSBbeyBuYW1lOiAnZWxsaW90J31dO1xuXG59XG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbnRyb2xsZXIoJ1lvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlcicsIFlvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlcik7IiwiZnVuY3Rpb24geW91dHViZVN1YnNjcmliZXJSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3lvdXR1YmUtc3Vic2NyaWJlcnMnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8eW91dHViZS1zdWJzY3JpYmVycz48L3lvdXR1YmUtc3Vic2NyaWJlcnM+J1xuICAgICAgfSk7XG59XG55b3V0dWJlU3Vic2NyaWJlclJvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbmZpZyh5b3V0dWJlU3Vic2NyaWJlclJvdXRlcyk7IiwidmFyIHN0YXRzSW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc3RhdHMvc3RhdHMtaW5kZXgvc3RhdHMtaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFN0YXRzSW5kZXhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHN0YXRzOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnc3RhdHMnKVxuICAuY29tcG9uZW50KCdzdGF0c0luZGV4Jywgc3RhdHNJbmRleCk7IiwiZnVuY3Rpb24gU3RhdHNJbmRleENvbnRyb2xsZXIoJHNjb3BlKSB7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gICAgY3RybC5zdGF0cyA9IHt9O1xuXG4gICAgY3RybC5zdGF0cy5zZXJpZXMgPSBbJ1Zpc2l0b3JzJywgJ1BhZ2UgVmlld3MnXTtcblxuICAgIGN0cmwuc3RhdHMucmVhbHRpbWVMYWJlbHMgPSBbJ01vYmlsZScsICdUYWJsZXQnLCAnRGVza3RvcCcsICdPdGhlciddXG4gICAgY3RybC5zdGF0cy50b2RheUxhYmVscyA9IFsnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScsICdTdW5kYXknXTtcbiAgIFxuICAgIGN0cmwuc3RhdHMucmVhbHRpbWUgPSBbXG4gICAgICAgIDY1LCA1OSwgMTA4LCAyM1xuICAgIF07XG5cbiAgICBjdHJsLnN0YXRzLnRvZGF5ID0gW1xuICAgICAgICBbMzQwLCA1NDMsIDUxMiwgNTQzLCA0OTMsIDQ0NCwgNDM5XVxuICAgIF07XG5cbiAgICBjdHJsLnN0YXRzLmJhck9wdGlvbnMgPSB7XG4gICAgICAgIHNjYWxlczoge1xuICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY3RybC5zdGF0cy5waWVPcHRpb25zID0ge1xuICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IHRydWVcbiAgICAgICAgfVxuICAgIH07XG5cbn1cblN0YXRzSW5kZXhDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xuYW5ndWxhci5tb2R1bGUoJ3N0YXRzJylcbiAgICAuY29udHJvbGxlcignU3RhdHNJbmRleENvbnRyb2xsZXInLCBTdGF0c0luZGV4Q29udHJvbGxlcik7IiwidmFyIHVzZXJFZGl0ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3VzZXIvdXNlci1lZGl0L3VzZXItZWRpdC5odG1sJyxcbiAgY29udHJvbGxlcjogVXNlckVkaXRDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHVzZXI6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbXBvbmVudCgndXNlckVkaXQnLCB1c2VyRWRpdCk7IiwiZnVuY3Rpb24gVXNlckVkaXRDb250cm9sbGVyKFVzZXJTZXJ2aWNlLCAkbG9nLCAkcm91dGVQYXJhbXMpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuICB2YXIgaWQgPSAkcm91dGVQYXJhbXMuaWQ7XG5cbiAgY3RybC51c2VyID0ge307XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKXtcbiAgICBVc2VyU2VydmljZS5nZXRVc2VyKGlkKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbiAgICAgIH0pO1xuICB9XG5cbn1cblxuVXNlckVkaXRDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJywgJyRsb2cnLCAnJHJvdXRlUGFyYW1zJ107XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbnRyb2xsZXIoJ1VzZXJFZGl0Q29udHJvbGxlcicsIFVzZXJFZGl0Q29udHJvbGxlcik7IiwidmFyIHVzZXJJbmRleCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3VzZXIvdXNlci1pbmRleC91c2VyLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBVc2VySW5kZXhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHVzZXJzOiAnPCcsXG4gICAgcGFnZVNldHRpbmdzOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29tcG9uZW50KCd1c2VySW5kZXgnLCB1c2VySW5kZXgpOyIsImZ1bmN0aW9uIFVzZXJJbmRleENvbnRyb2xsZXIoVXNlclNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwudXNlcnMgPSBbXTtcbiAgY3RybC5wYWdlU2V0dGluZ3MgPSBbXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBVc2VyU2VydmljZS5nZXRVc2VycygpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC51c2VycyA9IHJlc3BvbnNlLmRhdGEudXNlcnMuZGF0YTtcbiAgICAgICAgJGxvZy5sb2cocmVzcG9uc2UuZGF0YS51c2Vycy5kYXRhKTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLnVzZXJzO1xuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLmdldE5leHRQYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UuZ2V0VXNlcnMoY3RybC5wYWdlU2V0dGluZ3MuY3VycmVudF9wYWdlICsgMSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnVzZXJzID0gcmVzcG9uc2UuZGF0YS51c2Vycy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEudXNlcnM7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuZ2V0UHJldlBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBVc2VyU2VydmljZS5nZXRVc2VycyhjdHJsLnBhZ2VTZXR0aW5ncy5jdXJyZW50X3BhZ2UgLSAxKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudXNlcnMgPSByZXNwb25zZS5kYXRhLnVzZXJzLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS51c2VycztcbiAgICAgIH0pO1xuICB9XG5cbn07XG5cblVzZXJJbmRleENvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb250cm9sbGVyKCdVc2VySW5kZXhDb250cm9sbGVyJywgVXNlckluZGV4Q29udHJvbGxlcik7IiwidmFyIHVzZXJOZXcgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy91c2VyL3VzZXItbmV3L3VzZXItbmV3Lmh0bWwnLFxuICBjb250cm9sbGVyOiBVc2VyTmV3Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb21wb25lbnQoJ3VzZXJOZXcnLCB1c2VyTmV3KTsiLCJmdW5jdGlvbiBVc2VyTmV3Q29udHJvbGxlcihVc2VyU2VydmljZSl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLm5ld1VzZXIgPSBmdW5jdGlvbih1c2VyKXtcbiAgICBVc2VyU2VydmljZS5uZXdVc2VyKHVzZXIpO1xuICB9O1xuXG59O1xuXG5Vc2VyTmV3Q29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZSddO1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb250cm9sbGVyKCdVc2VyTmV3Q29udHJvbGxlcicsIFVzZXJOZXdDb250cm9sbGVyKTsiLCJ2YXIgZmFjZWJvb2tXaWRnZXQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc29jaWFsL3NvY2lhbC13aWRnZXRzL2ZhY2Vib29rLXdpZGdldC9mYWNlYm9vay13aWRnZXQuaHRtbCdcbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb21wb25lbnQoJ2ZhY2Vib29rV2lkZ2V0JywgZmFjZWJvb2tXaWRnZXQpO1xuICAiLCJ2YXIgdHdpdHRlcldpZGdldCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvdHdpdHRlci13aWRnZXQvdHdpdHRlci13aWRnZXQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFNvY2lhbFR3aXR0ZXJDb250cm9sbGVyXG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29tcG9uZW50KCd0d2l0dGVyV2lkZ2V0JywgdHdpdHRlcldpZGdldCk7IiwiZnVuY3Rpb24gU29jaWFsVHdpdHRlckNvbnRyb2xsZXIoKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbnRyb2xsZXIoJ1NvY2lhbFR3aXR0ZXJDb250cm9sbGVyJywgU29jaWFsVHdpdHRlckNvbnRyb2xsZXIpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
