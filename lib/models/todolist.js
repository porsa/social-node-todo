'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TodoListSchema = new Schema({
  name: String,
  info: String,
  date: { type: Date, default: Date.now },
  creator_id: {},
  creator_name: { type: String, default: "Anonymous" },
  todoItems: [{
    name: String,
    todoItem_id: Schema.Types.ObjectId,
    pictures: [{ thumbnail: {}, big: {}}]
  }],
});

mongoose.model('TodoList', TodoListSchema);
