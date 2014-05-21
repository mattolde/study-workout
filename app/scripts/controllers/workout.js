'use strict';

var app = angular.module('studyWorkoutApp');

var hostUrl = 'http://127.0.0.1:8080';

app.controller('MainCtrl', function ($scope, $http) {
  // get day workouts
  $scope.getWorkouts = function(){
    $http({
      method: 'GET',
      url: hostUrl + '/workouts'
    }).success(function(workouts){
      var day = {};
      day.workouts = workouts;
      $scope.day = day;
    });
  };

  $scope.getWorkouts();
});

app.controller('UpdateWorkoutCtrl', function($scope, $routeParams, $location, $http){

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

  $scope.getWorkout = function(id){
    $http({
      method: 'GET',
      url: hostUrl + '/workouts/' + id
    }).success(function(workout){
      $scope.workout = workout;
    });
  };

  $scope.getExercises = function(workoutId){
    $http({
      method: 'GET',
      url: hostUrl + '/exercises/' + workoutId
    }).success(function(exercises){
      $scope.exercises = exercises;
    });
  };  

  $scope.submit = function(){
    // update workout
    if($scope.workout._id !== undefined){
      // update workout
      $http({
        method: 'PUT',
        data: $scope.workout,
        url: hostUrl + '/workouts'
      }).success(function(workout){
        $scope.workout = workout;
        $scope.closeWorkoutDisplay();
      });

    } else {
      // create new workout
      $http({
        method: 'POST',
        data: $scope.workout,
        url: hostUrl + '/workouts'
      }).success(function(workout, status){
        $scope.workout = workout;
        $scope.closeWorkoutDisplay();
      });
    }
  };

  $scope.cancel = function(){
    $scope.closeWorkoutDisplay();
  };

  $scope.exerciseSubmit = function(){
    // save exercise
    $scope.exercise.workoutId = $scope.workout._id;

    if($scope.exercise._id !== undefined){
      $http({
        method: 'PUT',
        data: $scope.exercise,
        url: hostUrl + '/exercises'
      }).success(function(exercise, status){
        $scope.getExercises(exercise.workoutId);
      });
    } else {
      $http({
        method: 'POST',
        data: $scope.exercise,
        url: hostUrl + '/exercises'
      }).success(function(exercise, status){
        $scope.getExercises(exercise.workoutId);
      });
    }

    $scope.exerciseFormHide();

  };

  $scope.removeExercise = function(exercise){
    $http({
      method: 'DELETE',
      url: hostUrl + '/exercises/' + exercise._id
    }).success(function(){
      $scope.getExercises(exercise.workoutId);
    });    
  };

  $scope.updateExercise = function(item){
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

  $scope.init =function(){

    $scope.workoutId = $routeParams.id;

    if($scope.workoutId !== undefined){
      $scope.getWorkout($scope.workoutId);
      $scope.getExercises($scope.workoutId);
      $scope.closeWorkoutDisplay();
    } else {
      $('.form-workout').fadeIn();
    }

  };

  $scope.init();
});

app.controller('WorkoutsCtrl', function($scope, $http) {

  $scope.getWorkouts = function(){
    $http({
      method: 'GET',
      url: hostUrl + '/workouts'
    }).success(function(workouts){
      $scope.workouts = workouts;
    });
  };

  $scope.remove = function(item){
    $http({
      method: 'DELETE',
      url: hostUrl + '/workouts/' + item._id
    }).success(function(){
      $scope.getWorkouts();
    });
  };

  $scope.getWorkouts();
});

app.controller('WorkoutCtrl', function($scope, $routeParams, $location, $http) {

  $scope.getWorkout = function(id){
    
    $http({
      method: 'GET',
      url: hostUrl + '/workouts/' + id
    }).success(function(workout){
      $scope.workout = workout;
    });

    $http({
      method: 'GET',
      url: hostUrl + '/exercises/' + id
    }).success(function(exercises){
      $scope.exercises = exercises;
    });

  };

  $scope.getWorkout($routeParams.id);

  $scope.complete = function(){
    $(".timer").TimeCircles().stop();
    $('.tips').hide();
    $('.btn-tip').hide();
    $('.btn-complete').hide();
    $('.btn-save-workout').show();
    $('.exercise-answer').slideDown();

    if($scope.workout.count === null){
      $scope.workout.count = 1;
    } else {
      $scope.workout.count += 1;
    }

    $scope.workout.bestTime = $(".timer").TimeCircles().getTime() * -1;

    $http({
      method: 'PUT',
      data: $scope.workout,
      url: hostUrl + '/workouts'
    }).success(function(workout){
      // $scope.workout = workout;
      // $scope.closeWorkoutDisplay();
    });
  };

  $scope.save = function(){
    $location.path('/');
  };
});