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
      url: 'course?v=' + Date.now(),
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
      url: 'course/' + course.slug + "?v=" + Date.now(),
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

}

CourseEditController.$inject = ['CourseService', '$log', '$routeParams'];

angular.module('courses')
  .controller('CourseEditController', CourseEditController);
var courseNew = {
  templateUrl: './app/components/courses/course-new/course-new.html',
  controller: CourseNewController,
  bindings: {

  }
}

angular.module('courses')
  .component('courseNew', courseNew);
function CourseNewController() {
  var ctrl = this;
}

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

DashboardGrowthController.$inject = ['UserService', '$log'];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGVzLmpzIiwiY29tbW9uL3NlcnZpY2VzL2ZhY2Vib29rLnNlcnZpY2UuanMiLCJjb21tb24vc2VydmljZXMvZ29vZ2xlUGx1cy5zZXJ2aWNlLmpzIiwiY29tbW9uL3NlcnZpY2VzL3R3aXR0ZXIuc2VydmljZS5qcyIsImNvbW1vbi9zZXJ2aWNlcy95b3V0dWJlLnNlcnZpY2UuanMiLCJjb21tb24vbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudC5qcyIsImNvbW1vbi9sb2FkaW5nL2xvYWRpbmcuY29udHJvbGxlci5qcyIsImNvbW1vbi90b3AtbmF2L3RvcC1uYXYuY29tcG9uZW50LmpzIiwiY29tbW9uL3RvcC1uYXYvdG9wLW5hdi5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQubW9kdWxlLmpzIiwiY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQucm91dGVzLmpzIiwiY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQuc2VydmljZS5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UubW9kdWxlLmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLnNlcnZpY2UuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWluZGV4LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQubW9kdWxlLmpzIiwiY29tcG9uZW50cy9lbWFpbC9lbWFpbC5tb2R1bGUuanMiLCJjb21wb25lbnRzL2VtYWlsL2VtYWlsLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zdGF0cy9zdGF0cy5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3RhZ3MvdGFnLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvdGFncy90YWcuc2VydmljZS5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLnNlcnZpY2UuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUubW9kdWxlLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtaW5kZXgvY29tbWVudC1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1pbmRleC9jb21tZW50LWluZGV4LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLWVkaXQvY291cnNlLWVkaXQuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLW5ldy9jb3Vyc2UtbmV3LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UtbmV3L2NvdXJzZS1uZXcuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2Utc2VhcmNoL2NvdXJzZS1zZWFyY2guY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1zZWFyY2gvY291cnNlLXNlYXJjaC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFjdGlvbnMvZGFzaGJvYXJkLWFjdGlvbnMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFjdGlvbnMvZGFzaGJvYXJkLWFjdGlvbnMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYW5hbHl0aWNzL2Rhc2hib2FyZC1hbmFseXRpY3MuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5tb2R1bGUuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtY29tbWVudHMvZGFzaGJvYXJkLWNvbW1lbnRzLmNvbXBvbmVudHMuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtY29tbWVudHMvZGFzaGJvYXJkLWNvbW1lbnRzLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtZ3Jvd3RoL2Rhc2hib2FyZC1ncm93dGguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWdyb3d0aC9kYXNoYm9hcmQtZ3Jvd3RoLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtb2F1dGgvZGFzaGJvYXJkLW9hdXRoLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1vYXV0aC9kYXNoYm9hcmQtb2F1dGguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC11c2Vycy9kYXNoYm9hcmQtdXNlcnMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5tb2R1bGUuanMiLCJjb21wb25lbnRzL2VtYWlsL2VtYWlsLWRhc2hib2FyZC9lbWFpbC1kYXNoYm9hcmQuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9lbWFpbC9lbWFpbC1kYXNoYm9hcmQvZW1haWwtZGFzaGJvYXJkLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWluZGV4L3NldHRpbmdzLWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtaW5kZXgvc2V0dGluZ3MtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC1kYXNoYm9hcmQvc29jaWFsLWRhc2hib2FyZC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtZGFzaGJvYXJkL3NvY2lhbC1kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc29jaWFsL3lvdXR1YmUtc3Vic2NyaWJlcnMveW91dHViZS1zdWJzY3JpYmVycy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC95b3V0dWJlLXN1YnNjcmliZXJzL3lvdXR1YmUtc3Vic2NyaWJlcnMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc29jaWFsL3lvdXR1YmUtc3Vic2NyaWJlcnMveW91dHViZS1zdWJzY3JpYmVycy5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3N0YXRzL3N0YXRzLWluZGV4L3N0YXRzLWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMtaW5kZXgvc3RhdHMtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLWVkaXQvdXNlci1lZGl0LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLWVkaXQvdXNlci1lZGl0LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci1pbmRleC91c2VyLWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLWluZGV4L3VzZXItaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLW5ldy91c2VyLW5ldy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci1uZXcvdXNlci1uZXcuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1lZGl0L2FydGljbGUtZWRpdC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtZWRpdC9hcnRpY2xlLWVkaXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1ob21lL2FydGljbGVzLWhvbWUuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWhvbWUvYXJ0aWNsZXMtaG9tZS5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLW5ldy9hcnRpY2xlLW5ldy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtbmV3L2FydGljbGUtbmV3LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy9mYWNlYm9vay13aWRnZXQvZmFjZWJvb2std2lkZ2V0LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC13aWRnZXRzL3R3aXR0ZXItd2lkZ2V0L3R3aXR0ZXItd2lkZ2V0LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC13aWRnZXRzL3R3aXR0ZXItd2lkZ2V0L3R3aXR0ZXItd2lkZ2V0LmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQ0FBO0FDQUE7QUNBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FDQUE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWRtaW4tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3Jvb3QnLCBbXG4gICAgJ25nUm91dGUnLFxuICAgICdhcnRpY2xlcycsXG4gICAgJ2Rhc2hib2FyZCcsXG4gICAgJ3VzZXInLFxuICAgICdjb21tZW50JyxcbiAgICAnY291cnNlcycsXG4gICAgJ3N0YXRzJyxcbiAgICAnc2V0dGluZ3MnLFxuICAgICdzb2NpYWwnLFxuICAgICd0YWdzJyxcbiAgICAnZW1haWwnXG5dKTtcbiIsImZ1bmN0aW9uIHJvdXRlUHJvdmlkZXIoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignLycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxkYXNoYm9hcmQ+PC9kYXNoYm9hcmQ+J1xuICAgICAgfSk7XG59XG5yb3V0ZVByb3ZpZGVyLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbmZpZyhyb3V0ZVByb3ZpZGVyKTtcbiIsIiIsIiIsIiIsIiIsInZhciBsb2FkaW5nID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vY29tbW9uL2xvYWRpbmcvbG9hZGluZy5odG1sJyxcbiAgY29udHJvbGxlcjogTG9hZGluZ0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgaXNMb2FkaW5nOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCdsb2FkaW5nJywgbG9hZGluZyk7IiwiZnVuY3Rpb24gTG9hZGluZ0NvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0xvYWRpbmdDb250cm9sbGVyJywgTG9hZGluZ0NvbnRyb2xsZXIpOyIsInZhciB0b3BOYXYgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tbW9uL3RvcC1uYXYvdG9wLW5hdi5odG1sJyxcbiAgY29udHJvbGxlcjogVG9wTmF2Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhclxuICAubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgndG9wTmF2JywgdG9wTmF2KTtcbiIsImZ1bmN0aW9uIFRvcE5hdkNvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ1RvcE5hdkNvbnRyb2xsZXInLCBUb3BOYXZDb250cm9sbGVyKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjb21tZW50JywgW10pOyIsImZ1bmN0aW9uIGNvbW1lbnRSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL2NvbW1lbnRzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGNvbW1lbnQtaW5kZXg+PC9jb21tZW50LWluZGV4PidcbiAgICAgIH0pO1xufTtcbmNvbW1lbnRSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmFuZ3VsYXIubW9kdWxlKCdjb21tZW50JykuY29uZmlnKGNvbW1lbnRSb3V0ZXMpO1xuIiwiZnVuY3Rpb24gQ29tbWVudFNlcnZpY2UoJGxvZyl7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVDb21tZW50KGNvbW1lbnRJZCkge1xuICAgICAgICAkbG9nLmxvZyhcIkRlbGV0aW5nIGEgY29tbWVudCB3aXRoIGlkOiBcIiArIGNvbW1lbnRJZCk7XG4gICAgfVxuXG4gICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgIGRlbGV0ZUNvbW1lbnQgOiBkZWxldGVDb21tZW50XG4gICAgfTtcblxuICAgIHJldHVybiBzZXJ2aWNlO1xufVxuQ29tbWVudFNlcnZpY2UuJGluamVjdCA9IFsnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpXG4gICAgLmZhY3RvcnkoJ0NvbW1lbnRTZXJ2aWNlJywgQ29tbWVudFNlcnZpY2UpOyIsImFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJywgW10pO1xuIiwiZnVuY3Rpb24gY291cnNlUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9jb3Vyc2VzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGNvdXJzZS1zZWFyY2g+PC9jb3Vyc2Utc2VhcmNoPidcbiAgICAgIH0pXG4gICAgICAud2hlbignL2NvdXJzZS9uZXcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGNvdXJzZS1uZXc+PC9jb3Vyc2UtbmV3PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL2NvdXJzZS9lZGl0LzpzbHVnJywge1xuICAgICAgICB0ZW1wbGF0ZTogJzxjb3Vyc2UtZWRpdD48L2NvdXJzZS1lZGl0PidcbiAgICAgIH0pXG59XG5jb3Vyc2VSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29uZmlnKGNvdXJzZVJvdXRlcyk7XG4iLCJmdW5jdGlvbiBDb3Vyc2VTZXJ2aWNlKCRodHRwLCAkbG9nLCBDU1JGX1RPS0VOKSB7XG5cbiAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtQ3NyZi1Ub2tlbiddID0gQ1NSRl9UT0tFTjtcblxuICBmdW5jdGlvbiBuZXdDb3Vyc2UoY291cnNlKSB7XG4gICAgY29uc29sZS5sb2coY291cnNlKTtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICdjb3Vyc2U/dj0nICsgRGF0ZS5ub3coKSxcbiAgICAgIGRhdGE6IGNvdXJzZVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q291cnNlKHNsdWcpIHtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KFwiYXBpL2NvdXJzZS9cIiArIHNsdWcgKyBcIj92PVwiICsgRGF0ZS5ub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb3Vyc2VzKHBhZ2Upe1xuICAgIHJldHVybiAkaHR0cC5nZXQoXCJhcGkvY291cnNlcz9wYWdlPVwiICsgcGFnZSArIFwiJnY9XCIgKyBEYXRlLm5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlYXJjaChwYWdlLCB0aXRsZSkge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJ2FwaS9sZXNzb25zP3BhZ2U9JyArIHBhZ2UgKyBcIiZ0aXRsZT1cIiArIHRpdGxlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDb3Vyc2UoY291cnNlKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHVybDogJ2NvdXJzZS8nICsgY291cnNlLnNsdWcgKyBcIj92PVwiICsgRGF0ZS5ub3coKSxcbiAgICAgIGRhdGE6IGNvdXJzZVxuICAgIH0pO1xuICB9XG4gIFxuXG4gIHZhciBzZXJ2aWNlID0ge1xuICAgIHVwZGF0ZUNvdXJzZSA6IHVwZGF0ZUNvdXJzZSxcbiAgICBnZXRDb3Vyc2UgOiBnZXRDb3Vyc2UsXG4gICAgbmV3Q291cnNlIDogbmV3Q291cnNlLFxuICAgIHNlYXJjaCA6IHNlYXJjaCxcbiAgICBnZXRDb3Vyc2VzIDogZ2V0Q291cnNlc1xuICB9O1xuXG4gIHJldHVybiBzZXJ2aWNlO1xufVxuXG5Db3Vyc2VTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnLCAnQ1NSRl9UT0tFTiddOyAgXG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgnY291cnNlcycpXG4gIC5mYWN0b3J5KCdDb3Vyc2VTZXJ2aWNlJywgQ291cnNlU2VydmljZSk7IiwidmFyIGRhc2hib2FyZCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IERhc2hib2FyZENvbnRyb2xsZXJcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgnZGFzaGJvYXJkJywgZGFzaGJvYXJkKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRDb250cm9sbGVyKCkge1xuICB2YXIgY3RybCA9IHRoaXM7XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb250cm9sbGVyKCdEYXNoYm9hcmRDb250cm9sbGVyJywgRGFzaGJvYXJkQ29udHJvbGxlcik7IiwiYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcsIFsnY2hhcnQuanMnXSk7IiwiYW5ndWxhci5tb2R1bGUoJ2VtYWlsJywgW10pO1xuIiwiZnVuY3Rpb24gZW1haWxSb3V0ZVByb3ZpZGVyKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9lbWFpbCcsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxlbWFpbC1kYXNoYm9hcmQ+PC9lbWFpbC1kYXNoYm9hcmQ+J1xuICAgICAgfSk7XG59XG5lbWFpbFJvdXRlUHJvdmlkZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ2VtYWlsJylcbiAgLmNvbmZpZyhlbWFpbFJvdXRlUHJvdmlkZXIpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJyxbXSk7IiwiZnVuY3Rpb24gc2V0dGluZ3NSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3NldHRpbmdzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHNldHRpbmdzLWluZGV4Pjwvc2V0dGluZ3MtaW5kZXg+J1xuICAgICAgfSk7XG59XG5zZXR0aW5nc1JvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdzZXR0aW5ncycpXG4gIC5jb25maWcoc2V0dGluZ3NSb3V0ZXMpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcsIFtdKTsiLCJmdW5jdGlvbiBzb2NpYWxSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3NvY2lhbCcsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxzb2NpYWwtZGFzaGJvYXJkPjwvc29jaWFsLWRhc2hib2FyZD4nXG4gICAgICB9KTtcbn1cbnNvY2lhbFJvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbmZpZyhzb2NpYWxSb3V0ZXMpO1xuICAiLCJhbmd1bGFyLm1vZHVsZSgnc3RhdHMnLCBbJ2NoYXJ0LmpzJ10pOyIsImZ1bmN0aW9uIHN0YXRzUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9zdGF0cycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxzdGF0cy1pbmRleD48L3N0YXRzLWluZGV4PidcbiAgICAgIH0pO1xufTtcblxuc3RhdHNSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmFuZ3VsYXIubW9kdWxlKCdzdGF0cycpLmNvbmZpZyhzdGF0c1JvdXRlcyk7XG4iLCJhbmd1bGFyLm1vZHVsZSgndGFncycsIFtdKTsiLCJmdW5jdGlvbiBUYWdTZXJ2aWNlKCRodHRwLCAkbG9nKSB7XG5cbiAgZnVuY3Rpb24gZ2V0VGFncygpIHtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvdGFncycpO1xuICB9XG5cbiAgdmFyIHNlcnZpY2UgPSB7XG4gICAgZ2V0VGFncyA6IGdldFRhZ3NcbiAgfTtcblxuICByZXR1cm4gc2VydmljZTtcblxufVxuXG5UYWdTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnXTsgIFxuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ3RhZ3MnKVxuICAuZmFjdG9yeSgnVGFnU2VydmljZScsIFRhZ1NlcnZpY2UpOyIsImFuZ3VsYXIubW9kdWxlKCd1c2VyJywgW10pOyIsImZ1bmN0aW9uIHVzZXJSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3VzZXJzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHVzZXItaW5kZXg+PC91c2VyLWluZGV4PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL3VzZXIvZWRpdC86aWQnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPHVzZXItZWRpdD48L3VzZXItZWRpdD4nICBcbiAgICAgIH0pXG4gICAgICAud2hlbignL3VzZXIvbmV3Jywge1xuICAgICAgICB0ZW1wbGF0ZTogJzx1c2VyLW5ldz48L3VzZXItbmV3PidcbiAgICAgIH0pO1xufTtcblxudXNlclJvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuYW5ndWxhci5tb2R1bGUoJ3VzZXInKS5jb25maWcodXNlclJvdXRlcyk7XG4iLCJmdW5jdGlvbiBVc2VyU2VydmljZSgkbG9nLCAkaHR0cCkge1xuXG4gICAgZnVuY3Rpb24gbmV3VXNlcih1c2VyKSB7XG4gICAgICAgICRsb2cubG9nKFwiQWRkaW5nIE5ldyBVc2VyXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVzZXIoaWQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXIvJyArIGlkICsgXCI/dj1cIiArIERhdGUubm93KCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVzZXJzKHBhZ2UpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXJzP3BhZ2U9JyArIHBhZ2UgKyBcIj92PVwiICsgRGF0ZS5ub3coKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0R3Jvd3RoKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvdXNlcnMvZ3Jvd3RoJyArIFwiP3Y9XCIgKyBEYXRlLm5vdygpKTtcbiAgICB9XG5cbiAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgbmV3VXNlcjogbmV3VXNlcixcbiAgICAgICAgZ2V0VXNlcjogZ2V0VXNlcixcbiAgICAgICAgZ2V0VXNlcnM6IGdldFVzZXJzLFxuICAgICAgICBnZXRHcm93dGg6IGdldEdyb3d0aFxuICAgIH07XG5cbiAgICByZXR1cm4gc2VydmljZTtcbn07XG5cblVzZXJTZXJ2aWNlLiRpbmplY3QgPSBbJyRsb2cnLCAnJGh0dHAnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAgIC5mYWN0b3J5KCdVc2VyU2VydmljZScsIFVzZXJTZXJ2aWNlKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnLCBbXSk7IiwiZnVuY3Rpb24gYXJ0aWNsZVJvdXRlUHJvdmlkZXIoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL2FydGljbGVzJyx7XG4gICAgICAgIHRlbXBsYXRlOiAnPGFydGljbGVzLWhvbWU+PC9hcnRpY2xlcy1ob21lPidcbiAgICAgIH0pXG4gICAgICAud2hlbignL2FydGljbGUvbmV3Jywge1xuICAgICAgICB0ZW1wbGF0ZTogJzxhcnRpY2xlLW5ldz48L2FydGljbGUtbmV3PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL2FydGljbGUvZWRpdC86c2x1ZycsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8YXJ0aWNsZS1lZGl0PjwvYXJ0aWNsZS1lZGl0PidcbiAgICAgIH0pXG4gICAgICAub3RoZXJ3aXNlKHsgXG4gICAgICAgIHRlbXBsYXRlOiAnPGgxPk5vdCBGb3VuZDwvaDE+J1xuICAgICAgfSk7XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKS5jb25maWcoYXJ0aWNsZVJvdXRlUHJvdmlkZXIpO1xuYXJ0aWNsZVJvdXRlUHJvdmlkZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbiIsImZ1bmN0aW9uIEFydGljbGVTZXJ2aWNlKCRodHRwLCAkbG9nLCBDU1JGX1RPS0VOKSB7XG5cbiAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtQ3NyZi1Ub2tlbiddID0gQ1NSRl9UT0tFTjtcblxuICBmdW5jdGlvbiBuZXdBcnRpY2xlKGFydGljbGUpIHtcbiAgICBjb25zb2xlLmxvZyhhcnRpY2xlKTtcbiAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICdhcnRpY2xlcz92PScgKyBEYXRlLm5vdygpLFxuICAgICAgZGF0YTogYXJ0aWNsZVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VhcmNoKHBhZ2UsIHRpdGxlKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnYXBpL2xlc3NvbnM/cGFnZT0nICsgcGFnZSArIFwiJnRpdGxlPVwiICsgdGl0bGVcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUFydGljbGUoYXJ0aWNsZSkge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB1cmw6ICdhcnRpY2xlcy8nICsgYXJ0aWNsZS5zbHVnICsgXCI/dj1cIiArIERhdGUubm93KCksXG4gICAgICBkYXRhOiBhcnRpY2xlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVBcnRpY2xlKGlkKSB7XG4gICAgJGxvZy5sb2coXCJQbGFjZWhvbGRlciBmb3IgZGVsZXRpbmcgYW4gYXJ0aWNsZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFydGljbGUoc2x1Zykge1xuICAgIHJldHVybiAkaHR0cC5nZXQoXCJhcGkvbGVzc29uL1wiICsgc2x1ZyArIFwiP3Y9XCIgKyBEYXRlLm5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFydGljbGVzKHBhZ2Upe1xuICAgIHJldHVybiAkaHR0cC5nZXQoXCJhcGkvbGVzc29ucz9wYWdlPVwiICsgcGFnZSArIFwiJnY9XCIgKyBEYXRlLm5vdygpKTtcbiAgfVxuXG4gIHZhciBzZXJ2aWNlID0ge1xuICAgIG5ld0FydGljbGUgOiBuZXdBcnRpY2xlLFxuICAgIHVwZGF0ZUFydGljbGUgOiB1cGRhdGVBcnRpY2xlLFxuICAgIGRlbGV0ZUFydGljbGUgOiBkZWxldGVBcnRpY2xlLFxuICAgIGdldEFydGljbGUgOiBnZXRBcnRpY2xlLFxuICAgIHNlYXJjaDogc2VhcmNoLFxuICAgIGdldEFydGljbGVzOiBnZXRBcnRpY2xlc1xuICB9O1xuXG4gIHJldHVybiBzZXJ2aWNlO1xuXG59XG5cbkFydGljbGVTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnLCAnQ1NSRl9UT0tFTiddOyAgXG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuZmFjdG9yeSgnQXJ0aWNsZVNlcnZpY2UnLCBBcnRpY2xlU2VydmljZSk7IiwidmFyIGNvbW1lbnRJbmRleCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1pbmRleC9jb21tZW50LWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBDb21tZW50SW5kZXhDb250cm9sbGVyXG4gIFxufVxuXG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpXG4gIC5jb21wb25lbnQoJ2NvbW1lbnRJbmRleCcsIGNvbW1lbnRJbmRleCk7IiwiZnVuY3Rpb24gQ29tbWVudEluZGV4Q29udHJvbGxlcihDb21tZW50U2VydmljZSl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gICAgY3RybC5kZWxldGVDb21tZW50ID0gZnVuY3Rpb24oY29tbWVudElkKXtcbiAgICAgICAgQ29tbWVudFNlcnZpY2UuZGVsZXRlQ29tbWVudChjb21tZW50SWQpO1xuICAgIH1cbn1cblxuQ29tbWVudEluZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWydDb21tZW50U2VydmljZSddO1xuXG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpXG4gICAgLmNvbnRyb2xsZXIoJ0NvbW1lbnRJbmRleENvbnRyb2xsZXInLCBDb21tZW50SW5kZXhDb250cm9sbGVyKTsiLCJ2YXIgY291cnNlRWRpdCA9IHtcbiAgdGVtcGxhdGVVcmwgOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0Lmh0bWwnLFxuICBjb250cm9sbGVyOiBDb3Vyc2VFZGl0Q29udHJvbGxlciwgXG4gIGJpbmRpbmdzIDoge1xuICAgIGNvdXJzZTogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuY29tcG9uZW50KCdjb3Vyc2VFZGl0JywgY291cnNlRWRpdCk7XG4gICIsImZ1bmN0aW9uIENvdXJzZUVkaXRDb250cm9sbGVyKENvdXJzZVNlcnZpY2UsICRsb2csICRyb3V0ZVBhcmFtcykge1xuICB2YXIgY3RybCA9IHRoaXM7XG4gIFxuICB2YXIgc2x1ZyA9ICRyb3V0ZVBhcmFtcy5zbHVnO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIENvdXJzZVNlcnZpY2UuZ2V0Q291cnNlKHNsdWcpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5jb3Vyc2UgPSByZXNwb25zZS5kYXRhLmNvdXJzZTtcbiAgICAgIH0pO1xuICB9XG5cbn1cblxuQ291cnNlRWRpdENvbnRyb2xsZXIuJGluamVjdCA9IFsnQ291cnNlU2VydmljZScsICckbG9nJywgJyRyb3V0ZVBhcmFtcyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnY291cnNlcycpXG4gIC5jb250cm9sbGVyKCdDb3Vyc2VFZGl0Q29udHJvbGxlcicsIENvdXJzZUVkaXRDb250cm9sbGVyKTsiLCJ2YXIgY291cnNlTmV3ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UtbmV3L2NvdXJzZS1uZXcuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IENvdXJzZU5ld0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG5cbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnY291cnNlcycpXG4gIC5jb21wb25lbnQoJ2NvdXJzZU5ldycsIGNvdXJzZU5ldyk7IiwiZnVuY3Rpb24gQ291cnNlTmV3Q29udHJvbGxlcigpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnY291cnNlcycpXG4gIC5jb250cm9sbGVyKCdDb3Vyc2VOZXdDb250cm9sbGVyJywgQ291cnNlTmV3Q29udHJvbGxlcik7IiwidmFyIGNvdXJzZVNlYXJjaCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvdXJzZXMvY291cnNlLXNlYXJjaC9jb3Vyc2Utc2VhcmNoLmh0bWwnLFxuICBjb250cm9sbGVyOiBDb3Vyc2VTZWFyY2hDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGNvdXJzZXM6ICc8JyxcbiAgICBwYWdlU2V0dGluZ3M6ICc8JyxcbiAgICB0aXRsZTogJz0/J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmNvbXBvbmVudCgnY291cnNlU2VhcmNoJywgY291cnNlU2VhcmNoKTsiLCJmdW5jdGlvbiBDb3Vyc2VTZWFyY2hDb250cm9sbGVyKENvdXJzZVNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuY291cnNlcyA9IFtdO1xuXG4gIGN0cmwucGFnZSA9IDE7XG4gIGN0cmwucGFnZVNldHRpbmdzID0gW107XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKXtcbiAgICBDb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoY3RybC5wYWdlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuY291cnNlcyA9IHJlc3BvbnNlLmRhdGEuY291cnNlcy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEuY291cnNlcztcbiAgICAgIH0pO1xuICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IFJldHJpZXZlZCBjb3Vyc2VzOiBcIiArIGN0cmwuY291cnNlcyk7ICBcbiAgfVxuXG59XG5cbkNvdXJzZVNlYXJjaENvbnRyb2xsZXIuJGluamVjdCA9IFsnQ291cnNlU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmNvbnRyb2xsZXIoJ0NvdXJzZVNlYXJjaENvbnRyb2xsZXInLCBDb3Vyc2VTZWFyY2hDb250cm9sbGVyKTsiLCJ2YXIgZGFzaGJvYXJkQWN0aW9ucyA9IHtcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYWN0aW9ucy9kYXNoYm9hcmQtYWN0aW9ucy5odG1sJyxcbiAgICBjb250cm9sbGVyOiBEYXNoYm9hcmRBY3Rpb25Db250cm9sbGVyXG4gICAgXG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgICAuY29tcG9uZW50KCdkYXNoYm9hcmRBY3Rpb25zJywgZGFzaGJvYXJkQWN0aW9ucyk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQWN0aW9uQ29udHJvbGxlcigpe1xuICAgIHZhciBjdHJsID0gdGhpcztcbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gICAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEFjdGlvbkNvbnRyb2xsZXInLCBEYXNoYm9hcmRBY3Rpb25Db250cm9sbGVyKTsiLCJ2YXIgZGFzaGJvYXJkQW5hbHl0aWNzID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5odG1sJyxcbiAgY29udHJvbGxlcjogRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzZXJpZXM6ICc8JyxcbiAgICBsYWJlbHM6ICc8JyxcbiAgICBkYXRhOiAnPCcsXG4gICAgb3B0aW9uczogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgnZGFzaGJvYXJkQW5hbHl0aWNzJywgZGFzaGJvYXJkQW5hbHl0aWNzKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyKCRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwubGFiZWxzID0gWycyMDA2JywgJzIwMDcnLCAnMjAwOCcsICcyMDA5JywgJzIwMTAnLCAnMjAxMScsICcyMDEyJ107XG4gIGN0cmwuc2VyaWVzID0gWydWaXNpdG9ycycsICdQYWdlIFZpZXdzJ107XG5cbiAgY3RybC5kYXRhID0gW1xuICAgIFs2NSwgNTksIDgwLCA4MSwgNTYsIDU1LCA0MF0sXG4gICAgWzI4LCA0OCwgNDAsIDE5LCA4NiwgMjcsIDkwXVxuICBdO1xuXG4gIGN0cmwub3B0aW9ucyA9IHtcbiAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gIH07XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgJGxvZy5sb2coXCJUaGlzIHdpbGwgcGVyZm9ybSB0aGUgUkVTVCBBUEkgY2FsbCB0byBnb29nbGUgYW5hbHl0aWNzIG9uIHBhZ2UgbG9hZFwiKTtcbiAgfTtcblxufTtcblxuRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXInLCBEYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyKTsiLCIiLCJ2YXIgZGFzaGJvYXJkQ29tbWVudHMgPSB7XG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWNvbW1lbnRzL2Rhc2hib2FyZC1jb21tZW50cy5odG1sJyxcbiAgICBjb250cm9sbGVyOiBEYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXIsXG4gICAgYmluZGluZ3M6IHtcbiAgICAgICAgY29tbWVudHM6ICc8J1xuICAgIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gICAgLmNvbXBvbmVudCgnZGFzaGJvYXJkQ29tbWVudHMnLCBkYXNoYm9hcmRDb21tZW50cyk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyKCRzY29wZSl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xufVxuXG5EYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb250cm9sbGVyKCdEYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXInLCBEYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXIpOyIsInZhciBkYXNoYm9hcmRHcm93dGggPSB7XG4gIHRlbXBsYXRlVXJsIDogJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1ncm93dGgvZGFzaGJvYXJkLWdyb3d0aC5odG1sJyxcbiAgY29udHJvbGxlcjogRGFzaGJvYXJkR3Jvd3RoQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB0b3RhbCA6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAuY29tcG9uZW50KCdkYXNoYm9hcmRHcm93dGgnLCBkYXNoYm9hcmRHcm93dGgpOyIsImZ1bmN0aW9uIERhc2hib2FyZEdyb3d0aENvbnRyb2xsZXIoVXNlclNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmdldFVzZXJzKClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIGN0cmwudG90YWwgPSByZXNwb25zZS5kYXRhLnVzZXJzLnRvdGFsO1xuICAgICAgfSk7XG4gIH07XG5cbn1cblxuRGFzaGJvYXJkR3Jvd3RoQ29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkR3Jvd3RoQ29udHJvbGxlcicsIERhc2hib2FyZEdyb3d0aENvbnRyb2xsZXIpOyIsInZhciBkYXNoYm9hcmRPYXV0aCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtb2F1dGgvZGFzaGJvYXJkLW9hdXRoLmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRPYXV0aENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgY2xpZW50czogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZE9hdXRoJywgZGFzaGJvYXJkT2F1dGgpOyIsImZ1bmN0aW9uIERhc2hib2FyZE9hdXRoQ29udHJvbGxlcigkaHR0cCwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgJGh0dHAuZ2V0KCdvYXV0aC9jbGllbnRzJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2cocmVzcG9uc2UpO1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbkRhc2hib2FyZE9hdXRoQ29udHJvbGxlci4kaW5qZWN0ID0gWyckaHR0cCcsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkT2F1dGhDb250cm9sbGVyJywgRGFzaGJvYXJkT2F1dGhDb250cm9sbGVyKTsiLCJ2YXIgZGFzaGJvYXJkVXNlcnMgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5odG1sJyxcbiAgY29udHJvbGxlcjogRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHNlcmllczogJzwnLFxuICAgIGxhYmVsczogJzwnLFxuICAgIGRhdGE6ICc8JyxcbiAgICBvcHRpb25zOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCdkYXNoYm9hcmRVc2VycycsIGRhc2hib2FyZFVzZXJzKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXIoVXNlclNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwubGFiZWxzID0gWyctNCBXZWVrJywgJy0zIFdlZWsnLCAnLTIgV2VlaycsICctMSBXZWVrJ107XG4gIGN0cmwuc2VyaWVzID0gWydOZXcgVXNlcnMnXTtcblxuICBjdHJsLm9wdGlvbnMgPSB7XG4gICAgc2NhbGVzOiB7XG4gICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzp0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICB9O1xuXG4gIGN0cmwuZGF0YSA9IFtcbiAgICBbNiwgMywgNCwgMl1cbiAgXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBVc2VyU2VydmljZS5nZXRHcm93dGgoKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKGN0cmwuZGF0YSk7XG4gICAgICAgIGN0cmwuZGF0YVswXSA9IHJlc3BvbnNlLmRhdGEuZ3Jvd3RoO1xuICAgICAgICAkbG9nLmxvZyhjdHJsLmRhdGEpO1xuICAgICAgfSk7XG4gIH07XG5cbn07XG5cbkRhc2hib2FyZFVzZXJzQ29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyJywgRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyKTsiLCIiLCJ2YXIgZW1haWxEYXNoYm9hcmQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9lbWFpbC9lbWFpbC1kYXNoYm9hcmQvZW1haWwtZGFzaGJvYXJkLmh0bWwnLFxuICBjb250cm9sbGVyOiBFbWFpbERhc2hib2FyZENvbnRyb2xsZXJcbn1cblxuYW5ndWxhci5tb2R1bGUoJ2VtYWlsJylcbiAgLmNvbXBvbmVudCgnZW1haWxEYXNoYm9hcmQnLCBlbWFpbERhc2hib2FyZCk7IiwiZnVuY3Rpb24gRW1haWxEYXNoYm9hcmRDb250cm9sbGVyKCRsb2cpe1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgJGxvZy5sb2coXCJFbWFpbCBDb250cm9sbGVyIEluaXRpYWxpemVkXCIpO1xuICB9XG5cbn1cblxuRW1haWxEYXNoYm9hcmRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2VtYWlsJylcbiAgLmNvbnRyb2xsZXIoJ0VtYWlsRGFzaGJvYXJkQ29udHJvbGxlcicsIEVtYWlsRGFzaGJvYXJkQ29udHJvbGxlcik7IiwidmFyIHNldHRpbmdzSW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtaW5kZXgvc2V0dGluZ3MtaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFNldHRpbmdzSW5kZXhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHNldHRpbmdzOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbXBvbmVudCgnc2V0dGluZ3NJbmRleCcsIHNldHRpbmdzSW5kZXgpOyIsImZ1bmN0aW9uIFNldHRpbmdzSW5kZXhDb250cm9sbGVyKCl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLnNldHRpbmdzID0ge1xuICAgIHRhZ2xpbmU6IFwiSGlnaCBRdWFsaXR5IFByb2dyYW1taW5nIFR1dG9yaWFsc1wiLFxuICAgIHNpdGVVcmw6IFwiaHR0cHM6Ly90dXRvcmlhbGVkZ2UubmV0XCIsXG4gICAgYWRtaW5FbWFpbDogXCJhZG1pbkB0dXRvcmlhbGVkZ2UubmV0XCIsXG4gICAgbWV0YTogXCJ8IFR1dG9yaWFsZWRnZS5uZXRcIlxuICB9XG5cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbnRyb2xsZXIoJ1NldHRpbmdzSW5kZXhDb250cm9sbGVyJywgU2V0dGluZ3NJbmRleENvbnRyb2xsZXIpOyIsInZhciBzb2NpYWxEYXNoYm9hcmQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc29jaWFsL3NvY2lhbC1kYXNoYm9hcmQvc29jaWFsLWRhc2hib2FyZC5odG1sJyxcbiAgY29udHJvbGxlcjogU29jaWFsRGFzaGJvYXJkQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzb2NpYWxEYXNoYm9hcmQ6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29tcG9uZW50KCdzb2NpYWxEYXNoYm9hcmQnLCBzb2NpYWxEYXNoYm9hcmQpOyIsImZ1bmN0aW9uIFNvY2lhbERhc2hib2FyZENvbnRyb2xsZXIoJGxvZyl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAkbG9nLmxvZyhcIkhlbGxvIFdvcmxkXCIpO1xuICB9XG59XG5cblNvY2lhbERhc2hib2FyZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbnRyb2xsZXIoJ1NvY2lhbERhc2hib2FyZENvbnRyb2xsZXInLCBTb2NpYWxEYXNoYm9hcmRDb250cm9sbGVyKTsiLCJ2YXIgeW91dHViZVN1YnNjcmliZXJzID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NvY2lhbC95b3V0dWJlLXN1YnNjcmliZXJzL3lvdXR1YmUtc3Vic2NyaWJlcnMuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFlvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlciwgXG4gIGJpbmRpbmdzOiB7XG4gICAgeW91dHViZVN1YnNjcmliZXJzOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbXBvbmVudCgneW91dHViZVN1YnNjcmliZXJzJywgeW91dHViZVN1YnNjcmliZXJzKTsiLCJmdW5jdGlvbiBZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXIoKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwueW91dHViZVN1YnNjcmliZXJzID0gW3sgbmFtZTogJ2VsbGlvdCd9XTtcblxufVxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb250cm9sbGVyKCdZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXInLCBZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXIpOyIsImZ1bmN0aW9uIHlvdXR1YmVTdWJzY3JpYmVyUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy95b3V0dWJlLXN1YnNjcmliZXJzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHlvdXR1YmUtc3Vic2NyaWJlcnM+PC95b3V0dWJlLXN1YnNjcmliZXJzPidcbiAgICAgIH0pO1xufVxueW91dHViZVN1YnNjcmliZXJSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb25maWcoeW91dHViZVN1YnNjcmliZXJSb3V0ZXMpOyIsInZhciBzdGF0c0luZGV4ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3N0YXRzL3N0YXRzLWluZGV4L3N0YXRzLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBTdGF0c0luZGV4Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzdGF0czogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3N0YXRzJylcbiAgLmNvbXBvbmVudCgnc3RhdHNJbmRleCcsIHN0YXRzSW5kZXgpOyIsImZ1bmN0aW9uIFN0YXRzSW5kZXhDb250cm9sbGVyKCRzY29wZSkge1xuICAgIHZhciBjdHJsID0gdGhpcztcblxuICAgIGN0cmwuc3RhdHMgPSB7fTtcblxuICAgIGN0cmwuc3RhdHMuc2VyaWVzID0gWydWaXNpdG9ycycsICdQYWdlIFZpZXdzJ107XG5cbiAgICBjdHJsLnN0YXRzLnJlYWx0aW1lTGFiZWxzID0gWydNb2JpbGUnLCAnVGFibGV0JywgJ0Rlc2t0b3AnLCAnT3RoZXInXVxuICAgIGN0cmwuc3RhdHMudG9kYXlMYWJlbHMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J107XG4gICBcbiAgICBjdHJsLnN0YXRzLnJlYWx0aW1lID0gW1xuICAgICAgICA2NSwgNTksIDEwOCwgMjNcbiAgICBdO1xuXG4gICAgY3RybC5zdGF0cy50b2RheSA9IFtcbiAgICAgICAgWzM0MCwgNTQzLCA1MTIsIDU0MywgNDkzLCA0NDQsIDQzOV1cbiAgICBdO1xuXG4gICAgY3RybC5zdGF0cy5iYXJPcHRpb25zID0ge1xuICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGN0cmwuc3RhdHMucGllT3B0aW9ucyA9IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiB0cnVlXG4gICAgICAgIH1cbiAgICB9O1xuXG59XG5TdGF0c0luZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcbmFuZ3VsYXIubW9kdWxlKCdzdGF0cycpXG4gICAgLmNvbnRyb2xsZXIoJ1N0YXRzSW5kZXhDb250cm9sbGVyJywgU3RhdHNJbmRleENvbnRyb2xsZXIpOyIsInZhciB1c2VyRWRpdCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFVzZXJFZGl0Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb21wb25lbnQoJ3VzZXJFZGl0JywgdXNlckVkaXQpOyIsImZ1bmN0aW9uIFVzZXJFZGl0Q29udHJvbGxlcihVc2VyU2VydmljZSwgJGxvZywgJHJvdXRlUGFyYW1zKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbiAgdmFyIGlkID0gJHJvdXRlUGFyYW1zLmlkO1xuXG4gIGN0cmwudXNlciA9IHt9O1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCl7XG4gICAgVXNlclNlcnZpY2UuZ2V0VXNlcihpZClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4gICAgICB9KTtcbiAgfVxuXG59XG5cblVzZXJFZGl0Q29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICckbG9nJywgJyRyb3V0ZVBhcmFtcyddO1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb250cm9sbGVyKCdVc2VyRWRpdENvbnRyb2xsZXInLCBVc2VyRWRpdENvbnRyb2xsZXIpOyIsInZhciB1c2VySW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy91c2VyL3VzZXItaW5kZXgvdXNlci1pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogVXNlckluZGV4Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyczogJzwnLFxuICAgIHBhZ2VTZXR0aW5nczogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbXBvbmVudCgndXNlckluZGV4JywgdXNlckluZGV4KTsiLCJmdW5jdGlvbiBVc2VySW5kZXhDb250cm9sbGVyKFVzZXJTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLnVzZXJzID0gW107XG4gIGN0cmwucGFnZVNldHRpbmdzID0gW107XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UuZ2V0VXNlcnMoKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudXNlcnMgPSByZXNwb25zZS5kYXRhLnVzZXJzLmRhdGE7XG4gICAgICAgICRsb2cubG9nKHJlc3BvbnNlLmRhdGEudXNlcnMuZGF0YSk7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS51c2VycztcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5nZXROZXh0UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmdldFVzZXJzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSArIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC51c2VycyA9IHJlc3BvbnNlLmRhdGEudXNlcnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLnVzZXJzO1xuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLmdldFByZXZQYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UuZ2V0VXNlcnMoY3RybC5wYWdlU2V0dGluZ3MuY3VycmVudF9wYWdlIC0gMSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnVzZXJzID0gcmVzcG9uc2UuZGF0YS51c2Vycy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEudXNlcnM7XG4gICAgICB9KTtcbiAgfVxuXG59O1xuXG5Vc2VySW5kZXhDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29udHJvbGxlcignVXNlckluZGV4Q29udHJvbGxlcicsIFVzZXJJbmRleENvbnRyb2xsZXIpOyIsInZhciB1c2VyTmV3ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvdXNlci91c2VyLW5ldy91c2VyLW5ldy5odG1sJyxcbiAgY29udHJvbGxlcjogVXNlck5ld0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgdXNlcjogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29tcG9uZW50KCd1c2VyTmV3JywgdXNlck5ldyk7IiwiZnVuY3Rpb24gVXNlck5ld0NvbnRyb2xsZXIoVXNlclNlcnZpY2Upe1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5uZXdVc2VyID0gZnVuY3Rpb24odXNlcil7XG4gICAgVXNlclNlcnZpY2UubmV3VXNlcih1c2VyKTtcbiAgfTtcblxufTtcblxuVXNlck5ld0NvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29udHJvbGxlcignVXNlck5ld0NvbnRyb2xsZXInLCBVc2VyTmV3Q29udHJvbGxlcik7IiwidmFyIGFydGljbGVFZGl0ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1lZGl0L2FydGljbGUtZWRpdC5odG1sJyxcbiAgY29udHJvbGxlcjogQXJ0aWNsZUVkaXRDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGU6ICc8JyxcbiAgICB0YWdzOiAnPCcsXG4gICAgY291cnNlczogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbXBvbmVudCgnYXJ0aWNsZUVkaXQnLCBhcnRpY2xlRWRpdCk7IiwiZnVuY3Rpb24gQXJ0aWNsZUVkaXRDb250cm9sbGVyKCRsb2csIEFydGljbGVTZXJ2aWNlLCAkcm91dGVQYXJhbXMsIFRhZ1NlcnZpY2UsIENvdXJzZVNlcnZpY2UsICRxLCAkdGltZW91dCkge1xuICB2YXIgY3RybCA9IHRoaXM7XG4gIHZhciBzbHVnID0gJHJvdXRlUGFyYW1zLnNsdWc7XG4gIGN0cmwuYXJ0aWNsZSA9IHt9O1xuICBjdHJsLnRhZ3MgPSBbXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBBcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlKHNsdWcpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlID0gcmVzcG9uc2UuZGF0YS5sZXNzb247XG4gICAgICAgIHJldHVybiBUYWdTZXJ2aWNlLmdldFRhZ3MoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC50YWdzID0gcmVzcG9uc2UuZGF0YS50YWdzLmRhdGE7XG4gICAgICAgIHJldHVybiBDb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5jb3Vyc2VzID0gcmVzcG9uc2UuZGF0YS5jb3Vyc2VzLmRhdGE7XG4gICAgICAgICRsb2cubG9nKFwiQ29tcGxldGVkIExvYWRpbmdcIik7XG4gICAgICB9KVxuICB9O1xuICBcbiAgY3RybC5zYXZlID0gZnVuY3Rpb24oYXJ0aWNsZSkge1xuICAgICRsb2cubG9nKFwiU2F2ZSBhbnkgdXBkYXRlcyB0byB0aGUgYXJ0aWNsZVwiKTtcbiAgICBBcnRpY2xlU2VydmljZS51cGRhdGVBcnRpY2xlKGFydGljbGUpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgU2F2ZWQgQXJ0aWNsZVwiKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSwgZnVuY3Rpb24gZXJyb3IocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhcIkZhaWxlZCB0byBzYXZlIGFydGljbGVcIik7XG4gICAgICB9KTtcbiAgfTtcblxufTtcblxuQXJ0aWNsZUVkaXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnLCAnQXJ0aWNsZVNlcnZpY2UnLCAnJHJvdXRlUGFyYW1zJywgJ1RhZ1NlcnZpY2UnLCAnQ291cnNlU2VydmljZScsICckcScsICckdGltZW91dCddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29udHJvbGxlcignQXJ0aWNsZUVkaXRDb250cm9sbGVyJywgQXJ0aWNsZUVkaXRDb250cm9sbGVyKTtcbiIsInZhciBhcnRpY2xlc0hvbWUgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWhvbWUvYXJ0aWNsZXMtaG9tZS5odG1sJyxcbiAgY29udHJvbGxlcjogQXJ0aWNsZXNIb21lQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBhcnRpY2xlczogJzwnLFxuICAgIHBhZ2VTZXR0aW5nczogJzwnLFxuICAgIHRpdGxlOiAnPT8nXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb21wb25lbnQoJ2FydGljbGVzSG9tZScsIGFydGljbGVzSG9tZSk7IiwiZnVuY3Rpb24gQXJ0aWNsZXNIb21lQ29udHJvbGxlcihBcnRpY2xlU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5hcnRpY2xlcyA9IFtdO1xuXG4gIGN0cmwucGFnZSA9IDE7XG4gIGN0cmwucGFnZVNldHRpbmdzID0gW107XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKXtcbiAgICBBcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlcyhjdHJsLnBhZ2UpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucztcbiAgICAgIH0pO1xuICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IFJldHJpZXZlZCBsZXNzb25zOiBcIiArIGN0cmwuYXJ0aWNsZXMpOyAgXG4gIH1cblxuICBjdHJsLmdldFBhZ2VzID0gZnVuY3Rpb24obnVtYmVyKSB7XG4gICAgaWYobnVtYmVyID09IHVuZGVmaW5lZCl7XG4gICAgICBudW1iZXIgPSAxO1xuICAgIH1cbiAgICB2YXIgdG90YWxQYWdlcyA9IE1hdGguY2VpbChudW1iZXIgLyAxMCk7XG4gICAgcmV0dXJuIG5ldyBBcnJheSh0b3RhbFBhZ2VzKTtcbiAgfTtcblxuICBjdHJsLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLnNlYXJjaChjdHJsLnBhZ2UsIGN0cmwudGl0bGUpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucztcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5zZXRQYWdlID0gZnVuY3Rpb24ocGFnZSkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKHBhZ2UpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucztcbiAgICAgIH0pO1xuICB9O1xuXG4gIGN0cmwuZ2V0TmV4dFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBBcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlcyhjdHJsLnBhZ2VTZXR0aW5ncy5jdXJyZW50X3BhZ2UgKyAxKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLmxlc3NvbnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmxlc3NvbnM7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuZ2V0UHJldlBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBBcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlcyhjdHJsLnBhZ2VTZXR0aW5ncy5jdXJyZW50X3BhZ2UgLSAxKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLmxlc3NvbnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmxlc3NvbnM7XG4gICAgICB9KTtcbiAgfVxuXG5cbn07XG5cbkFydGljbGVzSG9tZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnQXJ0aWNsZVNlcnZpY2UnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29udHJvbGxlcignQXJ0aWNsZXNIb21lQ29udHJvbGxlcicsIEFydGljbGVzSG9tZUNvbnRyb2xsZXIpOyIsInZhciBhcnRpY2xlTmV3ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1uZXcvYXJ0aWNsZS1uZXcuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IEFydGljbGVOZXdDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGU6ICc8JyxcbiAgICB0YWdzOiAnPCcsXG4gICAgZXJyb3I6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29tcG9uZW50KCdhcnRpY2xlTmV3JywgYXJ0aWNsZU5ldyk7IiwiZnVuY3Rpb24gQXJ0aWNsZU5ld0NvbnRyb2xsZXIoQXJ0aWNsZVNlcnZpY2UsIENvdXJzZVNlcnZpY2UsICRsb2csIFRhZ1NlcnZpY2UsICRsb2NhdGlvbikge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5hcnRpY2xlID0ge307XG4gIGN0cmwuY291cnNlcyA9IFtdO1xuICBjdHJsLnRhZ3MgPSBbXTtcblxuICBjdHJsLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBDb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSkge1xuICAgICAgICBjdHJsLmNvdXJzZXMgPSByZXNwb25zZS5kYXRhLmNvdXJzZXMuZGF0YTtcbiAgICAgICAgcmV0dXJuIFRhZ1NlcnZpY2UuZ2V0VGFncygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnRhZ3MgPSByZXNwb25zZS5kYXRhLnRhZ3MuZGF0YTtcbiAgICAgICAgJGxvZy5sb2coXCJGaW5pc2hlZCBsb2FkaW5nXCIpOyAgICAgIFxuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLnNhdmUgPSBmdW5jdGlvbihhcnRpY2xlKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UubmV3QXJ0aWNsZShhcnRpY2xlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IFNhdmVkIEFydGljbGVcIik7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKFwiYXJ0aWNsZS9lZGl0L1wiICsgYXJ0aWNsZS5zbHVnKTtcbiAgICAgIH0sIGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJFcnJvcjogXCIgKyByZXNwb25zZSk7XG4gICAgICAgIGN0cmwuZXJyb3IgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuICB9OyAgXG5cbn07XG5cbkFydGljbGVOZXdDb250cm9sbGVyLiRpbmplY3QgPSBbJ0FydGljbGVTZXJ2aWNlJywgJ0NvdXJzZVNlcnZpY2UnLCAnJGxvZycsICdUYWdTZXJ2aWNlJywgJyRsb2NhdGlvbiddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29udHJvbGxlcignQXJ0aWNsZU5ld0NvbnRyb2xsZXInLCBBcnRpY2xlTmV3Q29udHJvbGxlcik7IiwidmFyIGZhY2Vib29rV2lkZ2V0ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy9mYWNlYm9vay13aWRnZXQvZmFjZWJvb2std2lkZ2V0Lmh0bWwnXG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29tcG9uZW50KCdmYWNlYm9va1dpZGdldCcsIGZhY2Vib29rV2lkZ2V0KTtcbiAgIiwidmFyIHR3aXR0ZXJXaWRnZXQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc29jaWFsL3NvY2lhbC13aWRnZXRzL3R3aXR0ZXItd2lkZ2V0L3R3aXR0ZXItd2lkZ2V0Lmh0bWwnLFxuICBjb250cm9sbGVyOiBTb2NpYWxUd2l0dGVyQ29udHJvbGxlclxufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbXBvbmVudCgndHdpdHRlcldpZGdldCcsIHR3aXR0ZXJXaWRnZXQpOyIsImZ1bmN0aW9uIFNvY2lhbFR3aXR0ZXJDb250cm9sbGVyKCl7XG4gIHZhciBjdHJsID0gdGhpcztcbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb250cm9sbGVyKCdTb2NpYWxUd2l0dGVyQ29udHJvbGxlcicsIFNvY2lhbFR3aXR0ZXJDb250cm9sbGVyKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
