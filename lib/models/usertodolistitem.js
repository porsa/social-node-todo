'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * These are made for user when they complete a TodoListItem.
 * So they're kind of done by default.
 *
 * @type {Schema}
 */
var UserTodoListItemSchema = new Schema({
  name: String,
  comment: String,
  coordinates: {},
  date: { type: Date, default: Date.now },
  pictures: [],
  user_id: {},
  todolist_id: {}
});

mongoose.model('UserTodoListItem', UserTodoListItemSchema);
