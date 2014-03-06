'use strict';

angular.module('socialNodeToDoApp')
  .controller('TodolistDetailCtrl', function ($scope, $http, $routeParams) {
    $scope.todoList = {};

    $http.get('/api/todoLists/' + $routeParams.id).success(function (todoList) {
      $scope.todoList = todoList;
      console.log(todoList);
    });

    $scope.todoListItemAdd = function () {
      $http.post(
          '/api/todoLists/' + $scope.todoListItem.todoListId + '/todoItems'
          , $scope.todoList
        ).success(function () {
      });
    }
  });
