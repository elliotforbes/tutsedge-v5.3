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