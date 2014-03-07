'use strict';

angular.module('socialNodeToDoApp')
  .controller('FriendCtrl', function ($scope, $http) {

    $scope.people = [];
    $scope.keyword = '';

    $scope.searchPeople = function () {
      $http.get('/api/users/find/' + $scope.keyword).success(function(people) {
        $scope.people = people;
        $scope.keyword = '';
      });
    };
  });