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
  description: String,
  completion_comment: String,
  completion_coordinates: {},
  date: { type: Date, default: Date.now },
  pictures: [],
  user_id: {},
  todoList_id: Schema.Types.ObjectId,
  todoItem_id: Schema.Types.ObjectId,
  sharedWith: [{
    user_id: {},
    name: String
  }]
});

mongoose.model('UserTodoListItem', UserTodoListItemSchema);
