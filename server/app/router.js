'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const isLogin = middleware.verifyToken()
  router.get('/index', isLogin, controller.home.index);
  router.post('/register', isLogin, controller.login.register);
  router.post('/login', controller.login.userLogin);

  router.post('/wxLogin', controller.login.wxLogin);
  router.post('/decryptData', controller.getShareInfo.decryptData);

};
