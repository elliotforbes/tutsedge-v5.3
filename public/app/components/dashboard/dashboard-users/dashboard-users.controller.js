function DashboardUsersController(UserService) {
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
        ctrl.data[0] = response.data.growth;
      });
  };

};

DashboardUsersController.$inject = ['UserService'];

angular.module('root')
  .controller('DashboardUsersController', DashboardUsersController);