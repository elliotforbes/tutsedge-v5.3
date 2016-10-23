function DashboardGrowthController(UserService, $log) {
  var ctrl = this;

  this.$onInit = function() {
    UserService.getUsers()
      .then(function success(response){
        $log.log(ctrl.data);
        ctrl.total = response.data.total;
        $log.log(ctrl.data);
      });
  };

}

DashboardGrowthController.$inject = ['UserService', '$log'];

angular.module('dashboard')
  .controller('DashboardGrowthController', DashboardGrowthController);