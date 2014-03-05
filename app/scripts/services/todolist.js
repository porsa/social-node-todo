'use strict';

angular.module('socialNodeToDoApp')
  .factory('TodoList', function ($resource) {
    return $resource('/api/todolists/:id');
  });