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
  app.get('/api/todoLists', todoLists.get);
  app.get('/api/todoLists/:id', todoLists.getOne);
  app.post('/api/todoLists', todoLists.create);
  app.post('/api/todoLists/:id/todoItems', todoLists.createTodoItem);
  app.get('/api/todoLists/:todoListId/todoItems/:todoItemId', todoLists.getTodoItem);

  app.get('/api/todoListItems/:id', todoItems.get);
  app.post('/api/todoListItems', todoItems.create);
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  //facebook login
  app.get('/auth/facebook', passport.authenticate('facebook'));
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