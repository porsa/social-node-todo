'use strict';

angular.module('socialNodeToDoApp')
  .controller('FriendsCtrl', function ($scope, $http, User, Auth) {

    $scope.PeopleSearch = [];

    //$http.get('/api/todoLists').success(function (todoLists) {
    //  $scope.todoLists = todoLists;
    //});

    $scope.todoList = {};
    $scope.todoListAdd = function () {
      $http.post('/api/todoLists', $scope.todoList).success(function(){
        $scope.todoLists.push($scope.todoList );
        $scope.todoList = {};
      });
    };
  });