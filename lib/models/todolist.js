'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TodoListSchema = new Schema({
  name: String,
  info: String,
  date: { type: Date, default: Date.now },
  creator_id: {},
  creator_name: { type: String, default: "Anonymous" },
  // TODO: Figure out if this is too loose way to do this, maybe use some schema?
  todoItems: [{
    name: String,
    description: String,
    date: { type: Date, default: Date.now },
    pictures: [{ thumbnail: {}, big: {}}],
    location: {}
  }]
});

mongoose.model('TodoList', TodoListSchema);
