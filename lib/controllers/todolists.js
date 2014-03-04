'use strict';

var mongoose = require('mongoose'),
    TodoList = mongoose.model('TodoList');

exports.create = function (req, res) {
    console.log(req.body);
    var newTodoList = new TodoList(req.body);
    newTodoList.save(function(err) {
        if (err) return res.json(400, err);

        return null;
    });
};