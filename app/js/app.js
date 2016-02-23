'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ngRoute',
  'myApp.version',
  'webcam',
  'ngMaterial',
  'facebook'
]);
app.config(['$routeProvider','FacebookProvider', function($routeProvider, FacebookProvider) {
  $routeProvider.otherwise({redirectTo: '/face'});
   $routeProvider.when('/face', {
    templateUrl: 'app/views/face.html',
    controller: 'faceCtrl'
  })
   .when('/faceTest', {
    templateUrl: 'app/views/face_test.html',
    controller: 'faceCtrl'
  });
   FacebookProvider.init('1060878183958426');
}]);
