'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;

  router.get('/index', controller.home.index);
  router.post('/register', controller.login.register);
  router.post('/login', controller.login.userLogin);
};
