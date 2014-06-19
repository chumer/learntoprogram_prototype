'use strict';

/* Directives */


angular.module('learntoprogram.directives', ['learntoprogram.directivesCode'])
    .controller('Navigation', function ($scope, $rootScope, $location) {
        $scope.isTeacher = function() {return $rootScope.loggedUser == 'teacher';};
        $scope.logout = function () {
            $rootScope.loggedUser = '';
            $location.path( "/login");


            $http.get('json/lectures.json').then(function(lectureResponse) {
                $scope.lectures = lectureResponse.data;

                $scope.eIndex = 0;
                $rootScope.eIndex = 1;


            });

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
        $scope.isStudent = function() {return $scope.mode != 'Teacher';};

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
    .controller('Exercise',  function($scope,$http,$rootScope){
        $http.get('json/exercises.json').then(function(exerciseResponse) {
            $scope.exercises = exerciseResponse.data;
            $scope.eIndex = 0;

            $scope.next = function(){
                if($scope.eIndex <$scope.exercises.length-1)
                    $scope.eIndex++;
            };


            $scope.prev = function(){
                if($scope.eIndex >0)
                    $scope.eIndex--;
            };
        });;

    })
    .directive('exercise', function() {
        return {
            restrict: 'E',
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
    .controller('ExerciseTree', function ($scope, $http,$rootScope, $location) {
        $http.get('json/lectures.json').then(function(lectureResponse) {
            $scope.lectures = lectureResponse.data;

            $scope.eIndex = 0;
            $rootScope.eIndex = 1;


        });

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


