'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FriendshipSchema = new Schema({
  user_id: {},
  another_user_id: {}
});

mongoose.model('Friendship', FriendshipSchema);
