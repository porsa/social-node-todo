'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoListSchema = new Schema({
    name: String,
    info: String,
    todoItems: [{
        id: String,
        name: String
    }],
    user_id: {}
});

mongoose.model('TodoList', TodoListSchema);
