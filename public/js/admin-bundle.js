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
      url: 'articles',
      data: article
    });
  }

  function updateArticle(article) {
    return $http({
      method: 'PATCH',
      url: 'articles/' + article.slug,
      data: article
    });
  }

  function deleteArticle(id) {
    $log.log("Placeholder for deleting an article");
  }

  function getArticle(slug) {
    return $http.get("api/lesson/" + slug);
  }

  function getArticles(page){
    return $http.get("api/lessons?page=" + page);
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
angular.module('stats', ['chart.js']);
function statsRoutes($routeProvider){
    $routeProvider
      .when('/stats', {
          template: '<stats-index></stats-index>'
      });
};

statsRoutes.$inject = ['$routeProvider'];
angular.module('stats').config(statsRoutes);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGVzLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUuc2VydmljZS5qcyIsImNvbXBvbmVudHMvY29tbWVudC9jb21tZW50Lm1vZHVsZS5qcyIsImNvbXBvbmVudHMvY29tbWVudC9jb21tZW50LnJvdXRlcy5qcyIsImNvbXBvbmVudHMvY29tbWVudC9jb21tZW50LnNlcnZpY2UuanMiLCJjb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3Mucm91dGVzLmpzIiwiY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZS5tb2R1bGUuanMiLCJjb21wb25lbnRzL2NvdXJzZXMvY291cnNlLnNlcnZpY2UuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLnJvdXRlcy5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUuanMiLCJjb21wb25lbnRzL3RhZ3MvdGFnLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvdGFncy90YWcuc2VydmljZS5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zdGF0cy9zdGF0cy5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci5tb2R1bGUuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci5zZXJ2aWNlLmpzIiwiY29tbW9uL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQuanMiLCJjb21tb24vbG9hZGluZy9sb2FkaW5nLmNvbnRyb2xsZXIuanMiLCJjb21tb24vdG9wLW5hdi90b3AtbmF2LmNvbXBvbmVudC5qcyIsImNvbW1vbi90b3AtbmF2L3RvcC1uYXYuY29udHJvbGxlci5qcyIsImNvbW1vbi9zZXJ2aWNlcy9mYWNlYm9vay5zZXJ2aWNlLmpzIiwiY29tbW9uL3NlcnZpY2VzL2dvb2dsZVBsdXMuc2VydmljZS5qcyIsImNvbW1vbi9zZXJ2aWNlcy90d2l0dGVyLnNlcnZpY2UuanMiLCJjb21tb24vc2VydmljZXMveW91dHViZS5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWVkaXQvYXJ0aWNsZS1lZGl0LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1lZGl0L2FydGljbGUtZWRpdC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWhvbWUvYXJ0aWNsZXMtaG9tZS5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtaG9tZS9hcnRpY2xlcy1ob21lLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtbmV3L2FydGljbGUtbmV3LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1uZXcvYXJ0aWNsZS1uZXcuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWluZGV4L2NvbW1lbnQtaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtaW5kZXgvY29tbWVudC1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1pbmRleC9zZXR0aW5ncy1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWluZGV4L3NldHRpbmdzLWluZGV4LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtZGFzaGJvYXJkL3NvY2lhbC1kYXNoYm9hcmQuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLWRhc2hib2FyZC9zb2NpYWwtZGFzaGJvYXJkLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NvY2lhbC95b3V0dWJlLXN1YnNjcmliZXJzL3lvdXR1YmUtc3Vic2NyaWJlcnMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NvY2lhbC95b3V0dWJlLXN1YnNjcmliZXJzL3lvdXR1YmUtc3Vic2NyaWJlcnMucm91dGVzLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFjdGlvbnMvZGFzaGJvYXJkLWFjdGlvbnMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFjdGlvbnMvZGFzaGJvYXJkLWFjdGlvbnMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYW5hbHl0aWNzL2Rhc2hib2FyZC1hbmFseXRpY3MuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5tb2R1bGUuanMiLCJjb21wb25lbnRzL3N0YXRzL3N0YXRzLWluZGV4L3N0YXRzLWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMtaW5kZXgvc3RhdHMtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC11c2Vycy9kYXNoYm9hcmQtdXNlcnMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5tb2R1bGUuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtb2F1dGgvZGFzaGJvYXJkLW9hdXRoLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1vYXV0aC9kYXNoYm9hcmQtb2F1dGguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuY29tcG9uZW50cy5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLWluZGV4L3VzZXItaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItaW5kZXgvdXNlci1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItbmV3L3VzZXItbmV3LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvdXNlci91c2VyLW5ldy91c2VyLW5ldy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC13aWRnZXRzL2ZhY2Vib29rLXdpZGdldC9mYWNlYm9vay13aWRnZXQuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvdHdpdHRlci13aWRnZXQvdHdpdHRlci13aWRnZXQuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvdHdpdHRlci13aWRnZXQvdHdpdHRlci13aWRnZXQuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FDQUE7QUNBQTtBQ0FBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFkbWluLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdyb290JywgW1xuICAgICduZ1JvdXRlJyxcbiAgICAnYXJ0aWNsZXMnLFxuICAgICdkYXNoYm9hcmQnLFxuICAgICd1c2VyJyxcbiAgICAnY29tbWVudCcsXG4gICAgJ2NvdXJzZXMnLFxuICAgICdzdGF0cycsXG4gICAgJ3NldHRpbmdzJyxcbiAgICAnc29jaWFsJyxcbiAgICAndGFncydcbl0pO1xuIiwiZnVuY3Rpb24gcm91dGVQcm92aWRlcigkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGRhc2hib2FyZD48L2Rhc2hib2FyZD4nXG4gICAgICB9KTtcbn1cbnJvdXRlUHJvdmlkZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29uZmlnKHJvdXRlUHJvdmlkZXIpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJywgW10pOyIsImZ1bmN0aW9uIGFydGljbGVSb3V0ZVByb3ZpZGVyKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9hcnRpY2xlcycse1xuICAgICAgICB0ZW1wbGF0ZTogJzxhcnRpY2xlcy1ob21lPjwvYXJ0aWNsZXMtaG9tZT4nXG4gICAgICB9KVxuICAgICAgLndoZW4oJy9hcnRpY2xlL25ldycsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8YXJ0aWNsZS1uZXc+PC9hcnRpY2xlLW5ldz4nXG4gICAgICB9KVxuICAgICAgLndoZW4oJy9hcnRpY2xlL2VkaXQvOnNsdWcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGFydGljbGUtZWRpdD48L2FydGljbGUtZWRpdD4nXG4gICAgICB9KVxuICAgICAgLm90aGVyd2lzZSh7IFxuICAgICAgICB0ZW1wbGF0ZTogJzxoMT5Ob3QgRm91bmQ8L2gxPidcbiAgICAgIH0pO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJykuY29uZmlnKGFydGljbGVSb3V0ZVByb3ZpZGVyKTtcbmFydGljbGVSb3V0ZVByb3ZpZGVyLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG4iLCJmdW5jdGlvbiBBcnRpY2xlU2VydmljZSgkaHR0cCwgJGxvZywgQ1NSRl9UT0tFTikge1xuXG4gICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUNzcmYtVG9rZW4nXSA9IENTUkZfVE9LRU47XG5cbiAgZnVuY3Rpb24gbmV3QXJ0aWNsZShhcnRpY2xlKSB7XG4gICAgY29uc29sZS5sb2coYXJ0aWNsZSk7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnYXJ0aWNsZXMnLFxuICAgICAgZGF0YTogYXJ0aWNsZVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQXJ0aWNsZShhcnRpY2xlKSB7XG4gICAgcmV0dXJuICRodHRwKHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHVybDogJ2FydGljbGVzLycgKyBhcnRpY2xlLnNsdWcsXG4gICAgICBkYXRhOiBhcnRpY2xlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVBcnRpY2xlKGlkKSB7XG4gICAgJGxvZy5sb2coXCJQbGFjZWhvbGRlciBmb3IgZGVsZXRpbmcgYW4gYXJ0aWNsZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFydGljbGUoc2x1Zykge1xuICAgIHJldHVybiAkaHR0cC5nZXQoXCJhcGkvbGVzc29uL1wiICsgc2x1Zyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBcnRpY2xlcyhwYWdlKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KFwiYXBpL2xlc3NvbnM/cGFnZT1cIiArIHBhZ2UpO1xuICB9XG5cbiAgdmFyIHNlcnZpY2UgPSB7XG4gICAgbmV3QXJ0aWNsZSA6IG5ld0FydGljbGUsXG4gICAgdXBkYXRlQXJ0aWNsZSA6IHVwZGF0ZUFydGljbGUsXG4gICAgZGVsZXRlQXJ0aWNsZSA6IGRlbGV0ZUFydGljbGUsXG4gICAgZ2V0QXJ0aWNsZSA6IGdldEFydGljbGUsXG4gICAgZ2V0QXJ0aWNsZXM6IGdldEFydGljbGVzXG4gIH07XG5cbiAgcmV0dXJuIHNlcnZpY2U7XG5cbn1cblxuQXJ0aWNsZVNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZycsICdDU1JGX1RPS0VOJ107ICBcblxuYW5ndWxhclxuICAubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5mYWN0b3J5KCdBcnRpY2xlU2VydmljZScsIEFydGljbGVTZXJ2aWNlKTsiLCJhbmd1bGFyLm1vZHVsZSgnY29tbWVudCcsIFtdKTsiLCJmdW5jdGlvbiBjb21tZW50Um91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9jb21tZW50cycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxjb21tZW50LWluZGV4PjwvY29tbWVudC1pbmRleD4nXG4gICAgICB9KTtcbn07XG5jb21tZW50Um91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpLmNvbmZpZyhjb21tZW50Um91dGVzKTtcbiIsImZ1bmN0aW9uIENvbW1lbnRTZXJ2aWNlKCRsb2cpe1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlQ29tbWVudChjb21tZW50SWQpIHtcbiAgICAgICAgJGxvZy5sb2coXCJEZWxldGluZyBhIGNvbW1lbnQgd2l0aCBpZDogXCIgKyBjb21tZW50SWQpO1xuICAgIH1cblxuICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICBkZWxldGVDb21tZW50IDogZGVsZXRlQ29tbWVudFxuICAgIH07XG5cbiAgICByZXR1cm4gc2VydmljZTtcbn1cbkNvbW1lbnRTZXJ2aWNlLiRpbmplY3QgPSBbJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnKVxuICAgIC5mYWN0b3J5KCdDb21tZW50U2VydmljZScsIENvbW1lbnRTZXJ2aWNlKTsiLCJhbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnLFtdKTsiLCJmdW5jdGlvbiBzZXR0aW5nc1JvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvc2V0dGluZ3MnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8c2V0dGluZ3MtaW5kZXg+PC9zZXR0aW5ncy1pbmRleD4nXG4gICAgICB9KTtcbn1cbnNldHRpbmdzUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbmZpZyhzZXR0aW5nc1JvdXRlcyk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY291cnNlcycsIFtdKTtcbiIsImZ1bmN0aW9uIENvdXJzZVNlcnZpY2UoJGh0dHAsICRsb2cpIHtcblxuICBmdW5jdGlvbiBnZXRDb3Vyc2VzKCkge1xuICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS9jb3Vyc2VzJyk7XG4gIH1cblxuICB2YXIgc2VydmljZSA9IHtcbiAgICBnZXRDb3Vyc2VzIDogZ2V0Q291cnNlc1xuICB9O1xuXG4gIHJldHVybiBzZXJ2aWNlO1xufVxuXG5Db3Vyc2VTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnXTsgIFxuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ2NvdXJzZXMnKVxuICAuZmFjdG9yeSgnQ291cnNlU2VydmljZScsIENvdXJzZVNlcnZpY2UpOyIsImFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnLCBbXSk7IiwiZnVuY3Rpb24gc29jaWFsUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9zb2NpYWwnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8c29jaWFsLWRhc2hib2FyZD48L3NvY2lhbC1kYXNoYm9hcmQ+J1xuICAgICAgfSk7XG59XG5zb2NpYWxSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb25maWcoc29jaWFsUm91dGVzKTtcbiIsInZhciBkYXNoYm9hcmQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRDb250cm9sbGVyXG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZCcsIGRhc2hib2FyZCk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQ29udHJvbGxlcigpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkQ29udHJvbGxlcicsIERhc2hib2FyZENvbnRyb2xsZXIpOyIsImFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnLCBbJ2NoYXJ0LmpzJ10pOyIsImFuZ3VsYXIubW9kdWxlKCd0YWdzJywgW10pOyIsImZ1bmN0aW9uIFRhZ1NlcnZpY2UoJGh0dHAsICRsb2cpIHtcblxuICBmdW5jdGlvbiBnZXRUYWdzKCkge1xuICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS90YWdzJyk7XG4gIH1cblxuICB2YXIgc2VydmljZSA9IHtcbiAgICBnZXRUYWdzIDogZ2V0VGFnc1xuICB9O1xuXG4gIHJldHVybiBzZXJ2aWNlO1xuXG59XG5cblRhZ1NlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZyddOyAgXG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgndGFncycpXG4gIC5mYWN0b3J5KCdUYWdTZXJ2aWNlJywgVGFnU2VydmljZSk7IiwiYW5ndWxhci5tb2R1bGUoJ3N0YXRzJywgWydjaGFydC5qcyddKTsiLCJmdW5jdGlvbiBzdGF0c1JvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvc3RhdHMnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8c3RhdHMtaW5kZXg+PC9zdGF0cy1pbmRleD4nXG4gICAgICB9KTtcbn07XG5cbnN0YXRzUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5hbmd1bGFyLm1vZHVsZSgnc3RhdHMnKS5jb25maWcoc3RhdHNSb3V0ZXMpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ3VzZXInLCBbXSk7IiwiZnVuY3Rpb24gdXNlclJvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvdXNlcnMnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8dXNlci1pbmRleD48L3VzZXItaW5kZXg+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvdXNlci9lZGl0LzppZCcsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8dXNlci1lZGl0PjwvdXNlci1lZGl0PicgIFxuICAgICAgfSlcbiAgICAgIC53aGVuKCcvdXNlci9uZXcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPHVzZXItbmV3PjwvdXNlci1uZXc+J1xuICAgICAgfSk7XG59O1xuXG51c2VyUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5hbmd1bGFyLm1vZHVsZSgndXNlcicpLmNvbmZpZyh1c2VyUm91dGVzKTtcbiIsImZ1bmN0aW9uIFVzZXJTZXJ2aWNlKCRsb2csICRodHRwKSB7XG5cbiAgICBmdW5jdGlvbiBuZXdVc2VyKHVzZXIpIHtcbiAgICAgICAgJGxvZy5sb2coXCJBZGRpbmcgTmV3IFVzZXJcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VXNlcihpZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvdXNlci8nICsgaWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVzZXJzKHBhZ2UpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXJzP3BhZ2U9JyArIHBhZ2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEdyb3d0aCgpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXJzL2dyb3d0aCcpO1xuICAgIH1cblxuICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICBuZXdVc2VyOiBuZXdVc2VyLFxuICAgICAgICBnZXRVc2VyOiBnZXRVc2VyLFxuICAgICAgICBnZXRVc2VyczogZ2V0VXNlcnMsXG4gICAgICAgIGdldEdyb3d0aDogZ2V0R3Jvd3RoXG4gICAgfTtcblxuICAgIHJldHVybiBzZXJ2aWNlO1xufTtcblxuVXNlclNlcnZpY2UuJGluamVjdCA9IFsnJGxvZycsICckaHR0cCddO1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gICAgLmZhY3RvcnkoJ1VzZXJTZXJ2aWNlJywgVXNlclNlcnZpY2UpOyIsInZhciBsb2FkaW5nID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vY29tbW9uL2xvYWRpbmcvbG9hZGluZy5odG1sJyxcbiAgY29udHJvbGxlcjogTG9hZGluZ0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgaXNMb2FkaW5nOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCdsb2FkaW5nJywgbG9hZGluZyk7IiwiZnVuY3Rpb24gTG9hZGluZ0NvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0xvYWRpbmdDb250cm9sbGVyJywgTG9hZGluZ0NvbnRyb2xsZXIpOyIsInZhciB0b3BOYXYgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tbW9uL3RvcC1uYXYvdG9wLW5hdi5odG1sJyxcbiAgY29udHJvbGxlcjogVG9wTmF2Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhclxuICAubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgndG9wTmF2JywgdG9wTmF2KTtcbiIsImZ1bmN0aW9uIFRvcE5hdkNvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ1RvcE5hdkNvbnRyb2xsZXInLCBUb3BOYXZDb250cm9sbGVyKTtcbiIsIiIsIiIsIiIsIiIsInZhciBhcnRpY2xlRWRpdCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtZWRpdC9hcnRpY2xlLWVkaXQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IEFydGljbGVFZGl0Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBhcnRpY2xlOiAnPCcsXG4gICAgdGFnczogJzwnLFxuICAgIGNvdXJzZXM6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb21wb25lbnQoJ2FydGljbGVFZGl0JywgYXJ0aWNsZUVkaXQpOyIsImZ1bmN0aW9uIEFydGljbGVFZGl0Q29udHJvbGxlcigkbG9nLCBBcnRpY2xlU2VydmljZSwgJHJvdXRlUGFyYW1zLCBUYWdTZXJ2aWNlLCBDb3Vyc2VTZXJ2aWNlLCAkcSwgJHRpbWVvdXQpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuICB2YXIgc2x1ZyA9ICRyb3V0ZVBhcmFtcy5zbHVnO1xuICBjdHJsLmFydGljbGUgPSB7fTtcbiAgY3RybC50YWdzID0gW107XG5cbiAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgQXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZShzbHVnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZSA9IHJlc3BvbnNlLmRhdGEubGVzc29uO1xuICAgICAgICByZXR1cm4gVGFnU2VydmljZS5nZXRUYWdzKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudGFncyA9IHJlc3BvbnNlLmRhdGEudGFncy5kYXRhO1xuICAgICAgICByZXR1cm4gQ291cnNlU2VydmljZS5nZXRDb3Vyc2VzKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuY291cnNlcyA9IHJlc3BvbnNlLmRhdGEuY291cnNlcy5kYXRhO1xuICAgICAgICAkbG9nLmxvZyhcIkNvbXBsZXRlZCBMb2FkaW5nXCIpO1xuICAgICAgfSlcbiAgfTtcbiAgXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKGFydGljbGUpIHtcbiAgICAkbG9nLmxvZyhcIlNhdmUgYW55IHVwZGF0ZXMgdG8gdGhlIGFydGljbGVcIik7XG4gICAgQXJ0aWNsZVNlcnZpY2UudXBkYXRlQXJ0aWNsZShhcnRpY2xlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgICRsb2cubG9nKFwiU3VjY2Vzc2Z1bGx5IFNhdmVkIEFydGljbGVcIik7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJGYWlsZWQgdG8gc2F2ZSBhcnRpY2xlXCIpO1xuICAgICAgfSk7XG4gIH07XG5cbn07XG5cbkFydGljbGVFZGl0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9nJywgJ0FydGljbGVTZXJ2aWNlJywgJyRyb3V0ZVBhcmFtcycsICdUYWdTZXJ2aWNlJywgJ0NvdXJzZVNlcnZpY2UnLCAnJHEnLCAnJHRpbWVvdXQnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbnRyb2xsZXIoJ0FydGljbGVFZGl0Q29udHJvbGxlcicsIEFydGljbGVFZGl0Q29udHJvbGxlcik7XG4iLCJ2YXIgYXJ0aWNsZXNIb21lID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1ob21lL2FydGljbGVzLWhvbWUuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IEFydGljbGVzSG9tZUNvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgYXJ0aWNsZXM6ICc8JyxcbiAgICBwYWdlU2V0dGluZ3M6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29tcG9uZW50KCdhcnRpY2xlc0hvbWUnLCBhcnRpY2xlc0hvbWUpOyIsImZ1bmN0aW9uIEFydGljbGVzSG9tZUNvbnRyb2xsZXIoQXJ0aWNsZVNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuYXJ0aWNsZXMgPSBbXTtcblxuICBjdHJsLnBhZ2UgPSAxO1xuICBjdHJsLnBhZ2VTZXR0aW5ncyA9IFtdO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCl7XG4gICAgQXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZXMoY3RybC5wYWdlKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLmxlc3NvbnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmxlc3NvbnM7XG4gICAgICB9KTtcbiAgICAkbG9nLmxvZyhcIlN1Y2Nlc3NmdWxseSBSZXRyaWV2ZWQgbGVzc29uczogXCIgKyBjdHJsLmFydGljbGVzKTsgIFxuICB9XG5cbiAgY3RybC5nZXROZXh0UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSArIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucztcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5nZXRQcmV2UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIEFydGljbGVTZXJ2aWNlLmdldEFydGljbGVzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSAtIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC5hcnRpY2xlcyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucy5kYXRhO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEubGVzc29ucztcbiAgICAgIH0pO1xuICB9XG5cblxufTtcblxuQXJ0aWNsZXNIb21lQ29udHJvbGxlci4kaW5qZWN0ID0gWydBcnRpY2xlU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb250cm9sbGVyKCdBcnRpY2xlc0hvbWVDb250cm9sbGVyJywgQXJ0aWNsZXNIb21lQ29udHJvbGxlcik7IiwidmFyIGFydGljbGVOZXcgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLW5ldy9hcnRpY2xlLW5ldy5odG1sJyxcbiAgY29udHJvbGxlcjogQXJ0aWNsZU5ld0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgYXJ0aWNsZTogJzwnLFxuICAgIGVycm9yOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbXBvbmVudCgnYXJ0aWNsZU5ldycsIGFydGljbGVOZXcpOyIsImZ1bmN0aW9uIEFydGljbGVOZXdDb250cm9sbGVyKEFydGljbGVTZXJ2aWNlLCBDb3Vyc2VTZXJ2aWNlLCAkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmFydGljbGUgPSB7fTtcbiAgY3RybC5jb3Vyc2VzID0gW107XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgQ291cnNlU2VydmljZS5nZXRDb3Vyc2VzKClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2UpIHtcbiAgICAgICAgY3RybC5jb3Vyc2VzID0gcmVzcG9uc2UuZGF0YS5jb3Vyc2VzLmRhdGE7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKGFydGljbGUpIHtcbiAgICBBcnRpY2xlU2VydmljZS5uZXdBcnRpY2xlKGFydGljbGUpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJTdWNjZXNzZnVsbHkgU2F2ZWQgQXJ0aWNsZVwiKTtcbiAgICAgIH0sIGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coXCJFcnJvcjogXCIgKyByZXNwb25zZSk7XG4gICAgICAgIGN0cmwuZXJyb3IgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuICB9OyAgXG5cbn07XG5cbkFydGljbGVOZXdDb250cm9sbGVyLiRpbmplY3QgPSBbJ0FydGljbGVTZXJ2aWNlJywgJ0NvdXJzZVNlcnZpY2UnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29udHJvbGxlcignQXJ0aWNsZU5ld0NvbnRyb2xsZXInLCBBcnRpY2xlTmV3Q29udHJvbGxlcik7IiwidmFyIGNvbW1lbnRJbmRleCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1pbmRleC9jb21tZW50LWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBDb21tZW50SW5kZXhDb250cm9sbGVyXG4gIFxufVxuXG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpXG4gIC5jb21wb25lbnQoJ2NvbW1lbnRJbmRleCcsIGNvbW1lbnRJbmRleCk7IiwiZnVuY3Rpb24gQ29tbWVudEluZGV4Q29udHJvbGxlcihDb21tZW50U2VydmljZSl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gICAgY3RybC5kZWxldGVDb21tZW50ID0gZnVuY3Rpb24oY29tbWVudElkKXtcbiAgICAgICAgQ29tbWVudFNlcnZpY2UuZGVsZXRlQ29tbWVudChjb21tZW50SWQpO1xuICAgIH1cbn1cblxuQ29tbWVudEluZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWydDb21tZW50U2VydmljZSddO1xuXG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpXG4gICAgLmNvbnRyb2xsZXIoJ0NvbW1lbnRJbmRleENvbnRyb2xsZXInLCBDb21tZW50SW5kZXhDb250cm9sbGVyKTsiLCJ2YXIgc2V0dGluZ3NJbmRleCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1pbmRleC9zZXR0aW5ncy1pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogU2V0dGluZ3NJbmRleENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgc2V0dGluZ3M6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnKVxuICAuY29tcG9uZW50KCdzZXR0aW5nc0luZGV4Jywgc2V0dGluZ3NJbmRleCk7IiwiZnVuY3Rpb24gU2V0dGluZ3NJbmRleENvbnRyb2xsZXIoKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuc2V0dGluZ3MgPSB7XG4gICAgdGFnbGluZTogXCJIaWdoIFF1YWxpdHkgUHJvZ3JhbW1pbmcgVHV0b3JpYWxzXCIsXG4gICAgc2l0ZVVybDogXCJodHRwczovL3R1dG9yaWFsZWRnZS5uZXRcIixcbiAgICBhZG1pbkVtYWlsOiBcImFkbWluQHR1dG9yaWFsZWRnZS5uZXRcIixcbiAgICBtZXRhOiBcInwgVHV0b3JpYWxlZGdlLm5ldFwiXG4gIH1cblxufVxuXG5hbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnKVxuICAuY29udHJvbGxlcignU2V0dGluZ3NJbmRleENvbnRyb2xsZXInLCBTZXR0aW5nc0luZGV4Q29udHJvbGxlcik7IiwidmFyIHlvdXR1YmVTdWJzY3JpYmVycyA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLmh0bWwnLFxuICBiaW5kaW5nczoge1xuICAgIHlvdXR1YmVTdWJzY3JpYmVyczogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb21wb25lbnQoJ3lvdXR1YmVTdWJzY3JpYmVycycsIHlvdXR1YmVTdWJzY3JpYmVycyk7IiwiZnVuY3Rpb24gWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyKCl7XG4gIHZhciBjdHJsID0gdGhpcztcbn1cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29udHJvbGxlcignWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyJywgWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyKTsiLCJ2YXIgeW91dHViZVN1YnNjcmliZXJzID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NvY2lhbC95b3V0dWJlLXN1YnNjcmliZXJzL3lvdXR1YmUtc3Vic2NyaWJlcnMuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFlvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlciwgXG4gIGJpbmRpbmdzOiB7XG4gICAgeW91dHViZVN1YnNjcmliZXJzOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbXBvbmVudCgneW91dHViZVN1YnNjcmliZXJzJywgeW91dHViZVN1YnNjcmliZXJzKTsiLCJmdW5jdGlvbiBZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXIoKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwueW91dHViZVN1YnNjcmliZXJzID0gW3sgbmFtZTogJ2VsbGlvdCd9XTtcblxufVxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb250cm9sbGVyKCdZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXInLCBZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXIpOyIsImZ1bmN0aW9uIHlvdXR1YmVTdWJzY3JpYmVyUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy95b3V0dWJlLXN1YnNjcmliZXJzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHlvdXR1YmUtc3Vic2NyaWJlcnM+PC95b3V0dWJlLXN1YnNjcmliZXJzPidcbiAgICAgIH0pO1xufVxueW91dHViZVN1YnNjcmliZXJSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb25maWcoeW91dHViZVN1YnNjcmliZXJSb3V0ZXMpOyIsInZhciBkYXNoYm9hcmRBY3Rpb25zID0ge1xuICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hY3Rpb25zL2Rhc2hib2FyZC1hY3Rpb25zLmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6IERhc2hib2FyZEFjdGlvbkNvbnRyb2xsZXJcbiAgICBcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb21wb25lbnQoJ2Rhc2hib2FyZEFjdGlvbnMnLCBkYXNoYm9hcmRBY3Rpb25zKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRBY3Rpb25Db250cm9sbGVyKCl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgICAuY29udHJvbGxlcignRGFzaGJvYXJkQWN0aW9uQ29udHJvbGxlcicsIERhc2hib2FyZEFjdGlvbkNvbnRyb2xsZXIpOyIsInZhciBkYXNoYm9hcmRBbmFseXRpY3MgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFuYWx5dGljcy9kYXNoYm9hcmQtYW5hbHl0aWNzLmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHNlcmllczogJzwnLFxuICAgIGxhYmVsczogJzwnLFxuICAgIGRhdGE6ICc8JyxcbiAgICBvcHRpb25zOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCdkYXNoYm9hcmRBbmFseXRpY3MnLCBkYXNoYm9hcmRBbmFseXRpY3MpOyIsImZ1bmN0aW9uIERhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXIoJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5sYWJlbHMgPSBbJzIwMDYnLCAnMjAwNycsICcyMDA4JywgJzIwMDknLCAnMjAxMCcsICcyMDExJywgJzIwMTInXTtcbiAgY3RybC5zZXJpZXMgPSBbJ1Zpc2l0b3JzJywgJ1BhZ2UgVmlld3MnXTtcblxuICBjdHJsLmRhdGEgPSBbXG4gICAgWzY1LCA1OSwgODAsIDgxLCA1NiwgNTUsIDQwXSxcbiAgICBbMjgsIDQ4LCA0MCwgMTksIDg2LCAyNywgOTBdXG4gIF07XG5cbiAgY3RybC5vcHRpb25zID0ge1xuICAgIHNjYWxlczoge1xuICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgfTtcblxuICBjdHJsLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAkbG9nLmxvZyhcIlRoaXMgd2lsbCBwZXJmb3JtIHRoZSBSRVNUIEFQSSBjYWxsIHRvIGdvb2dsZSBhbmFseXRpY3Mgb24gcGFnZSBsb2FkXCIpO1xuICB9O1xuXG59O1xuXG5EYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlcicsIERhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXIpOyIsIiIsInZhciBzdGF0c0luZGV4ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3N0YXRzL3N0YXRzLWluZGV4L3N0YXRzLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBTdGF0c0luZGV4Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzdGF0czogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3N0YXRzJylcbiAgLmNvbXBvbmVudCgnc3RhdHNJbmRleCcsIHN0YXRzSW5kZXgpOyIsImZ1bmN0aW9uIFN0YXRzSW5kZXhDb250cm9sbGVyKCRzY29wZSkge1xuICAgIHZhciBjdHJsID0gdGhpcztcblxuICAgIGN0cmwuc3RhdHMgPSB7fTtcblxuICAgIGN0cmwuc3RhdHMuc2VyaWVzID0gWydWaXNpdG9ycycsICdQYWdlIFZpZXdzJ107XG5cbiAgICBjdHJsLnN0YXRzLnJlYWx0aW1lTGFiZWxzID0gWydNb2JpbGUnLCAnVGFibGV0JywgJ0Rlc2t0b3AnLCAnT3RoZXInXVxuICAgIGN0cmwuc3RhdHMudG9kYXlMYWJlbHMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J107XG4gICBcbiAgICBjdHJsLnN0YXRzLnJlYWx0aW1lID0gW1xuICAgICAgICA2NSwgNTksIDEwOCwgMjNcbiAgICBdO1xuXG4gICAgY3RybC5zdGF0cy50b2RheSA9IFtcbiAgICAgICAgWzM0MCwgNTQzLCA1MTIsIDU0MywgNDkzLCA0NDQsIDQzOV1cbiAgICBdO1xuXG4gICAgY3RybC5zdGF0cy5iYXJPcHRpb25zID0ge1xuICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGN0cmwuc3RhdHMucGllT3B0aW9ucyA9IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiB0cnVlXG4gICAgICAgIH1cbiAgICB9O1xuXG59XG5TdGF0c0luZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcbmFuZ3VsYXIubW9kdWxlKCdzdGF0cycpXG4gICAgLmNvbnRyb2xsZXIoJ1N0YXRzSW5kZXhDb250cm9sbGVyJywgU3RhdHNJbmRleENvbnRyb2xsZXIpOyIsInZhciBkYXNoYm9hcmRVc2VycyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgc2VyaWVzOiAnPCcsXG4gICAgbGFiZWxzOiAnPCcsXG4gICAgZGF0YTogJzwnLFxuICAgIG9wdGlvbnM6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZFVzZXJzJywgZGFzaGJvYXJkVXNlcnMpOyIsImZ1bmN0aW9uIERhc2hib2FyZFVzZXJzQ29udHJvbGxlcihVc2VyU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5sYWJlbHMgPSBbJy00IFdlZWsnLCAnLTMgV2VlaycsICctMiBXZWVrJywgJy0xIFdlZWsnXTtcbiAgY3RybC5zZXJpZXMgPSBbJ05ldyBVc2VycyddO1xuXG4gIGN0cmwub3B0aW9ucyA9IHtcbiAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gIH07XG5cbiAgY3RybC5kYXRhID0gW1xuICAgIFs2LCAzLCA0LCAyXVxuICBdO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmdldEdyb3d0aCgpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgJGxvZy5sb2coY3RybC5kYXRhKTtcbiAgICAgICAgY3RybC5kYXRhWzBdID0gcmVzcG9uc2UuZGF0YS5ncm93dGg7XG4gICAgICAgICRsb2cubG9nKGN0cmwuZGF0YSk7XG4gICAgICB9KTtcbiAgfTtcblxufTtcblxuRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJywnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb250cm9sbGVyKCdEYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXInLCBEYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXIpOyIsIiIsInZhciBkYXNoYm9hcmRPYXV0aCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtb2F1dGgvZGFzaGJvYXJkLW9hdXRoLmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRPYXV0aENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgY2xpZW50czogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZE9hdXRoJywgZGFzaGJvYXJkT2F1dGgpOyIsImZ1bmN0aW9uIERhc2hib2FyZE9hdXRoQ29udHJvbGxlcigkaHR0cCwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgJGh0dHAuZ2V0KCdvYXV0aC9jbGllbnRzJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5EYXNoYm9hcmRPYXV0aENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZE9hdXRoQ29udHJvbGxlcicsIERhc2hib2FyZE9hdXRoQ29udHJvbGxlcik7IiwidmFyIGRhc2hib2FyZENvbW1lbnRzID0ge1xuICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuaHRtbCcsXG4gICAgY29udHJvbGxlcjogRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyLFxuICAgIGJpbmRpbmdzOiB7XG4gICAgICAgIGNvbW1lbnRzOiAnPCdcbiAgICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb21wb25lbnQoJ2Rhc2hib2FyZENvbW1lbnRzJywgZGFzaGJvYXJkQ29tbWVudHMpOyIsImZ1bmN0aW9uIERhc2hib2FyZENvbW1lbnRzQ29udHJvbGxlcigkc2NvcGUpe1xuICAgIHZhciBjdHJsID0gdGhpcztcbn1cblxuRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgICAuY29udHJvbGxlcignRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyJywgRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyKTsiLCJ2YXIgdXNlckluZGV4ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvdXNlci91c2VyLWluZGV4L3VzZXItaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFVzZXJJbmRleENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgdXNlcnM6ICc8JyxcbiAgICBwYWdlU2V0dGluZ3M6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb21wb25lbnQoJ3VzZXJJbmRleCcsIHVzZXJJbmRleCk7IiwiZnVuY3Rpb24gVXNlckluZGV4Q29udHJvbGxlcihVc2VyU2VydmljZSwgJGxvZykge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC51c2VycyA9IFtdO1xuICBjdHJsLnBhZ2VTZXR0aW5ncyA9IFtdO1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmdldFVzZXJzKClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnVzZXJzID0gcmVzcG9uc2UuZGF0YS51c2Vycy5kYXRhO1xuICAgICAgICAkbG9nLmxvZyhyZXNwb25zZS5kYXRhLnVzZXJzLmRhdGEpO1xuICAgICAgICBjdHJsLnBhZ2VTZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEudXNlcnM7XG4gICAgICB9KTtcbiAgfVxuXG4gIGN0cmwuZ2V0TmV4dFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBVc2VyU2VydmljZS5nZXRVc2VycyhjdHJsLnBhZ2VTZXR0aW5ncy5jdXJyZW50X3BhZ2UgKyAxKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSl7XG4gICAgICAgIGN0cmwudXNlcnMgPSByZXNwb25zZS5kYXRhLnVzZXJzLmRhdGE7XG4gICAgICAgIGN0cmwucGFnZVNldHRpbmdzID0gcmVzcG9uc2UuZGF0YS51c2VycztcbiAgICAgIH0pO1xuICB9XG5cbiAgY3RybC5nZXRQcmV2UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmdldFVzZXJzKGN0cmwucGFnZVNldHRpbmdzLmN1cnJlbnRfcGFnZSAtIDEpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKXtcbiAgICAgICAgY3RybC51c2VycyA9IHJlc3BvbnNlLmRhdGEudXNlcnMuZGF0YTtcbiAgICAgICAgY3RybC5wYWdlU2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLnVzZXJzO1xuICAgICAgfSk7XG4gIH1cblxufTtcblxuVXNlckluZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbnRyb2xsZXIoJ1VzZXJJbmRleENvbnRyb2xsZXInLCBVc2VySW5kZXhDb250cm9sbGVyKTsiLCJ2YXIgdXNlck5ldyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3VzZXIvdXNlci1uZXcvdXNlci1uZXcuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFVzZXJOZXdDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHVzZXI6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbXBvbmVudCgndXNlck5ldycsIHVzZXJOZXcpOyIsImZ1bmN0aW9uIFVzZXJOZXdDb250cm9sbGVyKFVzZXJTZXJ2aWNlKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwubmV3VXNlciA9IGZ1bmN0aW9uKHVzZXIpe1xuICAgIFVzZXJTZXJ2aWNlLm5ld1VzZXIodXNlcik7XG4gIH07XG5cbn07XG5cblVzZXJOZXdDb250cm9sbGVyLiRpbmplY3QgPSBbJ1VzZXJTZXJ2aWNlJ107XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbnRyb2xsZXIoJ1VzZXJOZXdDb250cm9sbGVyJywgVXNlck5ld0NvbnRyb2xsZXIpOyIsInZhciB1c2VyRWRpdCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy91c2VyL3VzZXItZWRpdC91c2VyLWVkaXQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFVzZXJFZGl0Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyOiAnPCdcbiAgfVxufVxuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb21wb25lbnQoJ3VzZXJFZGl0JywgdXNlckVkaXQpOyIsImZ1bmN0aW9uIFVzZXJFZGl0Q29udHJvbGxlcihVc2VyU2VydmljZSwgJGxvZywgJHJvdXRlUGFyYW1zKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbiAgdmFyIGlkID0gJHJvdXRlUGFyYW1zLmlkO1xuXG4gIGN0cmwudXNlciA9IHt9O1xuXG4gIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCl7XG4gICAgVXNlclNlcnZpY2UuZ2V0VXNlcihpZClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2Upe1xuICAgICAgICBjdHJsLnVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4gICAgICB9KTtcbiAgfVxuXG59XG5cblVzZXJFZGl0Q29udHJvbGxlci4kaW5qZWN0ID0gWydVc2VyU2VydmljZScsICckbG9nJywgJyRyb3V0ZVBhcmFtcyddO1xuXG5hbmd1bGFyLm1vZHVsZSgndXNlcicpXG4gIC5jb250cm9sbGVyKCdVc2VyRWRpdENvbnRyb2xsZXInLCBVc2VyRWRpdENvbnRyb2xsZXIpOyIsInZhciBmYWNlYm9va1dpZGdldCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvZmFjZWJvb2std2lkZ2V0L2ZhY2Vib29rLXdpZGdldC5odG1sJ1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbXBvbmVudCgnZmFjZWJvb2tXaWRnZXQnLCBmYWNlYm9va1dpZGdldCk7XG4gICIsInZhciB0d2l0dGVyV2lkZ2V0ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy90d2l0dGVyLXdpZGdldC90d2l0dGVyLXdpZGdldC5odG1sJyxcbiAgY29udHJvbGxlcjogU29jaWFsVHdpdHRlckNvbnRyb2xsZXJcbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb21wb25lbnQoJ3R3aXR0ZXJXaWRnZXQnLCB0d2l0dGVyV2lkZ2V0KTsiLCJmdW5jdGlvbiBTb2NpYWxUd2l0dGVyQ29udHJvbGxlcigpe1xuICB2YXIgY3RybCA9IHRoaXM7XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29udHJvbGxlcignU29jaWFsVHdpdHRlckNvbnRyb2xsZXInLCBTb2NpYWxUd2l0dGVyQ29udHJvbGxlcik7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
