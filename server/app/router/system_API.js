/**
 * Created by WebStorm.
 * User: Administrator
 * Date: 2019/4/24
 * Description: 文件描述
 */
module.exports = app => {
    const { router, controller, middleware } = app;
    // 验证 token 室友有效
    const isLogin = middleware.verifyToken()
    // 对超级管理员进行操作的时候校验是否有权限
    const editAdmin = middleware.editAdmin()
    // 验证账号所在的角色和该账号状态是否有效
    const roleAndUseStatus = middleware.roleAndUseStatus()
    // 注册接口
    router.post('/user/register', controller.admin.register.userRegister);
    // 登录接口
    router.post('/user/login', controller.admin.login.userLogin);
    // 获取个人信息
    router.get('/user/getUserInfor', isLogin, controller.admin.login.getUserInfor)
    // 获取用户信息
    router.post('/user/getUserInforId', isLogin, roleAndUseStatus, controller.admin.login.getUserInforId)
    // 获取用户列表
    router.post('/user/userList', isLogin, roleAndUseStatus, controller.admin.user.userList)
    // 修改用户信息
    router.post('/user/editUserInfo', isLogin, roleAndUseStatus, editAdmin, controller.admin.user.editUserInfo)
    // 修改用户密码
    router.post('/user/editPassworld', isLogin, roleAndUseStatus, controller.admin.user.editPassworld)
    // 删除用户
    router.post('/user/delUser', isLogin, roleAndUseStatus, editAdmin, controller.admin.user.delUser)
    // 角色列表
    router.post('/permissions/getRoleList',isLogin, roleAndUseStatus, controller.admin.role.getRoleList)
    // 增加角色
    router.post('/permissions/addRole',isLogin, roleAndUseStatus, controller.admin.role.addRole)
    // 删除角色
    router.post('/permissions/delRole',isLogin, roleAndUseStatus, controller.admin.role.delRole)
    // 分配角色权限
    router.post('/permissions/rolePermissions',isLogin, roleAndUseStatus, controller.admin.role.rolePermissions)

}


