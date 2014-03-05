'use strict';

var path = require('path');
var auth = require('./auth-local.js');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3000,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  facebook: {
    clientID: auth.facebook.ClientID,
    clientSecret: auth.facebook.ClientSecret,
    callbackURL: auth.facebook.callbackURL
  }
};