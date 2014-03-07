'use strict';

angular.module('socialNodeToDoApp')
  .controller('TodolistCtrl', function ($scope, $http) {
    $scope.todoLists = [];

    $scope.updateTodoLists = function () {
      $http.get('/api/todoLists').success(function (todoLists) {
        $scope.todoLists = todoLists;
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
