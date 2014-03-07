'use strict';

angular.module('socialNodeToDoApp')
  .controller('TodolistDetailCtrl', function ($scope, $http, $routeParams) {
    $scope.todoList = {};
    $scope.todoListItem = {};

    $scope.getUserTodoListItems = function (todoListId) {
      $http.get('/api/todoListItems/' + todoListId).success(function (userTodoListItems) {
        if (userTodoListItems.length > 0) {
          var completedItemIds = userTodoListItems.map(function (item) {
            return item.todoItem_id;
          });

          $scope.todoList.todoItems.forEach(function (item, index) {
            if (completedItemIds.indexOf(item._id+'') !== -1) {
              $scope.todoList.todoItems[index].completed = true;
            }
          });
        }
      });
    };

    $http.get('/api/todoLists/' + $routeParams.id).success(function (todoList) {
      $scope.todoList = todoList;
      $scope.getUserTodoListItems(todoList._id);
    });

    $scope.todoListItemComplete = function (todoListItem) {
      var userTodoListItem = {
        name : todoListItem.name,
        description : todoListItem.description,
        // TODO: some modal thingie or similar to get comments and coordinates
        completion_comment : 'and here be the comment for the completion',
        todoList_id: $scope.todoList._id,
        todoItem_id: todoListItem._id
        // TODO: add completion_coordinates
      };

      $http.post('/api/todoListItems', userTodoListItem).success(function () {
        $scope.getUserTodoListItems($scope.todoList._id);
      });
    };

    $scope.todoListItemAdd = function () {
      $http.post(
        '/api/todoLists/' + $scope.todoList._id + '/todoItems',
        $scope.todoListItem
      ).success(function (data) {
        $scope.todoList.todoItems.push(data);
        $scope.todoListItem = {};
      });
    };
  });
