'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserFriendSchema = new Schema({
  user_id: {},
  another_user_id: {}
});

mongoose.model('UserFriend', UserFriendSchema);
