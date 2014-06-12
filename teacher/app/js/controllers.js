'use strict';

/* Controllers */

angular.module('learntoprogram.controllers', ['learntoprogram.directives'])
    .controller('Teacher', ['$scope', function($scope) {

    }])
    .controller('Single', ['$scope', function($scope) {

    }])
    .controller('Multi', ['$scope', function($scope) {

    }])
    .controller('Login', function ($scope, $rootScope, $location) {
        $scope.credentials = {
            username: '',
            password: ''
        };
        $scope.loginError = '',
        $scope.login = function (credentials) {
            if (credentials.username == 'single' || credentials.username == 'multi' || credentials.username == 'teacher') { // test
                $rootScope.loggedUser = credentials.username;
                $location.path( "/" + credentials.username );
            } else {
                $scope.loginError = "Invalid user/pass.";
            }
        };
    });
