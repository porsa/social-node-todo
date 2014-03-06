'use strict';

angular.module('socialNodeToDoApp')
  .controller('FriendCtrl', function ($scope, $http, User, Auth) {

    $scope.people = [];
    $scope.keyword = "";

    $scope.searchPeople = function () {
      $http.get('/api/users/find/'+$scope.keyword).success(function(people){
        $scope.people = people;
        $scope.keyword = "";
      });
    };

    $scope.friends = [];

    var loadFriends =  function() {
        $http.get('/api/friends/').success(function(friends){
            $scope.friends = friends;
        });
    }

    loadFriends();

   $scope.acceptFriendRequest = function(friend){
       $http.get('/api/users/friendrequest/'+friend._id).success(function(friends){
           loadFriends();
       });
   }

  });