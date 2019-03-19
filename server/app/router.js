'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const isLogin = middleware.verifyToken()
  /*************** 页面请求路由 ***************/
  router.get('/index', controller.home.index);

  /*************** 接口请求路由 ***************/
  // 注册接口
  router.post('/user/register', controller.register.userRegister);
  // 登录接口
  router.post('/user/login', controller.login.userLogin);
  // 获取用户信息
  router.get('/user/getUserInfor', isLogin, controller.login.getUserInfor)
  // 发表文章
  router.post('/article/addArticle', isLogin, controller.article.addArticle)
  // 图片上传
  router.post('/editor/uploadImg', controller.article.uploadImg)
  // 发表评论
  router.post('/comment/addComment', isLogin, controller.comment.addComment)
  // 回复评论
  router.post('/comment/replyComment', isLogin, controller.comment.replyComment)



  router.post('/wxLogin', controller.login.wxLogin);
  router.post('/decryptData', controller.getShareInfo.decryptData);

};
