var dashboardGrowth = {
  templateUrl : './app/components/dashboard/dashboard-growth',
  controller: DashboardGrowthController,
  bindings: {
    total : '<'
  }
}

angular.module('dashboard')
  .component('dashboardGrowth', dashboardGrowth);