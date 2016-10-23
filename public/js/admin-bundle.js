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
    'tags'
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
    getArticles: getArticles
  };

  return service;

}

ArticleService.$inject = ['$http', '$log', 'CSRF_TOKEN'];  

angular
  .module('articles')
  .factory('ArticleService', ArticleService);
angular.module('courses', []);

function CourseService($http, $log) {

  function getCourses() {
    return $http.get('api/courses');
  }

  var service = {
    getCourses : getCourses
  };

  return service;
}

CourseService.$inject = ['$http', '$log'];  

angular
  .module('courses')
  .factory('CourseService', CourseService);
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

angular.module('stats', ['chart.js']);
function statsRoutes($routeProvider){
    $routeProvider
      .when('/stats', {
          template: '<stats-index></stats-index>'
      });
};

statsRoutes.$inject = ['$routeProvider'];
angular.module('stats').config(statsRoutes);

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
        return $http.get('api/user/' + id);
    }

    function getUsers(page) {
        return $http.get('api/users?page=' + page);
    }

    function getGrowth() {
        return $http.get('api/users/growth');
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
    pageSettings: '<'
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
    error: '<'
  }
};

angular.module('articles')
  .component('articleNew', articleNew);
function ArticleNewController(ArticleService, CourseService, $log) {
  var ctrl = this;

  ctrl.article = {};
  ctrl.courses = [];

  ctrl.$onInit = function() {
    CourseService.getCourses()
      .then(function success(response) {
        ctrl.courses = response.data.courses.data;
      });
  }

  ctrl.save = function(article) {
    ArticleService.newArticle(article)
      .then(function success(response){
        $log.log("Successfully Saved Article");
      }, function error(response){
        $log.log("Error: " + response);
        ctrl.error = response;
      });
  };  

};

ArticleNewController.$inject = ['ArticleService', 'CourseService', '$log'];

angular.module('articles')
  .controller('ArticleNewController', ArticleNewController);
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
var youtubeSubscribers = {
  templateUrl: 'app/components/social/youtube-subscribers/youtube-subscribers.html',
  bindings: {
    youtubeSubscribers: '<'
  }
}

angular.module('social')
  .component('youtubeSubscribers', youtubeSubscribers);
function YoutubeSubscriberController(){
  var ctrl = this;
}
angular.module('social')
  .controller('YoutubeSubscriberController', YoutubeSubscriberController);
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
var facebookWidget = {
  templateUrl: 'app/components/social/social-widgets/facebook-widget/facebook-widget.html'
}

