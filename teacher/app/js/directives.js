'use strict';

/* Directives */


angular.module('learntoprogram.directives', [])
    .controller('Navigation', function ($scope, $rootScope, $location) {
        $scope.isTeacher = function() {return $rootScope.loggedUser == 'teacher';};
        $scope.logout = function () {
            $rootScope.loggedUser = '';
            $location.path( "/login");
        }})
    .directive('navigationBar', function() {
        return {
            restrict: 'E',
            scope: {
                mode: '@mode',
                user: '@user'
            },
            templateUrl : 'partials/navigation.html'
        };
    });
