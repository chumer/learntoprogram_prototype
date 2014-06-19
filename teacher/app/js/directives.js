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
    .controller('Exercise',  function($scope,$http,$location,$rootScope,$route, $routeParams){
        $http.get('json/exercises.json').then(function(exerciseResponse) {
            $scope.exercises = exerciseResponse.data;

            if ($routeParams.eIndex == undefined) {
                $scope.eIndex = 0;
            } else {
                $scope.eIndex = $routeParams.eIndex;
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
                $routeParams.eIndex = $scope.eIndex;
                if ($scope.eIndex > 1 ) {
                    $rootScope.loggedUser = "multi";
                    $location.path( "/multi/" + $scope.eIndex);
                } else  if ($scope.eIndex <= 1) {
                    $rootScope.loggedUser = "single";
                    $location.path( "/single/"+ $scope.eIndex);
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

        window.blackList = undefined;
        if (window.varsToShow != undefined) {
            for(var key in window.varsToShow) {
                if (window.hasOwnProperty(key)) {
                    delete window[key];
                }
            }
        }
        $scope.varsToShow = [];

        window.calculateNewVariables = function(){
            var oldVarsToShow = window.varsToShow;
            var blacklist = window.blacklist;
            window.varsToShow = [];

            if (blacklist == undefined) {
                blacklist = [];
                window.blacklist = blacklist;
                for(var key in window) {
                    if (window.hasOwnProperty(key)) {
                        blacklist.push(key);
                    }
                }
            }
            for(var key in window) {
                if (window.hasOwnProperty(key)) {
                    var found = false;

                    for (var i = 0; i < blacklist.length; i++) {
                        if (blacklist[i] == key) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        window.varsToShow[key] = window[key];
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
            for (var key in window.varsToShow) {
                if (window.varsToShow.hasOwnProperty(key)) {
                    var row = variablesTable.insertRow(i);
                    var keyCell = row.insertCell(0);
                    var clazz = "varDefault";
                    if (oldVarsToShow != undefined &&  (!oldVarsToShow.hasOwnProperty(key) || oldVarsToShow[key] != window.varsToShow[key])) {
                        clazz = "varHighlight";
                    }

                    keyCell.innerHTML = "<div style='margin-left: 30px;'><span class='glyphicon glyphicon-tag'> </span>&nbsp;"+ key + " = " + window.varsToShow[key] + "</div>";
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
            link: initVariables,
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
            templateUrl : 'partials/functions.html'
        };
    })
    ;
;

function initVariables() {
    window
}
