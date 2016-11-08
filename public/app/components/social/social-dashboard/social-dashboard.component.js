var socialDashboard = {
  templateUrl: 'app/components/social/social-dashboard/social-dashboard.html',
  controller: SocialDashboardController,
  bindings: {
    socialDashboard: '<'
  }
}

angular.module('social')
  .component('socialDashboard', socialDashboard);