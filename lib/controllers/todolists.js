'use strict';

var mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId,
  TodoList = mongoose.model('TodoList');

exports.create = function (req, res) {
  var newTodoList = new TodoList(req.body);

  if (req.user) {
    newTodoList.creator_id = req.user.id;
    newTodoList.creator_name = req.user.name;
  }
  newTodoList.save(function(err) {
    if (err) return res.json(400, err);

    return res.json(newTodoList);
  });
};

exports.getOne = function (req, res) {
  if (req.params) {
    return TodoList.findOne({"_id" : new ObjectId(req.params.id) }, function(err, todoList) {
      if (err) return res.send(err);
      if (!todoList) return res.send(400);
      return res.json(todoList);
    });
  } else {
    return res.send(400);
  }
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

exports.deleteOne = function(req, res) {
  TodoList.findByIdAndRemove({"_id": new ObjectId(req.body.id)}, function(err, todoList) {
      if(err) return res.send(err);
      if(!todoList) return res.send(400);
      return res.json(todoList);
    }
  );
};

exports.createTodoItem = function (req, res) {
  return TodoList.findOne({ "_id" : new ObjectId(req.params.id)}, function (err, todoList) {
    var todoItem = {
      name: req.body.name,
      description: req.body.description,
      coordinates: {}
    };

    todoList.todoItems.push(todoItem);

    return todoList.save(function (err) {
      if (!err) {
        return res.json(todoItem);
      }

      return res.send(err);
    });
  });
};

exports.getTodoItem = function (req, res) {
  return TodoList.findOne({ "_id" : new ObjectId(req.params.todoListId)}, function (err, todoList) {
    var items = todoList.todoItems.filter(function(item) {
      if (item.todoItem_id !== null) {
        return (String(item.todoItem_id) === req.params.todoItemId);
      }

      return false;
    });

    if (items.length === 1) {
      return res.json(items[0]);
    }

    return res.send(400);
  });
};

exports.getOwnTodoLists = function (req, res) {
  return TodoList.find({creator_id: req.params.id}, function(err, todoLists) {
    if(!err) return res.send(err);
    return res.json(todoLists);
  });
};

exports.getSharedTodoLists = function (req, res) {
  return TodoList.find()
}