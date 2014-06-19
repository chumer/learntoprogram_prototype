'use strict';

/* Directives */


angular.module('learntoprogram.directives', ['learntoprogram.directivesCode'])
    .controller('Navigation', function ($scope,$http, $rootScope, $location) {


        $scope.isTeacher = function() {return $rootScope.loggedUser == 'teacher';};
        $scope.logout = function () {
            $rootScope.loggedUser = '';
            $location.path( "/login");


        };
        $http.get('json/lectures.json').then(function(lectureResponse) {
            $scope.lectures = lectureResponse.data;

        });

        })
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
    .controller('Workspace', function ($scope, $rootScope,$http, $location) {
        $scope.isSingle = function() {return $scope.mode == 'Single';};
        $scope.isMulti = function() {return $scope.mode == 'Multi';};
        $scope.isTeacher = function() {return $scope.mode == 'Teacher';};
        $scope.isStudent = function() {return $scope.mode != 'Teacher';};

        $http.get('json/lectures.json').then(function(lectureResponse) {
            $scope.lectures = lectureResponse.data;

        });

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
    .controller('Exercise',  function($scope,$http,$location,$rootScope){
        $http.get('json/exercises.json').then(function(exerciseResponse) {
            $scope.exercises = exerciseResponse.data;

            if ($scope.isMulti()) {
                $scope.eIndex = 2;
            } else {
                $scope.eIndex = 0;
            }

            $scope.next = function(){
                if($scope.eIndex <$scope.exercises.length-1) {
                    $scope.eIndex++;
                }
                $scope.updateMode();
            };
            $scope.prev = function(){
                if($scope.eIndex >0)
                    $scope.eIndex--;
                $scope.updateMode();
            };

            $scope.updateMode = function() {
                if ($scope.eIndex > 1 && $scope.mode == "Single") {
                    $rootScope.loggedUser = "multi";
                    $location.path( "/multi");
                } else  if ($scope.eIndex <= 1 &&  $scope.mode == "Multi") {
                    $rootScope.loggedUser = "single";
                    $location.path( "/single");
                }
            }
        });

    })
    .directive('exercise', function() {
        return {
            restrict: 'E',
            templateUrl : 'partials/exercise.html'
        };
    })
    .controller('Variables', function ($scope, $rootScope, $location) {

        $scope.varsToShow = [];


        window.calculateNewVariables = function(){
            var oldVarsToShow = $scope.varsToShow;
            $scope.varsToShow = [];

            if ($scope.blackList == undefined) {
                $scope.blackList = [];
                for(var key in window) {
                    if (window.hasOwnProperty(key)) {
                        $scope.blackList.push(key);
                    }
                }
            }

            for(var key in window) {
                if (window.hasOwnProperty(key)) {
                    var found = false;

                    for (var i = 0; i < $scope.blackList.length; i++) {
                        if ($scope.blackList[i] == key) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        console.log(key);
                        $scope.varsToShow[key] = window[key];
                    }
                }
            }

            var variablesTable = document.getElementById("variablesTable");
            for (var key in oldVarsToShow) {
                if (oldVarsToShow.hasOwnProperty(key)) {
                    variablesTable.deleteRow(0);
                }
            }

            var i = 0;
            for (var key in $scope.varsToShow) {
                if ($scope.varsToShow.hasOwnProperty(key)) {
                    var row = variablesTable.insertRow(i);
                    var keyCell = row.insertCell(0);
                    var clazz = "varDefault";
                    if (oldVarsToShow != undefined &&  (!oldVarsToShow.hasOwnProperty(key) || oldVarsToShow[key] != $scope.varsToShow[key])) {
                        clazz = "varHighlight";
                    }

                    keyCell.innerHTML = "<div style='margin-left: 30px;'><span class='glyphicon glyphicon-tag'> </span>&nbsp;&nbsp;&nbsp;"+ key + " = " + $scope.varsToShow[key] + "</div>";
                    keyCell.className = clazz;

                    i++;
                }
            }
        };
        window.calculateNewVariables();

    })
    .directive('variables', function() {
        return {
            restrict: 'E',

            templateUrl : 'partials/variables.html'
        };
    })
    .controller('ExerciseTree', function ($scope, $http,$rootScope, $location) {


    })
    .directive('exerciseTree', function() {
        return {
            restrict: 'E',

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


