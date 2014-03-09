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

    $scope.usersSharingList = [];

    $http.get('/api/todoLists/' + $routeParams.id).success(function (todoList) {
      $scope.todoList = todoList;
      $scope.getUserTodoListItems(todoList._id);
      angular.forEach(todoList.sharedWith, function(sharedWithUser){
        $scope.usersSharingList[sharedWithUser.user_id] = true;
      });
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

    $scope.friendRequests = [];

    var loadFriends =  function() {
      $http.get('/api/friends/').success(function(friends){
        $scope.friendRequests = friends;
      });
    };

    loadFriends();



    $scope.todolistUsers = [];

    $scope.shareList = function (friendRequest) {

      $scope.friendDetails = {
        user_id: friendRequest.friend._id,
        name: friendRequest.friend.name
      };
      console.log($scope.friendDetails);
      $http.post(
          '/api/todoLists/' + $scope.todoList._id + '/share',
          $scope.friendDetails
        ).success(function (data) {
          if(data != null)
            $scope.todolistUsers.push($scope.friendDetails);
            console.log(data);
          $scope.friendDetail = {}
          $scope.usersSharingList[data.user_id] = true;
        });
    };



    $scope.isSharedWithUser = function (friend){
      if($scope.usersSharingList[friend._id] == true){
        return true;
      }
      return false;
    };


  });
