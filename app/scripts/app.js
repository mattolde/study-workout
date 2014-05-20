'use strict';

var app = angular.module('studyWorkoutApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

app.controller('MainCtrl', function ($scope) {
  // get day workouts
  $scope.day = day;
});

app.controller('WorkoutsCtrl', function($scope) {
  // Display all workouts
  $scope.workouts = workouts;

  $scope.remove = function(item){
    var index=$scope.workouts.indexOf(item);
    $scope.workouts.splice(index,1);
  };
});

app.controller('CreateWorkoutCtrl', function ($scope, $http, $location) {
  // form save here
  $scope.submit = function(){
    
    // TEMP get last id
    $scope.workout._id = workouts[workouts.length - 1]._id + 1;

    // add to workouts
    workouts.push($scope.workout);
    $location.path('/workouts');

    // $http({
    //   method: 'POST',
    //   data: {url: $scope.url},
    //   url: hostUrl + '/links'
    // }).success(function(data, status){
    //   console.log('Created link');
    //   $location.path('/');
    // });
  };
});

app.controller('UpdateWorkoutCtrl', function($scope, $routeParams, $location){
  
  $scope.findWorkout = function(id) {
    for(var i = 0; i < workouts.length; i++){
      if(workouts[i]._id === id) {
        return workouts[i];
      }
    }
  }

  $scope.workout = $scope.findWorkout(Number($routeParams._id));

  $scope.submit = function(){
    // update workout
    for(var i = 0; i < workouts.length; i++){
      if(workouts[i]._id === $scope.workout._id) {
        workouts[i] = $scope.workout;
        $location.path('/workouts');
      }
    }
  };
});

app.controller('WorkoutCtrl', function($scope, $routeParams, $location) {
  $scope.viewTips = [];

  $scope.findWorkout = function(id) {
    for(var i = 0; i < workouts.length; i++){
      if(workouts[i]._id === id) {
        return workouts[i];
      }
    }
  }

  $scope.workout = $scope.findWorkout(Number($routeParams._id));

  $scope.addTip=function(workout, exercise, tips){
    for(var i = 0; i < workout.exercises.length; i++){
      if(workout.exercises[i] === exercise) {
        workout.exercises[i].viewTips = tips;          
      }
    }
  }

  $scope.complete = function(){
    $location.path('/');
  };
});

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).
    when('/createWorkout', {
      templateUrl: 'views/create_workout.html',
      controller: 'CreateWorkoutCtrl'
    }).
    when('/updateWorkout/:_id', {
      templateUrl: 'views/update_workout.html',
      controller: 'UpdateWorkoutCtrl'
    }).
    when('/workout/:_id', {
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
