'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ngRoute',
  'myApp.version',
  'webcam'
]);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/face'});
   $routeProvider.when('/face', {
    templateUrl: 'app/views/face.html',
    controller: 'faceCtrl'
  });
}]);