angular.module('social')
  .component('facebookWidget', facebookWidget);
  
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGVzLmpzIiwiY29tbW9uL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQuanMiLCJjb21tb24vbG9hZGluZy9sb2FkaW5nLmNvbnRyb2xsZXIuanMiLCJjb21tb24vdG9wLW5hdi90b3AtbmF2LmNvbXBvbmVudC5qcyIsImNvbW1vbi90b3AtbmF2L3RvcC1uYXYuY29udHJvbGxlci5qcyIsImNvbW1vbi9zZXJ2aWNlcy9mYWNlYm9vay5zZXJ2aWNlLmpzIiwiY29tbW9uL3NlcnZpY2VzL2dvb2dsZVBsdXMuc2VydmljZS5qcyIsImNvbW1vbi9zZXJ2aWNlcy90d2l0dGVyLnNlcnZpY2UuanMiLCJjb21tb24vc2VydmljZXMveW91dHViZS5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUuc2VydmljZS5qcyIsImNvbXBvbmVudHMvY291cnNlcy9jb3Vyc2UubW9kdWxlLmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQubW9kdWxlLmpzIiwiY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQucm91dGVzLmpzIiwiY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQuc2VydmljZS5qcyIsImNvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3N0YXRzL3N0YXRzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMucm91dGVzLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3RhZ3MvdGFnLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvdGFncy90YWcuc2VydmljZS5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci5tb2R1bGUuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWVkaXQvYXJ0aWNsZS1lZGl0LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1lZGl0L2FydGljbGUtZWRpdC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWhvbWUvYXJ0aWNsZXMtaG9tZS5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtaG9tZS9hcnRpY2xlcy1ob21lLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtbmV3L2FydGljbGUtbmV3LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1uZXcvYXJ0aWNsZS1uZXcuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWluZGV4L2NvbW1lbnQtaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtaW5kZXgvY29tbWVudC1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1pbmRleC9zZXR0aW5ncy1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWluZGV4L3NldHRpbmdzLWluZGV4LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3N0YXRzL3N0YXRzLWluZGV4L3N0YXRzLWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMtaW5kZXgvc3RhdHMtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC1kYXNoYm9hcmQvc29jaWFsLWRhc2hib2FyZC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtZGFzaGJvYXJkL3NvY2lhbC1kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc29jaWFsL3lvdXR1YmUtc3Vic2NyaWJlcnMveW91dHViZS1zdWJzY3JpYmVycy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC95b3V0dWJlLXN1YnNjcmliZXJzL3lvdXR1YmUtc3Vic2NyaWJlcnMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc29jaWFsL3lvdXR1YmUtc3Vic2NyaWJlcnMveW91dHViZS1zdWJzY3JpYmVycy5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYWN0aW9ucy9kYXNoYm9hcmQtYWN0aW9ucy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYWN0aW9ucy9kYXNoYm9hcmQtYWN0aW9ucy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFuYWx5dGljcy9kYXNoYm9hcmQtYW5hbHl0aWNzLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFuYWx5dGljcy9kYXNoYm9hcmQtYW5hbHl0aWNzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuY29tcG9uZW50cy5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1vYXV0aC9kYXNoYm9hcmQtb2F1dGguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLW9hdXRoL2Rhc2hib2FyZC1vYXV0aC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLWVkaXQvdXNlci1lZGl0LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLWVkaXQvdXNlci1lZGl0LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci1pbmRleC91c2VyLWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLWluZGV4L3VzZXItaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLW5ldy91c2VyLW5ldy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci1uZXcvdXNlci1uZXcuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC13aWRnZXRzL3R3aXR0ZXItd2lkZ2V0L3R3aXR0ZXItd2lkZ2V0LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC13aWRnZXRzL3R3aXR0ZXItd2lkZ2V0L3R3aXR0ZXItd2lkZ2V0LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy9mYWNlYm9vay13aWRnZXQvZmFjZWJvb2std2lkZ2V0LmNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUNBQTtBQ0FBO0FDQUE7QUNBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFkbWluLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdyb290JywgW1xuICAgICduZ1JvdXRlJyxcbiAgICAnYXJ0aWNsZXMnLFxuICAgICdkYXNoYm9hcmQnLFxuICAgICd1c2VyJyxcbiAgICAnY29tbWVudCcsXG4gICAgJ2NvdXJzZXMnLFxuICAgICdzdGF0cycsXG4gICAgJ3NldHRpbmdzJyxcbiAgICAnc29jaWFsJyxcbiAgICAndGFncydcbl0pO1xuIiwiZnVuY3Rpb24gcm91dGVQcm92aWRlcigkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGRhc2hib2FyZD48L2Rhc2hib2FyZD4nXG4gICAgICB9KTtcbn1cbnJvdXRlUHJvdmlkZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29uZmlnKHJvdXRlUHJvdmlkZXIpO1xuIiwidmFyIGxvYWRpbmcgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9jb21tb24vbG9hZGluZy9sb2FkaW5nLmh0bWwnLFxuICBjb250cm9sbGVyOiBMb2FkaW5nQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBpc0xvYWRpbmc6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2xvYWRpbmcnLCBsb2FkaW5nKTsiLCJmdW5jdGlvbiBMb2FkaW5nQ29udHJvbGxlcigpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignTG9hZGluZ0NvbnRyb2xsZXInLCBMb2FkaW5nQ29udHJvbGxlcik7IiwidmFyIHRvcE5hdiA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21tb24vdG9wLW5hdi90b3AtbmF2Lmh0bWwnLFxuICBjb250cm9sbGVyOiBUb3BOYXZDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHVzZXI6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCd0b3BOYXYnLCB0b3BOYXYpO1xuIiwiZnVuY3Rpb24gVG9wTmF2Q29udHJvbGxlcigpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignVG9wTmF2Q29udHJvbGxlcicsIFRvcE5hdkNvbnRyb2xsZXIpO1xuIiwiIiwiIiwiIiwiIiwiYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJywgW10pOyIsImZ1bmN0aW9uIGFydGljbGVSb3V0ZVByb3ZpZGVyKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9hcnRpY2xlcycse1xuICAgICAgICB0ZW1wbGF0ZTogJzxhcnRpY2xlcy1ob21lPjwvYXJ0aWNsZXMtaG9tZT4nXG4gICAgICB9KVxuICAgICAgLndoZW4oJy9hcnRpY2xlL25ldycsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8YXJ0aWNsZS1uZXc+PC9hcnRpY2xlLW5ldz4nXG4gICAgICB9KVxuICAgICAgLndoZW4oJy9hcnRpY2xlL2VkaXQvOnNsdWcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGFydGljbGUtZWRpdD48L2FydGljbGUtZWRpdD4nXG4gICAgICB9KVxuICAgICAgLm90aGVyd2lzZSh7IFxuICAgICAgICB0ZW1wbGF0ZTogJzxoMT5Ob3QgRm91bmQ8L2gxPidcbiAgICAgIH0pO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJykuY29uZmlnKGFydGljbGVSb3V0ZVByb3ZpZGVyKTtcbmFydGljbGVSb3V0ZVByb3ZpZGVyLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG4iLCJmdW5jdGlvbiBBcnRpY2xlU2VydmljZSgkaHR0cCwgJGxvZywgQ1NSRl9UT0tFTikge1xuXG4gICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUNzcmYtVG9rZW4nXSA9IENTUkZfVE9LRU47XG5cbiAgZnVuY3Rpb24gbmV3QXJ0aWNsZShhcnRpY2xlKSB7XG4gICAgY29uc29sZS5sb2coYXJ0aWNsZSk7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnYXJ0aWNsZXM/dj0nICsgRGF0ZS5ub3coKSxcbiAgICAgIGRhdGE6IGFydGljbGVcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUFydGljbGUoYXJ0aWNsZSkge1xuICAgIHJldHVybiAkaHR0cCh7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB1cmw6ICdhcnRpY2xlcy8nICsgYXJ0aWNsZS5zbHVnICsgXCI/dj1cIiArIERhdGUubm93KCksXG4gICAgICBkYXRhOiBhcnRpY2xlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVBcnRpY2xlKGlkKSB7XG4gICAgJGxvZy5sb2coXCJQbGFjZWhvbGRlciBmb3IgZGVsZXRpbmcgYW4gYXJ0aWNsZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFydGljbGUoc2x1Zykge1xuICAgIHJldHVybiAkaHR0cC5nZXQoXCJhcGkvbGVzc29uL1wiICsgc2x1ZyArIFwiP3Y9XCIgKyBEYXRlLm5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFydGljbGVzKHBhZ2Upe1xuICAgIHJldHVybiAkaHR0cC5nZXQoXCJhcGkvbGVzc29ucz9wYWdlPVwiICsgcGFnZSArIFwiJnY9XCIgKyBEYXRlLm5vdygpKTtcbiAgfVxuXG4gIHZhciBzZXJ2aWNlID0ge1xuICAgIG5ld0FydGljbGUgOiBuZXdBcnRpY2xlLFxuICAgIHVwZGF0ZUFydGljbGUgOiB1cGRhdGVBcnRpY2xlLFxuICAgIGRlbGV0ZUFydGljbGUgOiBkZWxldGVBcnRpY2xlLFxuICAgIGdldEFydGljbGUgOiBnZXRBcnRpY2xlLFxuICAgIGdldEFydGljbGVzOiBnZXRBcnRpY2xlc1xuICB9O1xuXG4gIHJldHVybiBzZXJ2aWNlO1xuXG59XG5cbkFydGljbGVTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnLCAnQ1NSRl9UT0tFTiddOyAgXG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuZmFjdG9yeSgnQXJ0aWNsZVNlcnZpY2UnLCBBcnRpY2xlU2VydmljZSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvdXJzZXMnLCBbXSk7XG4iLCJmdW5jdGlvbiBDb3Vyc2VTZXJ2aWNlKCRodHRwLCAkbG9nKSB7XG5cbiAgZnVuY3Rpb24gZ2V0Q291cnNlcygpIHtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvY291cnNlcycpO1xuICB9XG5cbiAgdmFyIHNlcnZpY2UgPSB7XG4gICAgZ2V0Q291cnNlcyA6IGdldENvdXJzZXNcbiAgfTtcblxuICByZXR1cm4gc2VydmljZTtcbn1cblxuQ291cnNlU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCcsICckbG9nJ107ICBcblxuYW5ndWxhclxuICAubW9kdWxlKCdjb3Vyc2VzJylcbiAgLmZhY3RvcnkoJ0NvdXJzZVNlcnZpY2UnLCBDb3Vyc2VTZXJ2aWNlKTsiLCJhbmd1bGFyLm1vZHVsZSgnY29tbWVudCcsIFtdKTsiLCJmdW5jdGlvbiBjb21tZW50Um91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9jb21tZW50cycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxjb21tZW50LWluZGV4PjwvY29tbWVudC1pbmRleD4nXG4gICAgICB9KTtcbn07XG5jb21tZW50Um91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpLmNvbmZpZyhjb21tZW50Um91dGVzKTtcbiIsImZ1bmN0aW9uIENvbW1lbnRTZXJ2aWNlKCRsb2cpe1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlQ29tbWVudChjb21tZW50SWQpIHtcbiAgICAgICAgJGxvZy5sb2coXCJEZWxldGluZyBhIGNvbW1lbnQgd2l0aCBpZDogXCIgKyBjb21tZW50SWQpO1xuICAgIH1cblxuICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICBkZWxldGVDb21tZW50IDogZGVsZXRlQ29tbWVudFxuICAgIH07XG5cbiAgICByZXR1cm4gc2VydmljZTtcbn1cbkNvbW1lbnRTZXJ2aWNlLiRpbmplY3QgPSBbJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnKVxuICAgIC5mYWN0b3J5KCdDb21tZW50U2VydmljZScsIENvbW1lbnRTZXJ2aWNlKTsiLCJhbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnLFtdKTsiLCJmdW5jdGlvbiBzZXR0aW5nc1JvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvc2V0dGluZ3MnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8c2V0dGluZ3MtaW5kZXg+PC9zZXR0aW5ncy1pbmRleD4nXG4gICAgICB9KTtcbn1cbnNldHRpbmdzUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbmZpZyhzZXR0aW5nc1JvdXRlcyk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnc3RhdHMnLCBbJ2NoYXJ0LmpzJ10pOyIsImZ1bmN0aW9uIHN0YXRzUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9zdGF0cycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxzdGF0cy1pbmRleD48L3N0YXRzLWluZGV4PidcbiAgICAgIH0pO1xufTtcblxuc3RhdHNSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmFuZ3VsYXIubW9kdWxlKCdzdGF0cycpLmNvbmZpZyhzdGF0c1JvdXRlcyk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnc29jaWFsJywgW10pOyIsImZ1bmN0aW9uIHNvY2lhbFJvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvc29jaWFsJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHNvY2lhbC1kYXNoYm9hcmQ+PC9zb2NpYWwtZGFzaGJvYXJkPidcbiAgICAgIH0pO1xufVxuc29jaWFsUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29uZmlnKHNvY2lhbFJvdXRlcyk7XG4iLCJhbmd1bGFyLm1vZHVsZSgndGFncycsIFtdKTsiLCJmdW5jdGlvbiBUYWdTZXJ2aWNlKCRodHRwLCAkbG9nKSB7XG5cbiAgZnVuY3Rpb24gZ2V0VGFncygpIHtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvdGFncycpO1xuICB9XG5cbiAgdmFyIHNlcnZpY2UgPSB7XG4gICAgZ2V0VGFncyA6IGdldFRhZ3NcbiAgfTtcblxuICByZXR1cm4gc2VydmljZTtcblxufVxuXG5UYWdTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnXTsgIFxuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ3RhZ3MnKVxuICAuZmFjdG9yeSgnVGFnU2VydmljZScsIFRhZ1NlcnZpY2UpOyIsInZhciBkYXNoYm9hcmQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRDb250cm9sbGVyXG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZCcsIGRhc2hib2FyZCk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQ29udHJvbGxlcigpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkQ29udHJvbGxlcicsIERhc2hib2FyZENvbnRyb2xsZXIpOyIsImFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnLCBbJ2NoYXJ0LmpzJ10pOyIsImFuZ3VsYXIubW9kdWxlKCd1c2VyJywgW10pOyIsImZ1bmN0aW9uIHVzZXJSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3VzZXJzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHVzZXItaW5kZXg+PC91c2VyLWluZGV4PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL3VzZXIvZWRpdC86aWQnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPHVzZXItZWRpdD48L3VzZXItZWRpdD4nICBcbiAgICAgIH0pXG4gICAgICAud2hlbignL3VzZXIvbmV3Jywge1xuICAgICAgICB0ZW1wbGF0ZTogJzx1c2VyLW5ldz48L3VzZXItbmV3PidcbiAgICAgIH0pO1xufTtcblxudXNlclJvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuYW5ndWxhci5tb2R1bGUoJ3VzZXInKS5jb25maWcodXNlclJvdXRlcyk7XG4iLCJmdW5jdGlvbiBVc2VyU2VydmljZSgkbG9nLCAkaHR0cCkge1xuXG4gICAgZnVuY3Rpb24gbmV3VXNlcih1c2VyKSB7XG4gICAgICAgICRsb2cubG9nKFwiQWRkaW5nIE5ldyBVc2VyXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVzZXIoaWQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXIvJyArIGlkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVc2VycyhwYWdlKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS91c2Vycz9wYWdlPScgKyBwYWdlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRHcm93dGgoKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS91c2Vycy9ncm93dGgnKTtcbiAgICB9XG5cbiAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgbmV3VXNlcjogbmV3VXNlcixcbiAgICAgICAgZ2V0VXNlcjogZ2V0VXNlcixcbiAgICAgICAgZ2V0VXNlcnM6IGdldFVzZXJzLFxuICAgICAgICBnZXRHcm93dGg6IGdldEdyb3d0aFxuICAgIH07XG5cbiAgICByZXR1cm4gc2VydmljZTtcbn07XG5cblVzZXJTZXJ2aWNlLiRpbmplY3QgPSBbJyRsb2cnLCAnJGh0dHAnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAgIC5mYWN0b3J5KCdVc2VyU2VydmljZScsIFVzZXJTZXJ2aWNlKTsiLCJ2YXIgYXJ0aWNsZUVkaXQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWVkaXQvYXJ0aWNsZS1lZGl0Lmh0bWwnLFxuICBjb250cm9sbGVyOiBBcnRpY2xlRWRpdENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgYXJ0aWNsZTogJzwnLFxuICAgIHRhZ3M6ICc8JyxcbiAgICBjb3Vyc2VzOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29tcG9uZW50KCdhcnRpY2xlRWRpdCcsIGFydGljbGVFZGl0KTsiLCJmdW5jdGlvbiBBcnRpY2xlRWRpdENvbnRyb2xsZXIoJGxvZywgQXJ0aWNsZVNlcnZpY2UsICRyb3V0ZVBhcmFtcywgVGFnU2VydmljZSwgQ291cnNlU2VydmljZSwgJHEsICR0aW1lb3V0KSB7XG4gIHZhciBjdHJsID0gdGhpcztcbiAgdmFyIHNsdWcgPSAkcm91dGVQYXJhbXMuc2x1ZztcbiAgY3RybC5hcnRpY2xlID0ge307XG4gIGN0cmwudGFncyA9IFtdO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGUoc2x1ZylcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGUgPSByZXNwb25zZS5kYXRhLmxlc3NvbjtcbiAgICAgICAgcmV0dXJuIFRhZ1NlcnZpY2UuZ2V0VGFncygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnRhZ3MgPSByZXNwb25zZS5kYXRhLnRhZ3MuZGF0YTtcbiAgICAgICAgcmV0dXJuIENvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmNvdXJzZXMgPSByZXNwb25zZS5kYXRhLmNvdXJzZXMuZGF0YTtcbiAgICAgICAgJGxvZy5sb2coXCJDb21wbGV0ZWQgTG9hZGluZ1wiKTtcbiAgICAgIH0pXG4gIH07XG4gIFxuICBjdHJsLnNhdmUgPSBmdW5jdGlvbihhcnRpY2xlKSB7XG4gICAgJGxvZy5sb2coXCJTYXZlIGFueSB1cGRhdGVzIHRvIHRoZSBhcnRpY2xlXCIpO1xuICAgIEFydGljbGVTZXJ2aWNlLnVwZGF0ZUFydGljbGUoYXJ0aWNsZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhcIlN1Y2Nlc3NmdWxseSBTYXZlZCBBcnRpY2xlXCIpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9LCBmdW5jdGlvbiBlcnJvcihyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiRmFpbGVkIHRvIHNhdmUgYXJ0aWNsZVwiKTtcbiAgICAgIH0pO1xuICB9O1xuXG59O1xuXG5BcnRpY2xlRWRpdENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZycsICdBcnRpY2xlU2VydmljZScsICckcm91dGVQYXJhbXMnLCAnVGFnU2VydmljZScsICdDb3Vyc2VTZXJ2aWNlJywgJyRxJywgJyR0aW1lb3V0J107XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb250cm9sbGVyKCdBcnRpY2xlRWRpdENvbnRyb2xsZXInLCBBcnRpY2xlRWRpdENvbnRyb2xsZXIpO1xuIiwidmFyIGFydGljbGVzSG9tZSA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtaG9tZS9hcnRpY2xlcy1ob21lLmh0bWwnLFxuICBjb250cm9sbGVyOiBBcnRpY2xlc0hvbWVDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGVzOiAnPCcsXG4gICAgcGFnZVNldHRpbmdzOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbXBvbmVudCgnYXJ0aWNsZXNIb21lJywgYXJ0aWNsZXNIb21lKTsiLCJmdW5jdGlvbiBBcnRpY2xlc0hvbWVDb250cm9sbGVyKEFydGljbGVTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmFydGljbGVzID0gW107XG5cbiAgY3RybC5wYWdlID0gMTtcbiAgY3RybC5wYWdlU2V0dGluZ3MgPSBbXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpe1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLmFydGljbGVzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS5sZXNzb25zO1xuICAgICAgfSk7XG4gICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgUmV0cmlldmVkIGxlc3NvbnM6IFwiICsgY3RybC5hcnRpY2xlcyk7ICBcbiAgfVxuXG4gIGN0cmwuZ2V0TmV4dFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBBcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlcyhjdHJsLnBhZ2VTZXR0aW5ncy5jdXJyZW50X3BhZ2UgKyAxKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLmxlc3NvbnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmxlc3NvbnM7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuZ2V0UHJldlBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBBcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlcyhjdHJsLnBhZ2VTZXR0aW5ncy5jdXJyZW50X3BhZ2UgLSAxKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLmxlc3NvbnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmxlc3NvbnM7XG4gICAgICB9KTtcbiAgfVxuXG5cbn07XG5cbkFydGljbGVzSG9tZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnQXJ0aWNsZVNlcnZpY2UnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29udHJvbGxlcignQXJ0aWNsZXNIb21lQ29udHJvbGxlcicsIEFydGljbGVzSG9tZUNvbnRyb2xsZXIpOyIsInZhciBhcnRpY2xlTmV3ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1uZXcvYXJ0aWNsZS1uZXcuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IEFydGljbGVOZXdDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGU6ICc8JyxcbiAgICBlcnJvcjogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb21wb25lbnQoJ2FydGljbGVOZXcnLCBhcnRpY2xlTmV3KTsiLCJmdW5jdGlvbiBBcnRpY2xlTmV3Q29udHJvbGxlcihBcnRpY2xlU2VydmljZSwgQ291cnNlU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5hcnRpY2xlID0ge307XG4gIGN0cmwuY291cnNlcyA9IFtdO1xuXG4gIGN0cmwuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIENvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKSB7XG4gICAgICAgIGN0cmwuY291cnNlcyA9IHJlc3BvbnNlLmRhdGEuY291cnNlcy5kYXRhO1xuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLnNhdmUgPSBmdW5jdGlvbihhcnRpY2xlKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UubmV3QXJ0aWNsZShhcnRpY2xlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IFNhdmVkIEFydGljbGVcIik7XG4gICAgICB9LCBmdW5jdGlvbiBlcnJvcihyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiRXJyb3I6IFwiICsgcmVzcG9uc2UpO1xuICAgICAgICBjdHJsLmVycm9yID0gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgfTsgIFxuXG59O1xuXG5BcnRpY2xlTmV3Q29udHJvbGxlci4kaW5qZWN0ID0gWydBcnRpY2xlU2VydmljZScsICdDb3Vyc2VTZXJ2aWNlJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbnRyb2xsZXIoJ0FydGljbGVOZXdDb250cm9sbGVyJywgQXJ0aWNsZU5ld0NvbnRyb2xsZXIpOyIsInZhciBjb21tZW50SW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtaW5kZXgvY29tbWVudC1pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogQ29tbWVudEluZGV4Q29udHJvbGxlclxuICBcbn1cblxuYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnKVxuICAuY29tcG9uZW50KCdjb21tZW50SW5kZXgnLCBjb21tZW50SW5kZXgpOyIsImZ1bmN0aW9uIENvbW1lbnRJbmRleENvbnRyb2xsZXIoQ29tbWVudFNlcnZpY2Upe1xuICAgIHZhciBjdHJsID0gdGhpcztcblxuICAgIGN0cmwuZGVsZXRlQ29tbWVudCA9IGZ1bmN0aW9uKGNvbW1lbnRJZCl7XG4gICAgICAgIENvbW1lbnRTZXJ2aWNlLmRlbGV0ZUNvbW1lbnQoY29tbWVudElkKTtcbiAgICB9XG59XG5cbkNvbW1lbnRJbmRleENvbnRyb2xsZXIuJGluamVjdCA9IFsnQ29tbWVudFNlcnZpY2UnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnKVxuICAgIC5jb250cm9sbGVyKCdDb21tZW50SW5kZXhDb250cm9sbGVyJywgQ29tbWVudEluZGV4Q29udHJvbGxlcik7IiwidmFyIHNldHRpbmdzSW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtaW5kZXgvc2V0dGluZ3MtaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFNldHRpbmdzSW5kZXhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHNldHRpbmdzOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbXBvbmVudCgnc2V0dGluZ3NJbmRleCcsIHNldHRpbmdzSW5kZXgpOyIsImZ1bmN0aW9uIFNldHRpbmdzSW5kZXhDb250cm9sbGVyKCl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLnNldHRpbmdzID0ge1xuICAgIHRhZ2xpbmU6IFwiSGlnaCBRdWFsaXR5IFByb2dyYW1taW5nIFR1dG9yaWFsc1wiLFxuICAgIHNpdGVVcmw6IFwiaHR0cHM6Ly90dXRvcmlhbGVkZ2UubmV0XCIsXG4gICAgYWRtaW5FbWFpbDogXCJhZG1pbkB0dXRvcmlhbGVkZ2UubmV0XCIsXG4gICAgbWV0YTogXCJ8IFR1dG9yaWFsZWRnZS5uZXRcIlxuICB9XG5cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbnRyb2xsZXIoJ1NldHRpbmdzSW5kZXhDb250cm9sbGVyJywgU2V0dGluZ3NJbmRleENvbnRyb2xsZXIpOyIsInZhciBzdGF0c0luZGV4ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3N0YXRzL3N0YXRzLWluZGV4L3N0YXRzLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBTdGF0c0luZGV4Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzdGF0czogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3N0YXRzJylcbiAgLmNvbXBvbmVudCgnc3RhdHNJbmRleCcsIHN0YXRzSW5kZXgpOyIsImZ1bmN0aW9uIFN0YXRzSW5kZXhDb250cm9sbGVyKCRzY29wZSkge1xuICAgIHZhciBjdHJsID0gdGhpcztcblxuICAgIGN0cmwuc3RhdHMgPSB7fTtcblxuICAgIGN0cmwuc3RhdHMuc2VyaWVzID0gWydWaXNpdG9ycycsICdQYWdlIFZpZXdzJ107XG5cbiAgICBjdHJsLnN0YXRzLnJlYWx0aW1lTGFiZWxzID0gWydNb2JpbGUnLCAnVGFibGV0JywgJ0Rlc2t0b3AnLCAnT3RoZXInXVxuICAgIGN0cmwuc3RhdHMudG9kYXlMYWJlbHMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J107XG4gICBcbiAgICBjdHJsLnN0YXRzLnJlYWx0aW1lID0gW1xuICAgICAgICA2NSwgNTksIDEwOCwgMjNcbiAgICBdO1xuXG4gICAgY3RybC5zdGF0cy50b2RheSA9IFtcbiAgICAgICAgWzM0MCwgNTQzLCA1MTIsIDU0MywgNDkzLCA0NDQsIDQzOV1cbiAgICBdO1xuXG4gICAgY3RybC5zdGF0cy5iYXJPcHRpb25zID0ge1xuICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGN0cmwuc3RhdHMucGllT3B0aW9ucyA9IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiB0cnVlXG4gICAgICAgIH1cbiAgICB9O1xuXG59XG5TdGF0c0luZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcbmFuZ3VsYXIubW9kdWxlKCdzdGF0cycpXG4gICAgLmNvbnRyb2xsZXIoJ1N0YXRzSW5kZXhDb250cm9sbGVyJywgU3RhdHNJbmRleENvbnRyb2xsZXIpOyIsInZhciB5b3V0dWJlU3Vic2NyaWJlcnMgPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc29jaWFsL3lvdXR1YmUtc3Vic2NyaWJlcnMveW91dHViZS1zdWJzY3JpYmVycy5odG1sJyxcbiAgYmluZGluZ3M6IHtcbiAgICB5b3V0dWJlU3Vic2NyaWJlcnM6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29tcG9uZW50KCd5b3V0dWJlU3Vic2NyaWJlcnMnLCB5b3V0dWJlU3Vic2NyaWJlcnMpOyIsImZ1bmN0aW9uIFlvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlcigpe1xuICB2YXIgY3RybCA9IHRoaXM7XG59XG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbnRyb2xsZXIoJ1lvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlcicsIFlvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlcik7IiwidmFyIHlvdXR1YmVTdWJzY3JpYmVycyA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLmh0bWwnLFxuICBjb250cm9sbGVyOiBZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXIsIFxuICBiaW5kaW5nczoge1xuICAgIHlvdXR1YmVTdWJzY3JpYmVyczogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb21wb25lbnQoJ3lvdXR1YmVTdWJzY3JpYmVycycsIHlvdXR1YmVTdWJzY3JpYmVycyk7IiwiZnVuY3Rpb24gWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyKCl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLnlvdXR1YmVTdWJzY3JpYmVycyA9IFt7IG5hbWU6ICdlbGxpb3QnfV07XG5cbn1cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29udHJvbGxlcignWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyJywgWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyKTsiLCJmdW5jdGlvbiB5b3V0dWJlU3Vic2NyaWJlclJvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcveW91dHViZS1zdWJzY3JpYmVycycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzx5b3V0dWJlLXN1YnNjcmliZXJzPjwveW91dHViZS1zdWJzY3JpYmVycz4nXG4gICAgICB9KTtcbn1cbnlvdXR1YmVTdWJzY3JpYmVyUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29uZmlnKHlvdXR1YmVTdWJzY3JpYmVyUm91dGVzKTsiLCJ2YXIgZGFzaGJvYXJkQWN0aW9ucyA9IHtcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYWN0aW9ucy9kYXNoYm9hcmQtYWN0aW9ucy5odG1sJyxcbiAgICBjb250cm9sbGVyOiBEYXNoYm9hcmRBY3Rpb25Db250cm9sbGVyXG4gICAgXG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgICAuY29tcG9uZW50KCdkYXNoYm9hcmRBY3Rpb25zJywgZGFzaGJvYXJkQWN0aW9ucyk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQWN0aW9uQ29udHJvbGxlcigpe1xuICAgIHZhciBjdHJsID0gdGhpcztcbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gICAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEFjdGlvbkNvbnRyb2xsZXInLCBEYXNoYm9hcmRBY3Rpb25Db250cm9sbGVyKTsiLCJ2YXIgZGFzaGJvYXJkQW5hbHl0aWNzID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5odG1sJyxcbiAgY29udHJvbGxlcjogRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzZXJpZXM6ICc8JyxcbiAgICBsYWJlbHM6ICc8JyxcbiAgICBkYXRhOiAnPCcsXG4gICAgb3B0aW9uczogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgnZGFzaGJvYXJkQW5hbHl0aWNzJywgZGFzaGJvYXJkQW5hbHl0aWNzKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyKCRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwubGFiZWxzID0gWycyMDA2JywgJzIwMDcnLCAnMjAwOCcsICcyMDA5JywgJzIwMTAnLCAnMjAxMScsICcyMDEyJ107XG4gIGN0cmwuc2VyaWVzID0gWydWaXNpdG9ycycsICdQYWdlIFZpZXdzJ107XG5cbiAgY3RybC5kYXRhID0gW1xuICAgIFs2NSwgNTksIDgwLCA4MSwgNTYsIDU1LCA0MF0sXG4gICAgWzI4LCA0OCwgNDAsIDE5LCA4NiwgMjcsIDkwXVxuICBdO1xuXG4gIGN0cmwub3B0aW9ucyA9IHtcbiAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gIH07XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgJGxvZy5sb2coXCJUaGlzIHdpbGwgcGVyZm9ybSB0aGUgUkVTVCBBUEkgY2FsbCB0byBnb29nbGUgYW5hbHl0aWNzIG9uIHBhZ2UgbG9hZFwiKTtcbiAgfTtcblxufTtcblxuRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXInLCBEYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyKTsiLCIiLCJ2YXIgZGFzaGJvYXJkQ29tbWVudHMgPSB7XG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWNvbW1lbnRzL2Rhc2hib2FyZC1jb21tZW50cy5odG1sJyxcbiAgICBjb250cm9sbGVyOiBEYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXIsXG4gICAgYmluZGluZ3M6IHtcbiAgICAgICAgY29tbWVudHM6ICc8J1xuICAgIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gICAgLmNvbXBvbmVudCgnZGFzaGJvYXJkQ29tbWVudHMnLCBkYXNoYm9hcmRDb21tZW50cyk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyKCRzY29wZSl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xufVxuXG5EYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb250cm9sbGVyKCdEYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXInLCBEYXNoYm9hcmRDb21tZW50c0NvbnRyb2xsZXIpOyIsInZhciBkYXNoYm9hcmRPYXV0aCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtb2F1dGgvZGFzaGJvYXJkLW9hdXRoLmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRPYXV0aENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgY2xpZW50czogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZE9hdXRoJywgZGFzaGJvYXJkT2F1dGgpOyIsImZ1bmN0aW9uIERhc2hib2FyZE9hdXRoQ29udHJvbGxlcigkaHR0cCwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgJGh0dHAuZ2V0KCdvYXV0aC9jbGllbnRzJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5EYXNoYm9hcmRPYXV0aENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZE9hdXRoQ29udHJvbGxlcicsIERhc2hib2FyZE9hdXRoQ29udHJvbGxlcik7IiwidmFyIGRhc2hib2FyZFVzZXJzID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC11c2Vycy9kYXNoYm9hcmQtdXNlcnMuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IERhc2hib2FyZFVzZXJzQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzZXJpZXM6ICc8JyxcbiAgICBsYWJlbHM6ICc8JyxcbiAgICBkYXRhOiAnPCcsXG4gICAgb3B0aW9uczogJzwnXG4gIH1cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgnZGFzaGJvYXJkVXNlcnMnLCBkYXNoYm9hcmRVc2Vycyk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyKFVzZXJTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmxhYmVscyA9IFsnLTQgV2VlaycsICctMyBXZWVrJywgJy0yIFdlZWsnLCAnLTEgV2VlayddO1xuICBjdHJsLnNlcmllcyA9IFsnTmV3IFVzZXJzJ107XG5cbiAgY3RybC5vcHRpb25zID0ge1xuICAgIHNjYWxlczoge1xuICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgfTtcblxuICBjdHJsLmRhdGEgPSBbXG4gICAgWzYsIDMsIDQsIDJdXG4gIF07XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UuZ2V0R3Jvd3RoKClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhjdHJsLmRhdGEpO1xuICAgICAgICBjdHJsLmRhdGFbMF0gPSByZXNwb25zZS5kYXRhLmdyb3d0aDtcbiAgICAgICAgJGxvZy5sb2coY3RybC5kYXRhKTtcbiAgICAgIH0pO1xuICB9O1xuXG59O1xuXG5EYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZFVzZXJzQ29udHJvbGxlcicsIERhc2hib2FyZFVzZXJzQ29udHJvbGxlcik7IiwiIiwidmFyIHVzZXJFZGl0ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3VzZXIvdXNlci1lZGl0L3VzZXItZWRpdC5odG1sJyxcbiAgY29udHJvbGxlcjogVXNlckVkaXRDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHVzZXI6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbXBvbmVudCgndXNlckVkaXQnLCB1c2VyRWRpdCk7IiwiZnVuY3Rpb24gVXNlckVkaXRDb250cm9sbGVyKFVzZXJTZXJ2aWNlLCAkbG9nLCAkcm91dGVQYXJhbXMpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuICB2YXIgaWQgPSAkcm91dGVQYXJhbXMuaWQ7XG5cbiAgY3RybC51c2VyID0ge307XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKXtcbiAgICBVc2VyU2VydmljZS5nZXRVc2VyKGlkKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbiAgICAgIH0pO1xuICB9XG5cbn1cblxuVXNlckVkaXRDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJywgJyRsb2cnLCAnJHJvdXRlUGFyYW1zJ107XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbnRyb2xsZXIoJ1VzZXJFZGl0Q29udHJvbGxlcicsIFVzZXJFZGl0Q29udHJvbGxlcik7IiwidmFyIHVzZXJJbmRleCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3VzZXIvdXNlci1pbmRleC91c2VyLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBVc2VySW5kZXhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHVzZXJzOiAnPCcsXG4gICAgcGFnZVNldHRpbmdzOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29tcG9uZW50KCd1c2VySW5kZXgnLCB1c2VySW5kZXgpOyIsImZ1bmN0aW9uIFVzZXJJbmRleENvbnRyb2xsZXIoVXNlclNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwudXNlcnMgPSBbXTtcbiAgY3RybC5wYWdlU2V0dGluZ3MgPSBbXTtcblxuICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBVc2VyU2VydmljZS5nZXRVc2VycygpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC51c2VycyA9IHJlc3BvbnNlLmRhdGEudXNlcnMuZGF0YTtcbiAgICAgICAgJGxvZy5sb2cocmVzcG9uc2UuZGF0YS51c2Vycy5kYXRhKTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLnVzZXJzO1xuICAgICAgfSk7XG4gIH1cblxuICBjdHJsLmdldE5leHRQYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UuZ2V0VXNlcnMoY3RybC5wYWdlU2V0dGluZ3MuY3VycmVudF9wYWdlICsgMSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnVzZXJzID0gcmVzcG9uc2UuZGF0YS51c2Vycy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEudXNlcnM7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuZ2V0UHJldlBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBVc2VyU2VydmljZS5nZXRVc2VycyhjdHJsLnBhZ2VTZXR0aW5ncy5jdXJyZW50X3BhZ2UgLSAxKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudXNlcnMgPSByZXNwb25zZS5kYXRhLnVzZXJzLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS51c2VycztcbiAgICAgIH0pO1xuICB9XG5cbn07XG5cblVzZXJJbmRleENvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb250cm9sbGVyKCdVc2VySW5kZXhDb250cm9sbGVyJywgVXNlckluZGV4Q29udHJvbGxlcik7IiwidmFyIHVzZXJOZXcgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy91c2VyL3VzZXItbmV3L3VzZXItbmV3Lmh0bWwnLFxuICBjb250cm9sbGVyOiBVc2VyTmV3Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb21wb25lbnQoJ3VzZXJOZXcnLCB1c2VyTmV3KTsiLCJmdW5jdGlvbiBVc2VyTmV3Q29udHJvbGxlcihVc2VyU2VydmljZSl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLm5ld1VzZXIgPSBmdW5jdGlvbih1c2VyKXtcbiAgICBVc2VyU2VydmljZS5uZXdVc2VyKHVzZXIpO1xuICB9O1xuXG59O1xuXG5Vc2VyTmV3Q29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZSddO1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb250cm9sbGVyKCdVc2VyTmV3Q29udHJvbGxlcicsIFVzZXJOZXdDb250cm9sbGVyKTsiLCJ2YXIgdHdpdHRlcldpZGdldCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvdHdpdHRlci13aWRnZXQvdHdpdHRlci13aWRnZXQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFNvY2lhbFR3aXR0ZXJDb250cm9sbGVyXG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29tcG9uZW50KCd0d2l0dGVyV2lkZ2V0JywgdHdpdHRlcldpZGdldCk7IiwiZnVuY3Rpb24gU29jaWFsVHdpdHRlckNvbnRyb2xsZXIoKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbnRyb2xsZXIoJ1NvY2lhbFR3aXR0ZXJDb250cm9sbGVyJywgU29jaWFsVHdpdHRlckNvbnRyb2xsZXIpOyIsInZhciBmYWNlYm9va1dpZGdldCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvZmFjZWJvb2std2lkZ2V0L2ZhY2Vib29rLXdpZGdldC5odG1sJ1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbXBvbmVudCgnZmFjZWJvb2tXaWRnZXQnLCBmYWNlYm9va1dpZGdldCk7XG4gICJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
