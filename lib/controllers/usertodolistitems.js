'use strict';

var mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId,
  UserTodoListItem = mongoose.model('UserTodoListItem');

exports.get = function (req, res) {
  return UserTodoListItem.find({
    todoList_id : new ObjectId(req.params.id),
    user_id : String(req.user._id)
  }, function (err, todoListItems) {
    if (!err) {
      return res.json(todoListItems);
    } else {
      return res.send(err);
    }
  });
};

exports.create = function (req, res) {
  if (req.user) {
    var newUserTodoListItem = new UserTodoListItem(req.body);
    newUserTodoListItem._id = null;
    newUserTodoListItem.user_id = req.user.id;
    newUserTodoListItem.save(function(err) {
      if (err) return res.json(400, err);
      return res.json(newUserTodoListItem);
    });
  }
};
