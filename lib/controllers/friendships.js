'use strict';

var mongoose = require('mongoose'),
  Friendship = mongoose.model('Friendship');

/*exports.create = function (req, res, next) {
  var newFriendship = new Friendship(req.body);
  newFriendship.user_id = req.user.id;
  newUser.save(function(err) {
    if (err) return res.json(400, err);

    req.logIn(newUser, function(err) {
      if (err) return next(err);

      return res.json(req.user.userInfo);
    });
  });
};*/
