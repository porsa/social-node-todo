'use strict';

angular.module('socialNodeToDoApp')
  .controller('FriendCtrl', function ($scope, User, $http, $timeout) {

    $scope.people = [];
    $scope.keyword = '';
    $scope.searchLoading = {status : 0 };

    $scope.searchPeople = function () {
      $scope.searchLoading.status = 1;
      $http.get('/api/users/find/' + $scope.keyword).success(function(people) {
        $scope.searchLoading.status = 2;
        $scope.people = people;
        $scope.keyword = '';
        $scope.searchLoading.status = 3;
        $timeout(clearLoadingStatus, 1500);
      }).error(function() {
          $scope.searchLoading = {status : -1 };
          $timeout(clearLoadingStatus, 1500);
        });
    };

    var clearLoadingStatus = function(){
      $scope.searchLoading.status = 0 ;
    };

    $scope.friendRequests = [];

    var loadFriends =  function() {
      $http.get('/api/friends/').success(function(friends){
        $scope.friendRequests = friends;
      });
    };

    loadFriends();

    $scope.acceptFriendRequest = function(friend){

      $http.post('/api/friends/', { "friendId": friend._id}).success(function(){
        loadFriends();
      });
    };


    $scope.areFriends = function(potentialFriendId){
      var i;
      var friendAmount = $scope.friendRequests.length;
      for (i = 0; i < friendAmount; i++) {
        if($scope.friendRequests[i].friend._id == potentialFriendId._id){
          return true;
        }
      }

      return false;
    };

  });