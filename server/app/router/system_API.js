/**
 * Created by WebStorm.
 * User: Administrator
 * Date: 2019/4/24
 * Description: 文件描述
 */
module.exports = app => {
    const { router, controller, middleware } = app;
    const isLogin = middleware.verifyToken()
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
}


