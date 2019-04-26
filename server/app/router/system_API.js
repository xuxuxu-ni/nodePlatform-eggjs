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
    router.post('/user/register', controller.admin.register.userRegister);
    // 登录接口
    router.post('/user/login', controller.admin.login.userLogin);
    // 获取个人信息
    router.get('/user/getUserInfor', isLogin, controller.admin.login.getUserInfor)
    // 获取用户信息
    router.post('/user/getUserInforId', isLogin, controller.admin.login.getUserInforId)
    // 获取用户列表
    router.post('/user/userList', isLogin, controller.admin.user.userList)
    // 修改用户信息
    router.post('/user/editUserInfo', isLogin, controller.admin.user.editUserInfo)
    // 修改用户密码
    router.post('/user/editPassworld', isLogin, controller.admin.user.editPassworld)
    // 删除用户
    router.post('/user/delUser', isLogin, controller.admin.user.delUser)
    // 增加角色
    router.post('/permissions/addRole',isLogin, controller.admin.role.addRole)
    // 角色列表
    router.post('/permissions/getRoleList',isLogin, controller.admin.role.getRoleList)
}


