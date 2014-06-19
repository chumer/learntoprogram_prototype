'use strict';


// Declare app level module which depends on filters, and services
angular.module('learntoprogram', [
  'ngRoute',
  'learntoprogram.filters',
  'learntoprogram.services',
  'learntoprogram.directives',
  'learntoprogram.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/single/:eIndex', {templateUrl: 'partials/single.html', controller: 'Single'});
  $routeProvider.when('/multi/:eIndex', {templateUrl: 'partials/multi.html', controller: 'Multi'});
  $routeProvider.when('/teacher/:eIndex', {templateUrl: 'partials/teacher.html', controller: 'Teacher'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'Login'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
