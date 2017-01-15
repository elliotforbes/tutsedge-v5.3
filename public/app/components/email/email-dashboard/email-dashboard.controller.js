function EmailDashboardController($log){
  var ctrl = this;

  ctrl.$onInit = function() {
    $log.log("Email Controller Initialized");
  }

}

EmailDashboardController.$inject = ['$log'];

angular.module('email')
  .controller('EmailDashboardController', EmailDashboardController);