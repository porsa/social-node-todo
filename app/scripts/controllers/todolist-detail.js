'use strict';

angular.module('socialNodeToDoApp')
  .controller('TodolistDetailCtrl', function ($scope, $http, $routeParams) {
    $scope.todoList = {};
    $scope.todoListItem = {};

    $http.get('/api/todoLists/' + $routeParams.id).success(function (todoList) {
      $scope.todoList = todoList;
    });

    $scope.todoListItemAdd = function () {
      $http.post(
          '/api/todoLists/' + $scope.todoList._id + '/todoItems'
          , $scope.todoListItem
        ).success(function (data) {
          $scope.todoList.todoItems.push(data);
          $scope.todoListItem = {};
      });
    }
  });
