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
  // 获取个人信息
  router.get('/user/getUserInfor', isLogin, controller.login.getUserInfor)
  // 获取用户信息
  router.post('/user/getUserInforId', isLogin, controller.login.getUserInforId)
  // 获取用户列表
  router.post('/user/userList', isLogin, controller.user.userList)
  // 修改用户信息
  router.post('/user/editUserInfo', isLogin, controller.user.editUserInfo)
  // 修改用户密码
  router.post('/user/editPassworld', isLogin, controller.user.editPassworld)
  // 删除用户
  router.post('/user/delUser', isLogin, controller.user.delUser)
  // 发表文章
  router.post('/article/addArticle', isLogin, controller.article.addArticle)
  // 文章列表
  router.post('/article/articleList', isLogin, controller.article.articleList)
  // 文章回显
  router.post('/article/getArticle', isLogin, controller.article.getArticle)
  // 删除文章
  router.post('/article/delArticle', isLogin, controller.article.delArticle)
  // 图片上传
  router.post('/editor/uploadImg', controller.article.uploadImg)
  // 发表评论
  router.post('/comment/addComment', isLogin, controller.comment.addComment)
  // 回复评论
  router.post('/comment/replyComment', isLogin, controller.comment.replyComment)
  // 评论列表
  router.post('/comment/commentList', isLogin, controller.comment.commentList)
  // 删除评论
  router.post('/comment/delComment', isLogin, controller.comment.delComment)



  router.post('/wxLogin', controller.login.wxLogin);
  router.post('/decryptData', controller.getShareInfo.decryptData);

};
