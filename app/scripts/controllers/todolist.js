'use strict';

angular.module('socialNodeToDoApp')
  .controller('TodolistCtrl', function ($scope, $http) {
    $scope.todoLists = [];
    $scope.sharedTodoLists = [];

    $scope.updateTodoLists = function () {
      $http.get('/api/OwnTodoLists').success(function (todoLists) {
        $scope.todoLists = todoLists;
      });

      $http.get('/api/SharedWithMeTodoLists').success(function (todoLists) {
        $scope.sharedTodoLists = todoLists;
      });
    };

    $scope.updateTodoLists();

    $scope.todoList = {};
    $scope.todoListAdd = function () {
      $http.post('/api/todoLists', $scope.todoList).success(function(data){
        $scope.todoLists.push(data);
        $scope.todoList = {};
      });
    };


  });
