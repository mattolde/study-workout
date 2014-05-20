'use strict';

var app = angular.module('studyWorkoutApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).
    when('/createWorkout', {
      templateUrl: 'views/create_workout.html',
      controller: 'UpdateWorkoutCtrl'
    }).
    when('/updateWorkout/:id', {
      templateUrl: 'views/create_workout.html',
      controller: 'UpdateWorkoutCtrl'
    }).
    when('/workout/:id', {
      templateUrl: 'views/workout.html',
      controller: 'WorkoutCtrl'
    }).
    when('/workouts', {
      templateUrl: 'views/workouts.html',
      controller: 'WorkoutsCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});
