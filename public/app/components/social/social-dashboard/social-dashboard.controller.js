function SocialDashboardController($log){
  var ctrl = this;

  ctrl.$onInit = function() {
    $log.log("Hello World");
  }
}

SocialDashboardController.$inject = ['$log'];

angular.module('social')
  .controller('SocialDashboardController', SocialDashboardController);