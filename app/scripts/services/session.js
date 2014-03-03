'use strict';

angular.module('socialNodeToDoApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
