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

app.controller('UpdateWorkoutCtrl', function($scope, $routeParams, $location){

  /****** jQuery Display : START ******/

  $scope.closeWorkoutDisplay = function(){
    $('#form-workout').slideUp(function(){
      $('.workout-summery').fadeIn();
      $('.table-exercises').fadeIn();
    });
  };

  $scope.openWorkoutDisplay = function(){
    $('.workout-summery').fadeOut(function(){
      $('.table-exercises').fadeOut();
      $('#form-workout').slideDown();
    });
  };

  $scope.exerciseFormShow = function(){
    $('.workout-edit').fadeOut(function(){
      $('.exercise-edit').fadeIn();
    });
  };

  $scope.exerciseFormHide = function(){
    $('.exercise-edit').fadeOut(function(){
      $('.workout-edit').fadeIn();
    });
  };

  /****** jQuery Display : END ******/

  $scope.submit = function(){
    // update workout

    if($scope.id !== undefined){
      for(var i = 0; i < workouts.length; i++){
        if(workouts[i]._id === $scope.workout._id) {
          workouts[i] = $scope.workout;
        }
      }
    } else {
      // create new workout

      // TEMP get last id
      $scope.workout._id = workouts[workouts.length - 1]._id + 1;
      $scope.workout.exercises = [];

      // add to workouts
      workouts.push($scope.workout);

      // $http({
      //   method: 'POST',
      //   data: {url: $scope.url},
      //   url: hostUrl + '/links'
      // }).success(function(data, status){
      //   console.log('Created link');
      //   $location.path('/');
      // });      
    }

    $scope.closeWorkoutDisplay();

  };

  $scope.cancel = function(){
    if($scope.id !== undefined){
      $scope.closeWorkoutDisplay();
    } else {
      $location.path('/');
    }
  };

  $scope.exerciseSubmit = function(){
    // save exercise to workout
    if($scope.index !== undefined){
      $scope.workout.exercises[$scope.index] = $scope.exercise;
    } else {
      $scope.workout.exercises.push($scope.exercise);
      $scope.exerciseFormHide();
    }
    $scope.index = undefined;
  };

  $scope.removeExercise = function(item){
    var index=$scope.workout.exercises.indexOf(item);
    $scope.workout.exercises.splice(index,1);
  };

  $scope.updateExercise = function(item){
    $scope.index = $scope.workout.exercises.indexOf(item);
    $scope.exercise = item;
    $scope.exerciseFormShow();
  };

  $scope.exerciseCancel = function(){
    $scope.exerciseFormHide();
  };

  $scope.exerciseCreate = function(){
    $scope.index = undefined;
    $scope.exercise = undefined;
    $scope.exerciseFormShow();
  };

  $scope.findWorkout = function(id) {
    for(var i = 0; i < workouts.length; i++){
      if(workouts[i]._id === id) {
        return workouts[i];
      }
    }
  }

  $scope.init =function(){

    $scope.id = $routeParams._id;

    if($scope.id !== undefined){
      $scope.workout = $scope.findWorkout(Number($routeParams._id));
      $scope.closeWorkoutDisplay();
    }

  };

  $scope.init();
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
      controller: 'UpdateWorkoutCtrl'
    }).
    when('/updateWorkout/:_id', {
      templateUrl: 'views/create_workout.html',
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
