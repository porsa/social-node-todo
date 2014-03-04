'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    TodoList = mongoose.model('TodoList');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

exports.todoLists = function(req, res) {
  return TodoList.find(function (err, todoLists) {
    if (!err) {
      return res.json(todoLists);
    } else {
      return res.send(err);
    }
  });
};