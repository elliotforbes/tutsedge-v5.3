angular.module('root', [
    'ngRoute',
    'articles',
    'dashboard',
    'user',
    'comment',
    'stats',
    'settings',
    'social'
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
angular.module('articles', []);
function articleRouteProvider($routeProvider){
    $routeProvider
      .when('/articles',{
        template: '<articles-home></articles-home>'
      })
      .when('/article/new', {
        template: '<article-new></article-new>'
      })
      .when('/article/edit/:id', {
        template: '<article-edit></article-edit>'
      })
      .otherwise({ 
        template: '<h1>Not Found</h1>'
      });
};

angular.module('articles').config(articleRouteProvider);
articleRouteProvider.$inject = ['$routeProvider'];

function ArticleService($http, $log) {

  function newArticle(article) {
    console.log(article);
    $log.log("Placeholder for saving new Article");
  }

  function updateArticle(article) {
    $log.log("Placeholder for updating new Article");
  }

  function deleteArticle(id) {
    $log.log("Placeholder for deleting an article");
  }

  function getArticle(id) {
    $log.log("Placeholder for retrieving an article");
  }

  var service = {
    newArticle : newArticle,
    updateArticle : updateArticle,
    deleteArticle : deleteArticle,
    getArticle : getArticle
  };

  return service;

}

ArticleService.$inject = ['$http', '$log'];  

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

function UserService($log) {

    function newUser(user) {
        $log.log("Adding New User");
    }

    var service = {
        newUser: newUser
    };

    return service;
};

UserService.$inject = ['$log'];

angular.module('user')
    .factory('UserService', UserService);
var articleEdit = {
  templateUrl: './app/components/articles/article-edit/article-edit.html',
  controller: ArticleEditController,
  bindings: {
    article: '<'
  }
}

angular.module('articles')
  .component('articleEdit', articleEdit);
function ArticleEditController($log, ArticleService) {
  var ctrl = this;

  ctrl.article = {};

  ctrl.init = function() {
    ctrl.article = {
      title : "Test Article",
      description: "lorem ipsum",
      slug: "test_article",
      image: "test_image.jpg",
      body: "body"
    };
  };

  ctrl.save = function(article) {
    $log.log("Save any updates to the article");
    ArticleService.updateArticle(article);
  };

};

ArticleEditController.$inject = ['$log', 'ArticleService'];

angular.module('articles')
  .controller('ArticleEditController', ArticleEditController);
var articlesHome = {
  templateUrl: './app/components/articles/article-home/articles-home.html',
  controller: ArticlesHomeController,
  bindings: {
    articles: '<'
  }
};

angular.module('articles')
  .component('articlesHome', articlesHome);
function ArticlesHomeController() {
  var ctrl = this;
};

angular.module('articles')
  .controller('ArticlesHomeController', ArticlesHomeController);
var articleNew = {
  templateUrl: './app/components/articles/article-new/article-new.html',
  controller: ArticleNewController,
  bindings: {
    article: '<'
  }
};

angular.module('articles')
  .component('articleNew', articleNew);
function ArticleNewController(ArticleService, $log) {
  var ctrl = this;

  ctrl.article = {};

  ctrl.save = function(article) {
    ArticleService.newArticle(article);
  };  

};

ArticleNewController.$inject = ['ArticleService', '$log'];

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
function DashboardUsersController() {
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

  ctrl.$onInit = function() {
    console.log("Hey you guys");
  };

};

angular.module('root')
  .controller('DashboardUsersController', DashboardUsersController);

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


var userEdit = {
  templateUrl: 'app/components/user/user-edit/user-edit.html',
  controller: UserEditController,
  bindings: {
    user: '<'
  }
}

angular.module('user')
  .component('userEdit', userEdit);
function UserEditController() {
  var ctrl = this;
}

angular.module('user')
  .controller('UserEditController', UserEditController);
var userIndex = {
  templateUrl: './app/components/user/user-index/user-index.html',
  controller: UserIndexController,
  bindings: {
    users: '<'
  }
};

angular.module('user')
  .component('userIndex', userIndex);
function UserIndexController() {
  var ctrl = this;

};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGVzLmpzIiwiY29tbW9uL3RvcC1uYXYvdG9wLW5hdi5jb21wb25lbnQuanMiLCJjb21tb24vdG9wLW5hdi90b3AtbmF2LmNvbnRyb2xsZXIuanMiLCJjb21tb24vbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudC5qcyIsImNvbW1vbi9sb2FkaW5nL2xvYWRpbmcuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS5tb2R1bGUuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUucm91dGVzLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLnNlcnZpY2UuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5tb2R1bGUuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5yb3V0ZXMuanMiLCJjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3N0YXRzL3N0YXRzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMucm91dGVzLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvZ29vZ2xlUGx1cy5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3NvY2lhbC95b3V0dWJlLnNlcnZpY2UuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci5tb2R1bGUuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci5yb3V0ZXMuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWVkaXQvYXJ0aWNsZS1lZGl0LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1lZGl0L2FydGljbGUtZWRpdC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9hcnRpY2xlcy9hcnRpY2xlLWhvbWUvYXJ0aWNsZXMtaG9tZS5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtaG9tZS9hcnRpY2xlcy1ob21lLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtbmV3L2FydGljbGUtbmV3LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1uZXcvYXJ0aWNsZS1uZXcuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWluZGV4L2NvbW1lbnQtaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtaW5kZXgvY29tbWVudC1pbmRleC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFjdGlvbnMvZGFzaGJvYXJkLWFjdGlvbnMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFjdGlvbnMvZGFzaGJvYXJkLWFjdGlvbnMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYW5hbHl0aWNzL2Rhc2hib2FyZC1hbmFseXRpY3MuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1hbmFseXRpY3MvZGFzaGJvYXJkLWFuYWx5dGljcy5tb2R1bGUuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtY29tbWVudHMvZGFzaGJvYXJkLWNvbW1lbnRzLmNvbXBvbmVudHMuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtY29tbWVudHMvZGFzaGJvYXJkLWNvbW1lbnRzLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtdXNlcnMvZGFzaGJvYXJkLXVzZXJzLmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC11c2Vycy9kYXNoYm9hcmQtdXNlcnMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC11c2Vycy9kYXNoYm9hcmQtdXNlcnMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1pbmRleC9zZXR0aW5ncy1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWluZGV4L3NldHRpbmdzLWluZGV4LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3N0YXRzL3N0YXRzLWluZGV4L3N0YXRzLWluZGV4LmNvbXBvbmVudC5qcyIsImNvbXBvbmVudHMvc3RhdHMvc3RhdHMtaW5kZXgvc3RhdHMtaW5kZXguY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc29jaWFsL3NvY2lhbC1kYXNoYm9hcmQvc29jaWFsLWRhc2hib2FyZC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtZGFzaGJvYXJkL3NvY2lhbC1kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc29jaWFsL2ZhY2Vib29rLWRhc2gvZmFjZWJvb2suc2VydmljZS5qcyIsImNvbXBvbmVudHMvc29jaWFsL3R3aXR0ZXItZGFzaC90d2l0dGVyLnNlcnZpY2UuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci1lZGl0L3VzZXItZWRpdC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci1lZGl0L3VzZXItZWRpdC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItaW5kZXgvdXNlci1pbmRleC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci1pbmRleC91c2VyLWluZGV4LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3VzZXIvdXNlci1uZXcvdXNlci1uZXcuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy91c2VyL3VzZXItbmV3L3VzZXItbmV3LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NvY2lhbC95b3V0dWJlLXN1YnNjcmliZXJzL3lvdXR1YmUtc3Vic2NyaWJlcnMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NvY2lhbC95b3V0dWJlLXN1YnNjcmliZXJzL3lvdXR1YmUtc3Vic2NyaWJlcnMucm91dGVzLmpzIiwiY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvZmFjZWJvb2std2lkZ2V0L2ZhY2Vib29rLXdpZGdldC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy90d2l0dGVyLXdpZGdldC90d2l0dGVyLXdpZGdldC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL3NvY2lhbC9zb2NpYWwtd2lkZ2V0cy90d2l0dGVyLXdpZGdldC90d2l0dGVyLXdpZGdldC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQ0FBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUNBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FDQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdyb290JywgW1xuICAgICduZ1JvdXRlJyxcbiAgICAnYXJ0aWNsZXMnLFxuICAgICdkYXNoYm9hcmQnLFxuICAgICd1c2VyJyxcbiAgICAnY29tbWVudCcsXG4gICAgJ3N0YXRzJyxcbiAgICAnc2V0dGluZ3MnLFxuICAgICdzb2NpYWwnXG5dKTtcbiIsImZ1bmN0aW9uIHJvdXRlUHJvdmlkZXIoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignLycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxkYXNoYm9hcmQ+PC9kYXNoYm9hcmQ+J1xuICAgICAgfSk7XG59XG5yb3V0ZVByb3ZpZGVyLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbmZpZyhyb3V0ZVByb3ZpZGVyKTtcbiIsInZhciB0b3BOYXYgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tbW9uL3RvcC1uYXYvdG9wLW5hdi5odG1sJyxcbiAgY29udHJvbGxlcjogVG9wTmF2Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICB1c2VyOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhclxuICAubW9kdWxlKCdyb290JylcbiAgLmNvbXBvbmVudCgndG9wTmF2JywgdG9wTmF2KTtcbiIsImZ1bmN0aW9uIFRvcE5hdkNvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ1RvcE5hdkNvbnRyb2xsZXInLCBUb3BOYXZDb250cm9sbGVyKTtcbiIsInZhciBsb2FkaW5nID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vY29tbW9uL2xvYWRpbmcvbG9hZGluZy5odG1sJyxcbiAgY29udHJvbGxlcjogTG9hZGluZ0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgaXNMb2FkaW5nOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCdsb2FkaW5nJywgbG9hZGluZyk7IiwiZnVuY3Rpb24gTG9hZGluZ0NvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0xvYWRpbmdDb250cm9sbGVyJywgTG9hZGluZ0NvbnRyb2xsZXIpOyIsImFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycsIFtdKTsiLCJmdW5jdGlvbiBhcnRpY2xlUm91dGVQcm92aWRlcigkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcvYXJ0aWNsZXMnLHtcbiAgICAgICAgdGVtcGxhdGU6ICc8YXJ0aWNsZXMtaG9tZT48L2FydGljbGVzLWhvbWU+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvYXJ0aWNsZS9uZXcnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGFydGljbGUtbmV3PjwvYXJ0aWNsZS1uZXc+J1xuICAgICAgfSlcbiAgICAgIC53aGVuKCcvYXJ0aWNsZS9lZGl0LzppZCcsIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8YXJ0aWNsZS1lZGl0PjwvYXJ0aWNsZS1lZGl0PidcbiAgICAgIH0pXG4gICAgICAub3RoZXJ3aXNlKHsgXG4gICAgICAgIHRlbXBsYXRlOiAnPGgxPk5vdCBGb3VuZDwvaDE+J1xuICAgICAgfSk7XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKS5jb25maWcoYXJ0aWNsZVJvdXRlUHJvdmlkZXIpO1xuYXJ0aWNsZVJvdXRlUHJvdmlkZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbiIsImZ1bmN0aW9uIEFydGljbGVTZXJ2aWNlKCRodHRwLCAkbG9nKSB7XG5cbiAgZnVuY3Rpb24gbmV3QXJ0aWNsZShhcnRpY2xlKSB7XG4gICAgY29uc29sZS5sb2coYXJ0aWNsZSk7XG4gICAgJGxvZy5sb2coXCJQbGFjZWhvbGRlciBmb3Igc2F2aW5nIG5ldyBBcnRpY2xlXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQXJ0aWNsZShhcnRpY2xlKSB7XG4gICAgJGxvZy5sb2coXCJQbGFjZWhvbGRlciBmb3IgdXBkYXRpbmcgbmV3IEFydGljbGVcIik7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVBcnRpY2xlKGlkKSB7XG4gICAgJGxvZy5sb2coXCJQbGFjZWhvbGRlciBmb3IgZGVsZXRpbmcgYW4gYXJ0aWNsZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFydGljbGUoaWQpIHtcbiAgICAkbG9nLmxvZyhcIlBsYWNlaG9sZGVyIGZvciByZXRyaWV2aW5nIGFuIGFydGljbGVcIik7XG4gIH1cblxuICB2YXIgc2VydmljZSA9IHtcbiAgICBuZXdBcnRpY2xlIDogbmV3QXJ0aWNsZSxcbiAgICB1cGRhdGVBcnRpY2xlIDogdXBkYXRlQXJ0aWNsZSxcbiAgICBkZWxldGVBcnRpY2xlIDogZGVsZXRlQXJ0aWNsZSxcbiAgICBnZXRBcnRpY2xlIDogZ2V0QXJ0aWNsZVxuICB9O1xuXG4gIHJldHVybiBzZXJ2aWNlO1xuXG59XG5cbkFydGljbGVTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnXTsgIFxuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmZhY3RvcnkoJ0FydGljbGVTZXJ2aWNlJywgQXJ0aWNsZVNlcnZpY2UpOyIsImFuZ3VsYXIubW9kdWxlKCdjb21tZW50JywgW10pOyIsImZ1bmN0aW9uIGNvbW1lbnRSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL2NvbW1lbnRzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPGNvbW1lbnQtaW5kZXg+PC9jb21tZW50LWluZGV4PidcbiAgICAgIH0pO1xufTtcbmNvbW1lbnRSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmFuZ3VsYXIubW9kdWxlKCdjb21tZW50JykuY29uZmlnKGNvbW1lbnRSb3V0ZXMpO1xuIiwiZnVuY3Rpb24gQ29tbWVudFNlcnZpY2UoJGxvZyl7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVDb21tZW50KGNvbW1lbnRJZCkge1xuICAgICAgICAkbG9nLmxvZyhcIkRlbGV0aW5nIGEgY29tbWVudCB3aXRoIGlkOiBcIiArIGNvbW1lbnRJZCk7XG4gICAgfVxuXG4gICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgIGRlbGV0ZUNvbW1lbnQgOiBkZWxldGVDb21tZW50XG4gICAgfTtcblxuICAgIHJldHVybiBzZXJ2aWNlO1xufVxuQ29tbWVudFNlcnZpY2UuJGluamVjdCA9IFsnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgnY29tbWVudCcpXG4gICAgLmZhY3RvcnkoJ0NvbW1lbnRTZXJ2aWNlJywgQ29tbWVudFNlcnZpY2UpOyIsInZhciBkYXNoYm9hcmQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBEYXNoYm9hcmRDb250cm9sbGVyXG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZCcsIGRhc2hib2FyZCk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQ29udHJvbGxlcigpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29udHJvbGxlcignRGFzaGJvYXJkQ29udHJvbGxlcicsIERhc2hib2FyZENvbnRyb2xsZXIpOyIsImFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnLCBbJ2NoYXJ0LmpzJ10pOyIsImFuZ3VsYXIubW9kdWxlKCdzZXR0aW5ncycsW10pOyIsImZ1bmN0aW9uIHNldHRpbmdzUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9zZXR0aW5ncycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzxzZXR0aW5ncy1pbmRleD48L3NldHRpbmdzLWluZGV4PidcbiAgICAgIH0pO1xufVxuc2V0dGluZ3NSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuXG5hbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnKVxuICAuY29uZmlnKHNldHRpbmdzUm91dGVzKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdzdGF0cycsIFsnY2hhcnQuanMnXSk7IiwiZnVuY3Rpb24gc3RhdHNSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3N0YXRzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHN0YXRzLWluZGV4Pjwvc3RhdHMtaW5kZXg+J1xuICAgICAgfSk7XG59O1xuXG5zdGF0c1JvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuYW5ndWxhci5tb2R1bGUoJ3N0YXRzJykuY29uZmlnKHN0YXRzUm91dGVzKTtcbiIsIiIsImFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnLCBbXSk7IiwiZnVuY3Rpb24gc29jaWFsUm91dGVzKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy9zb2NpYWwnLCB7XG4gICAgICAgICAgdGVtcGxhdGU6ICc8c29jaWFsLWRhc2hib2FyZD48L3NvY2lhbC1kYXNoYm9hcmQ+J1xuICAgICAgfSk7XG59XG5zb2NpYWxSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb25maWcoc29jaWFsUm91dGVzKTtcbiIsIiIsImFuZ3VsYXIubW9kdWxlKCd1c2VyJywgW10pOyIsImZ1bmN0aW9uIHVzZXJSb3V0ZXMoJHJvdXRlUHJvdmlkZXIpe1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAud2hlbignL3VzZXJzJywge1xuICAgICAgICAgIHRlbXBsYXRlOiAnPHVzZXItaW5kZXg+PC91c2VyLWluZGV4PidcbiAgICAgIH0pXG4gICAgICAud2hlbignL3VzZXIvZWRpdC86aWQnLCB7XG4gICAgICAgIHRlbXBsYXRlOiAnPHVzZXItZWRpdD48L3VzZXItZWRpdD4nICBcbiAgICAgIH0pXG4gICAgICAud2hlbignL3VzZXIvbmV3Jywge1xuICAgICAgICB0ZW1wbGF0ZTogJzx1c2VyLW5ldz48L3VzZXItbmV3PidcbiAgICAgIH0pO1xufTtcblxudXNlclJvdXRlcy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuYW5ndWxhci5tb2R1bGUoJ3VzZXInKS5jb25maWcodXNlclJvdXRlcyk7XG4iLCJmdW5jdGlvbiBVc2VyU2VydmljZSgkbG9nKSB7XG5cbiAgICBmdW5jdGlvbiBuZXdVc2VyKHVzZXIpIHtcbiAgICAgICAgJGxvZy5sb2coXCJBZGRpbmcgTmV3IFVzZXJcIik7XG4gICAgfVxuXG4gICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgIG5ld1VzZXI6IG5ld1VzZXJcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlcnZpY2U7XG59O1xuXG5Vc2VyU2VydmljZS4kaW5qZWN0ID0gWyckbG9nJ107XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgICAuZmFjdG9yeSgnVXNlclNlcnZpY2UnLCBVc2VyU2VydmljZSk7IiwidmFyIGFydGljbGVFZGl0ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1lZGl0L2FydGljbGUtZWRpdC5odG1sJyxcbiAgY29udHJvbGxlcjogQXJ0aWNsZUVkaXRDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGU6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdhcnRpY2xlcycpXG4gIC5jb21wb25lbnQoJ2FydGljbGVFZGl0JywgYXJ0aWNsZUVkaXQpOyIsImZ1bmN0aW9uIEFydGljbGVFZGl0Q29udHJvbGxlcigkbG9nLCBBcnRpY2xlU2VydmljZSkge1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5hcnRpY2xlID0ge307XG5cbiAgY3RybC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgY3RybC5hcnRpY2xlID0ge1xuICAgICAgdGl0bGUgOiBcIlRlc3QgQXJ0aWNsZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwibG9yZW0gaXBzdW1cIixcbiAgICAgIHNsdWc6IFwidGVzdF9hcnRpY2xlXCIsXG4gICAgICBpbWFnZTogXCJ0ZXN0X2ltYWdlLmpwZ1wiLFxuICAgICAgYm9keTogXCJib2R5XCJcbiAgICB9O1xuICB9O1xuXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKGFydGljbGUpIHtcbiAgICAkbG9nLmxvZyhcIlNhdmUgYW55IHVwZGF0ZXMgdG8gdGhlIGFydGljbGVcIik7XG4gICAgQXJ0aWNsZVNlcnZpY2UudXBkYXRlQXJ0aWNsZShhcnRpY2xlKTtcbiAgfTtcblxufTtcblxuQXJ0aWNsZUVkaXRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnLCAnQXJ0aWNsZVNlcnZpY2UnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbnRyb2xsZXIoJ0FydGljbGVFZGl0Q29udHJvbGxlcicsIEFydGljbGVFZGl0Q29udHJvbGxlcik7IiwidmFyIGFydGljbGVzSG9tZSA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2FydGljbGVzL2FydGljbGUtaG9tZS9hcnRpY2xlcy1ob21lLmh0bWwnLFxuICBjb250cm9sbGVyOiBBcnRpY2xlc0hvbWVDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGVzOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbXBvbmVudCgnYXJ0aWNsZXNIb21lJywgYXJ0aWNsZXNIb21lKTsiLCJmdW5jdGlvbiBBcnRpY2xlc0hvbWVDb250cm9sbGVyKCkge1xuICB2YXIgY3RybCA9IHRoaXM7XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29udHJvbGxlcignQXJ0aWNsZXNIb21lQ29udHJvbGxlcicsIEFydGljbGVzSG9tZUNvbnRyb2xsZXIpOyIsInZhciBhcnRpY2xlTmV3ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXJ0aWNsZXMvYXJ0aWNsZS1uZXcvYXJ0aWNsZS1uZXcuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IEFydGljbGVOZXdDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIGFydGljbGU6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgnYXJ0aWNsZXMnKVxuICAuY29tcG9uZW50KCdhcnRpY2xlTmV3JywgYXJ0aWNsZU5ldyk7IiwiZnVuY3Rpb24gQXJ0aWNsZU5ld0NvbnRyb2xsZXIoQXJ0aWNsZVNlcnZpY2UsICRsb2cpIHtcbiAgdmFyIGN0cmwgPSB0aGlzO1xuXG4gIGN0cmwuYXJ0aWNsZSA9IHt9O1xuXG4gIGN0cmwuc2F2ZSA9IGZ1bmN0aW9uKGFydGljbGUpIHtcbiAgICBBcnRpY2xlU2VydmljZS5uZXdBcnRpY2xlKGFydGljbGUpO1xuICB9OyAgXG5cbn07XG5cbkFydGljbGVOZXdDb250cm9sbGVyLiRpbmplY3QgPSBbJ0FydGljbGVTZXJ2aWNlJywgJyRsb2cnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2FydGljbGVzJylcbiAgLmNvbnRyb2xsZXIoJ0FydGljbGVOZXdDb250cm9sbGVyJywgQXJ0aWNsZU5ld0NvbnRyb2xsZXIpOyIsInZhciBjb21tZW50SW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtaW5kZXgvY29tbWVudC1pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogQ29tbWVudEluZGV4Q29udHJvbGxlclxuICBcbn1cblxuYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnKVxuICAuY29tcG9uZW50KCdjb21tZW50SW5kZXgnLCBjb21tZW50SW5kZXgpOyIsImZ1bmN0aW9uIENvbW1lbnRJbmRleENvbnRyb2xsZXIoQ29tbWVudFNlcnZpY2Upe1xuICAgIHZhciBjdHJsID0gdGhpcztcblxuICAgIGN0cmwuZGVsZXRlQ29tbWVudCA9IGZ1bmN0aW9uKGNvbW1lbnRJZCl7XG4gICAgICAgIENvbW1lbnRTZXJ2aWNlLmRlbGV0ZUNvbW1lbnQoY29tbWVudElkKTtcbiAgICB9XG59XG5cbkNvbW1lbnRJbmRleENvbnRyb2xsZXIuJGluamVjdCA9IFsnQ29tbWVudFNlcnZpY2UnXTtcblxuYW5ndWxhci5tb2R1bGUoJ2NvbW1lbnQnKVxuICAgIC5jb250cm9sbGVyKCdDb21tZW50SW5kZXhDb250cm9sbGVyJywgQ29tbWVudEluZGV4Q29udHJvbGxlcik7IiwidmFyIGRhc2hib2FyZEFjdGlvbnMgPSB7XG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLWFjdGlvbnMvZGFzaGJvYXJkLWFjdGlvbnMuaHRtbCcsXG4gICAgY29udHJvbGxlcjogRGFzaGJvYXJkQWN0aW9uQ29udHJvbGxlclxuICAgIFxufTtcblxuYW5ndWxhci5tb2R1bGUoJ2Rhc2hib2FyZCcpXG4gICAgLmNvbXBvbmVudCgnZGFzaGJvYXJkQWN0aW9ucycsIGRhc2hib2FyZEFjdGlvbnMpOyIsImZ1bmN0aW9uIERhc2hib2FyZEFjdGlvbkNvbnRyb2xsZXIoKXtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb250cm9sbGVyKCdEYXNoYm9hcmRBY3Rpb25Db250cm9sbGVyJywgRGFzaGJvYXJkQWN0aW9uQ29udHJvbGxlcik7IiwidmFyIGRhc2hib2FyZEFuYWx5dGljcyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYW5hbHl0aWNzL2Rhc2hib2FyZC1hbmFseXRpY3MuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IERhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgc2VyaWVzOiAnPCcsXG4gICAgbGFiZWxzOiAnPCcsXG4gICAgZGF0YTogJzwnLFxuICAgIG9wdGlvbnM6ICc8J1xuICB9XG59O1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb21wb25lbnQoJ2Rhc2hib2FyZEFuYWx5dGljcycsIGRhc2hib2FyZEFuYWx5dGljcyk7IiwiZnVuY3Rpb24gRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlcigkbG9nKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmxhYmVscyA9IFsnMjAwNicsICcyMDA3JywgJzIwMDgnLCAnMjAwOScsICcyMDEwJywgJzIwMTEnLCAnMjAxMiddO1xuICBjdHJsLnNlcmllcyA9IFsnVmlzaXRvcnMnLCAnUGFnZSBWaWV3cyddO1xuXG4gIGN0cmwuZGF0YSA9IFtcbiAgICBbNjUsIDU5LCA4MCwgODEsIDU2LCA1NSwgNDBdLFxuICAgIFsyOCwgNDgsIDQwLCAxOSwgODYsIDI3LCA5MF1cbiAgXTtcblxuICBjdHJsLm9wdGlvbnMgPSB7XG4gICAgc2NhbGVzOiB7XG4gICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzp0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICB9O1xuXG4gIGN0cmwuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICRsb2cubG9nKFwiVGhpcyB3aWxsIHBlcmZvcm0gdGhlIFJFU1QgQVBJIGNhbGwgdG8gZ29vZ2xlIGFuYWx5dGljcyBvbiBwYWdlIGxvYWRcIik7XG4gIH07XG5cbn07XG5cbkRhc2hib2FyZEFuYWx5dGljc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xuXG5hbmd1bGFyLm1vZHVsZSgncm9vdCcpXG4gIC5jb250cm9sbGVyKCdEYXNoYm9hcmRBbmFseXRpY3NDb250cm9sbGVyJywgRGFzaGJvYXJkQW5hbHl0aWNzQ29udHJvbGxlcik7IiwiIiwidmFyIGRhc2hib2FyZENvbW1lbnRzID0ge1xuICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC1jb21tZW50cy9kYXNoYm9hcmQtY29tbWVudHMuaHRtbCcsXG4gICAgY29udHJvbGxlcjogRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyLFxuICAgIGJpbmRpbmdzOiB7XG4gICAgICAgIGNvbW1lbnRzOiAnPCdcbiAgICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnKVxuICAgIC5jb21wb25lbnQoJ2Rhc2hib2FyZENvbW1lbnRzJywgZGFzaGJvYXJkQ29tbWVudHMpOyIsImZ1bmN0aW9uIERhc2hib2FyZENvbW1lbnRzQ29udHJvbGxlcigkc2NvcGUpe1xuICAgIHZhciBjdHJsID0gdGhpcztcbn1cblxuRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xuXG5hbmd1bGFyLm1vZHVsZSgnZGFzaGJvYXJkJylcbiAgICAuY29udHJvbGxlcignRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyJywgRGFzaGJvYXJkQ29tbWVudHNDb250cm9sbGVyKTsiLCJ2YXIgZGFzaGJvYXJkVXNlcnMgPSB7XG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLXVzZXJzL2Rhc2hib2FyZC11c2Vycy5odG1sJyxcbiAgY29udHJvbGxlcjogRGFzaGJvYXJkVXNlcnNDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHNlcmllczogJzwnLFxuICAgIGxhYmVsczogJzwnLFxuICAgIGRhdGE6ICc8JyxcbiAgICBvcHRpb25zOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3Jvb3QnKVxuICAuY29tcG9uZW50KCdkYXNoYm9hcmRVc2VycycsIGRhc2hib2FyZFVzZXJzKTsiLCJmdW5jdGlvbiBEYXNoYm9hcmRVc2Vyc0NvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLmxhYmVscyA9IFsnLTQgV2VlaycsICctMyBXZWVrJywgJy0yIFdlZWsnLCAnLTEgV2VlayddO1xuICBjdHJsLnNlcmllcyA9IFsnTmV3IFVzZXJzJ107XG5cbiAgY3RybC5vcHRpb25zID0ge1xuICAgIHNjYWxlczoge1xuICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgfTtcblxuICBjdHJsLmRhdGEgPSBbXG4gICAgWzYsIDMsIDQsIDJdXG4gIF07XG5cbiAgY3RybC4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJIZXkgeW91IGd1eXNcIik7XG4gIH07XG5cbn07XG5cbmFuZ3VsYXIubW9kdWxlKCdyb290JylcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZFVzZXJzQ29udHJvbGxlcicsIERhc2hib2FyZFVzZXJzQ29udHJvbGxlcik7IiwiIiwidmFyIHNldHRpbmdzSW5kZXggPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtaW5kZXgvc2V0dGluZ3MtaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFNldHRpbmdzSW5kZXhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHNldHRpbmdzOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbXBvbmVudCgnc2V0dGluZ3NJbmRleCcsIHNldHRpbmdzSW5kZXgpOyIsImZ1bmN0aW9uIFNldHRpbmdzSW5kZXhDb250cm9sbGVyKCl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLnNldHRpbmdzID0ge1xuICAgIHRhZ2xpbmU6IFwiSGlnaCBRdWFsaXR5IFByb2dyYW1taW5nIFR1dG9yaWFsc1wiLFxuICAgIHNpdGVVcmw6IFwiaHR0cHM6Ly90dXRvcmlhbGVkZ2UubmV0XCIsXG4gICAgYWRtaW5FbWFpbDogXCJhZG1pbkB0dXRvcmlhbGVkZ2UubmV0XCIsXG4gICAgbWV0YTogXCJ8IFR1dG9yaWFsZWRnZS5uZXRcIlxuICB9XG5cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJylcbiAgLmNvbnRyb2xsZXIoJ1NldHRpbmdzSW5kZXhDb250cm9sbGVyJywgU2V0dGluZ3NJbmRleENvbnRyb2xsZXIpOyIsInZhciBzdGF0c0luZGV4ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3N0YXRzL3N0YXRzLWluZGV4L3N0YXRzLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBTdGF0c0luZGV4Q29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBzdGF0czogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3N0YXRzJylcbiAgLmNvbXBvbmVudCgnc3RhdHNJbmRleCcsIHN0YXRzSW5kZXgpOyIsImZ1bmN0aW9uIFN0YXRzSW5kZXhDb250cm9sbGVyKCRzY29wZSkge1xuICAgIHZhciBjdHJsID0gdGhpcztcblxuICAgIGN0cmwuc3RhdHMgPSB7fTtcblxuICAgIGN0cmwuc3RhdHMuc2VyaWVzID0gWydWaXNpdG9ycycsICdQYWdlIFZpZXdzJ107XG5cbiAgICBjdHJsLnN0YXRzLnJlYWx0aW1lTGFiZWxzID0gWydNb2JpbGUnLCAnVGFibGV0JywgJ0Rlc2t0b3AnLCAnT3RoZXInXVxuICAgIGN0cmwuc3RhdHMudG9kYXlMYWJlbHMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J107XG4gICBcbiAgICBjdHJsLnN0YXRzLnJlYWx0aW1lID0gW1xuICAgICAgICA2NSwgNTksIDEwOCwgMjNcbiAgICBdO1xuXG4gICAgY3RybC5zdGF0cy50b2RheSA9IFtcbiAgICAgICAgWzM0MCwgNTQzLCA1MTIsIDU0MywgNDkzLCA0NDQsIDQzOV1cbiAgICBdO1xuXG4gICAgY3RybC5zdGF0cy5iYXJPcHRpb25zID0ge1xuICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGN0cmwuc3RhdHMucGllT3B0aW9ucyA9IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiB0cnVlXG4gICAgICAgIH1cbiAgICB9O1xuXG59XG5TdGF0c0luZGV4Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcbmFuZ3VsYXIubW9kdWxlKCdzdGF0cycpXG4gICAgLmNvbnRyb2xsZXIoJ1N0YXRzSW5kZXhDb250cm9sbGVyJywgU3RhdHNJbmRleENvbnRyb2xsZXIpOyIsInZhciB5b3V0dWJlU3Vic2NyaWJlcnMgPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc29jaWFsL3lvdXR1YmUtc3Vic2NyaWJlcnMveW91dHViZS1zdWJzY3JpYmVycy5odG1sJyxcbiAgYmluZGluZ3M6IHtcbiAgICB5b3V0dWJlU3Vic2NyaWJlcnM6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29tcG9uZW50KCd5b3V0dWJlU3Vic2NyaWJlcnMnLCB5b3V0dWJlU3Vic2NyaWJlcnMpOyIsImZ1bmN0aW9uIFlvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlcigpe1xuICB2YXIgY3RybCA9IHRoaXM7XG59XG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbnRyb2xsZXIoJ1lvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlcicsIFlvdXR1YmVTdWJzY3JpYmVyQ29udHJvbGxlcik7IiwiIiwiIiwidmFyIHVzZXJFZGl0ID0ge1xuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3VzZXIvdXNlci1lZGl0L3VzZXItZWRpdC5odG1sJyxcbiAgY29udHJvbGxlcjogVXNlckVkaXRDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHVzZXI6ICc8J1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbXBvbmVudCgndXNlckVkaXQnLCB1c2VyRWRpdCk7IiwiZnVuY3Rpb24gVXNlckVkaXRDb250cm9sbGVyKCkge1xuICB2YXIgY3RybCA9IHRoaXM7XG59XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyJylcbiAgLmNvbnRyb2xsZXIoJ1VzZXJFZGl0Q29udHJvbGxlcicsIFVzZXJFZGl0Q29udHJvbGxlcik7IiwidmFyIHVzZXJJbmRleCA9IHtcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3VzZXIvdXNlci1pbmRleC91c2VyLWluZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBVc2VySW5kZXhDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIHVzZXJzOiAnPCdcbiAgfVxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29tcG9uZW50KCd1c2VySW5kZXgnLCB1c2VySW5kZXgpOyIsImZ1bmN0aW9uIFVzZXJJbmRleENvbnRyb2xsZXIoKSB7XG4gIHZhciBjdHJsID0gdGhpcztcblxufTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29udHJvbGxlcignVXNlckluZGV4Q29udHJvbGxlcicsIFVzZXJJbmRleENvbnRyb2xsZXIpOyIsInZhciB1c2VyTmV3ID0ge1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvdXNlci91c2VyLW5ldy91c2VyLW5ldy5odG1sJyxcbiAgY29udHJvbGxlcjogVXNlck5ld0NvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgdXNlcjogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29tcG9uZW50KCd1c2VyTmV3JywgdXNlck5ldyk7IiwiZnVuY3Rpb24gVXNlck5ld0NvbnRyb2xsZXIoVXNlclNlcnZpY2Upe1xuICB2YXIgY3RybCA9IHRoaXM7XG5cbiAgY3RybC5uZXdVc2VyID0gZnVuY3Rpb24odXNlcil7XG4gICAgVXNlclNlcnZpY2UubmV3VXNlcih1c2VyKTtcbiAgfTtcblxufTtcblxuVXNlck5ld0NvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXInKVxuICAuY29udHJvbGxlcignVXNlck5ld0NvbnRyb2xsZXInLCBVc2VyTmV3Q29udHJvbGxlcik7IiwidmFyIHlvdXR1YmVTdWJzY3JpYmVycyA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwveW91dHViZS1zdWJzY3JpYmVycy95b3V0dWJlLXN1YnNjcmliZXJzLmh0bWwnLFxuICBjb250cm9sbGVyOiBZb3V0dWJlU3Vic2NyaWJlckNvbnRyb2xsZXIsIFxuICBiaW5kaW5nczoge1xuICAgIHlvdXR1YmVTdWJzY3JpYmVyczogJzwnXG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb21wb25lbnQoJ3lvdXR1YmVTdWJzY3JpYmVycycsIHlvdXR1YmVTdWJzY3JpYmVycyk7IiwiZnVuY3Rpb24gWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyKCl7XG4gIHZhciBjdHJsID0gdGhpcztcblxuICBjdHJsLnlvdXR1YmVTdWJzY3JpYmVycyA9IFt7IG5hbWU6ICdlbGxpb3QnfV07XG5cbn1cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29udHJvbGxlcignWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyJywgWW91dHViZVN1YnNjcmliZXJDb250cm9sbGVyKTsiLCJmdW5jdGlvbiB5b3V0dWJlU3Vic2NyaWJlclJvdXRlcygkcm91dGVQcm92aWRlcil7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgIC53aGVuKCcveW91dHViZS1zdWJzY3JpYmVycycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJzx5b3V0dWJlLXN1YnNjcmliZXJzPjwveW91dHViZS1zdWJzY3JpYmVycz4nXG4gICAgICB9KTtcbn1cbnlvdXR1YmVTdWJzY3JpYmVyUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29uZmlnKHlvdXR1YmVTdWJzY3JpYmVyUm91dGVzKTsiLCJ2YXIgZmFjZWJvb2tXaWRnZXQgPSB7XG4gIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc29jaWFsL3NvY2lhbC13aWRnZXRzL2ZhY2Vib29rLXdpZGdldC9mYWNlYm9vay13aWRnZXQuaHRtbCdcbn1cblxuYW5ndWxhci5tb2R1bGUoJ3NvY2lhbCcpXG4gIC5jb21wb25lbnQoJ2ZhY2Vib29rV2lkZ2V0JywgZmFjZWJvb2tXaWRnZXQpO1xuICAiLCJ2YXIgdHdpdHRlcldpZGdldCA9IHtcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zb2NpYWwvc29jaWFsLXdpZGdldHMvdHdpdHRlci13aWRnZXQvdHdpdHRlci13aWRnZXQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IFNvY2lhbFR3aXR0ZXJDb250cm9sbGVyXG59XG5cbmFuZ3VsYXIubW9kdWxlKCdzb2NpYWwnKVxuICAuY29tcG9uZW50KCd0d2l0dGVyV2lkZ2V0JywgdHdpdHRlcldpZGdldCk7IiwiZnVuY3Rpb24gU29jaWFsVHdpdHRlckNvbnRyb2xsZXIoKXtcbiAgdmFyIGN0cmwgPSB0aGlzO1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnc29jaWFsJylcbiAgLmNvbnRyb2xsZXIoJ1NvY2lhbFR3aXR0ZXJDb250cm9sbGVyJywgU29jaWFsVHdpdHRlckNvbnRyb2xsZXIpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
