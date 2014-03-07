'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    passport = require('passport'),
    todoLists = require('./controllers/todolists'),
    todoItems = require('./controllers/usertodolistitems');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/todoLists', middleware.auth, todoLists.get);
  app.get('/api/todoLists/:id', middleware.auth,todoLists.getOne);
  app.post('/api/todoLists', middleware.auth, todoLists.create);
  app.post('/api/todoLists/:id/todoItems', middleware.auth, todoLists.createTodoItem);
  app.get('/api/todoLists/:todoListId/todoItems/:todoItemId', middleware.auth, todoLists.getTodoItem);
  app.del('/api/todoLists', middleware.auth, todoLists.deleteOne);

  app.get('/api/todoListItems/:id', middleware.auth, todoItems.get);
  app.post('/api/todoListItems', middleware.auth,todoItems.create);
  
  app.post('/api/users', users.create);
  app.put('/api/users', middleware.auth, users.changePassword);
  app.get('/api/users/me', middleware.auth, users.me);
  app.get('/api/users/:id', middleware.auth, users.show);
  app.get('/api/users/find/:nameOrEmail', middleware.auth, users.findByNameOrEmail);

  app.get('/api/users/friendrequest/:id', middleware.auth, users.requestFriend);

  app.get('/api/friends', middleware.auth, users.getFriends);
  app.post('/api/friends', middleware.auth, users.createFriends);
  app.delete('/api/friends', middleware.auth, users.removeFriend);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  app.get('/api/friendlist', middleware.auth, users.getFriendList);

  //facebook login
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['basic_info', 'email', 'read_friendlists']}));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/login' }));


  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};