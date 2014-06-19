'use strict';

/* Directives */

angular.module('learntoprogram.directives', ['learntoprogram.directivesCode'])
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
    })
    .controller('Workspace', function ($scope, $rootScope, $location) {
        $scope.isSingle = function() {return $scope.mode == 'Single';};
        $scope.isMulti = function() {return $scope.mode == 'Multi';};
        $scope.isTeacher = function() {return $scope.mode == 'Teacher';};

    })
    .directive('workspace', function() {
        return {
            restrict: 'E',
            scope: {
                mode: '@mode'
            },
            templateUrl : 'partials/workspace.html'
        };
    })
    .controller('Exercise', function ($scope, $rootScope, $location) {
    })
    .directive('exercise', function() {
        return {
            restrict: 'E',
            scope: {
            },
            templateUrl : 'partials/exercise.html'
        };
    })
    .controller('Variables', function ($scope, $rootScope, $location) {
    })
    .directive('variables', function() {
        return {
            restrict: 'E',
            scope: {
            },
            templateUrl : 'partials/variables.html'
        };
    })
    .controller('ExerciseTree', function ($scope, $rootScope, $location) {
    })
    .directive('exerciseTree', function() {
        return {
            restrict: 'E',
            scope: {
            },
            templateUrl : 'partials/exerciseTree.html'
        };
    })
    .controller('Functions', function ($scope, $rootScope, $location) {
    })
    .directive('functions', function() {
        return {
            restrict: 'E',
            scope: {
            },
            templateUrl : 'partials/functions.html'
        };
    })
    ;
;


