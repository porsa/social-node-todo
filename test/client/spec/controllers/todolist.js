'use strict';

describe('Controller: TodolistCtrl', function () {

  // load the controller's module
  beforeEach(module('socialNodeToDoApp'));

  var TodolistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodolistCtrl = $controller('TodolistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
