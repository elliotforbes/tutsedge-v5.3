function UserService($log, $http) {

    function newUser(user) {
        $log.log("Adding New User");
    }

    function getUser(id) {
        return $http.get('api/user/' + id + "?v=" + Date.now());
    }

    function getUsers(page) {
        return $http.get('api/users?page=' + page + "?v=" + Date.now());
    }

    function getGrowth() {
        return $http.get('api/users/growth' + "?v=" + Date.now());
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