'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    ObjectId = mongoose.Types.ObjectId,
    passport = require('passport');


/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err) {
    if (err) return res.json(400, err);
    
    req.logIn(newUser, function(err) {
      if (err) return next(err);

      return res.json(req.user.userInfo);
    });
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);

    res.send({ profile: user.profile });
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

//This is meant just for testing, there is
//a POST version also -> createFriends
exports.requestFriend = function(req, res, next) {
    var friendId = new ObjectId(req.params.id);
    User.requestFriend(req.user._id, friendId, function (err) {
        if (err) return res.send(400);
        res.send(200);
    });
};

exports.getFriends = function(req, res) {
    User.getFriends(req.user, function (err, friendships) {
        if (err) return res.send(400);
        return res.json(friendships);
    });
};

exports.createFriends = function(req, res) {
    User.requestFriend(req.user._id, req.body.friendId, function (err) {
        if (err) return res.send(400);
        res.send(200);
    });
};

exports.removeFriend = function(req, res) {
    User.removeFriend(req.user._id, req.body.friendId, function (err) {
        if (err) return res.send(400);
        res.send(200);
    });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};

/**
 * Find user by name or @mail
 */
exports.findByNameOrEmail = function(req, res) {
  if(req.params){
    //name search
    if(req.params.nameOrEmail.indexOf("@") === -1) {
      if(req.params.nameOrEmail.search(/^[a-zA-Z0-9_\ ]*$/) !== -1) {
        var regex = new RegExp("^" + req.params.nameOrEmail + "$", "i");
        return User.find({"name" : regex }, function(err, users) {
          if (err) return res.send(err);
          if (users.length === 0) return res.send(400);
          return res.json(users);
        });
      } else {
        return res.send(400);
      }
    } else { //email search
        return User.findOne({"email" : req.params.nameOrEmail }, function(err, user) {
          if (err) return res.send(err);
          if (!user) return res.send(400);
          return res.json([user]);
        });
      }
  } else {
    return res.send(400);
  }
};