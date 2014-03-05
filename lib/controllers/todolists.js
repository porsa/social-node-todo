'use strict';

var mongoose = require('mongoose'),
    TodoList = mongoose.model('TodoList');

exports.create = function (req, res) {
    console.log(req.body);
    var newTodoList = new TodoList(req.body);
    newTodoList.save(function(err) {
        if (err) return res.json(400, err);

        return res.send(200);
    });
};

exports.get = function (req, res) {
    return TodoList.find(function (err, todoLists) {
        if (!err) {
            return res.json(todoLists);
        } else {
            return res.send(err);
        }
    });
};

exports.createTodoItem = function (req, res) {
  var todoList = TodoList.findById(req.body.todoListId);

  todoList.todoItems.add({
    name: req.body.name,
    completed: false
  });

  todoList.save(function (err) {
    if (!err) {
      return res.send(200);
    }

    return res.send(err);
  });
};