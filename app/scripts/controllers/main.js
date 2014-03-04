'use strict';

angular.module('socialNodeToDoApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.todoLists = [];

    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $http.get('/api/todoLists').success(function (todoLists) {
      $scope.todoLists = todoLists;
    });
        
    $scope.todoList = {};
    $scope.todoListAdd = function () {
      $http.post('/api/todoLists', $scope.todoList).success(function(){
        $scope.todoLists.push($scope.todoList );
        name: $scope.todoList = {};
      });
    };
  });
