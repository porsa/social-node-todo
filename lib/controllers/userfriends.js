'use strict';

var mongoose = require('mongoose'),
  UserFriend = mongoose.model('UserFriend');

exports.create = function (req, res, next) {
  var newUserFriend = new UserFriend(req.body);
  newUser.provider = 'local';
  newUser.save(function(err) {
    if (err) return res.json(400, err);

    req.logIn(newUser, function(err) {
      if (err) return next(err);

      return res.json(req.user.userInfo);
    });
  });
};
