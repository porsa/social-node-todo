'use strict';

angular.module('socialNodeToDoApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Session) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'loggedIn' : false
    }, {
      'title': 'Settings',
      'link': '/settings',
      'loggedIn' : true
    }, {
      'title': 'ToDo',
      'link': '/todolist',
      'loggedIn' : true
    }, {
      'title': 'Friends',
      'link':  '/friends',
      'loggedIn' : true
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
