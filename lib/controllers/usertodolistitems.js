'use strict';

var mongoose = require('mongoose'),
  UserTodoListItem = mongoose.model('UserTodoListItem');

exports.get = function (req, res) {
  return UserTodoListItem.findById(req.params.id, function (err, todoItem) {
    if (!err) {
      return res.json(todoItem);
    } else {
      return res.send(err);
    }
  });
};

exports.create = function (req, res) {
  // TODO: implement
};