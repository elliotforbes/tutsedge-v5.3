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

    var service = {
        newUser: newUser,
        getUser: getUser,
        getUsers: getUsers
    };

    return service;
};

UserService.$inject = ['$log', '$http'];

angular.module('user')
    .factory('UserService', UserService);