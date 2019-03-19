/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const db = require("../database/db");

module.exports = app => {
    const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

    const User = db.defineModel(app, "users", {
        username: { type: STRING, unique: true, allowNull: false }, // 用户名
        email: { type: STRING, unique: true }, // 邮箱
        password: { type: STRING, allowNull: false }, // 密码
        name: STRING, // 姓名
        sex: {type: INTEGER, defaultValue: 0}, // 用户性别：1男性, 2女性, 0未知
        age: INTEGER, // 年龄
        avatar: STRING, // 头像
        company: STRING, // 公司
        department: STRING, // 部门
        telePhone: STRING, // 联系电话
        mobilePhone: { type: STRING, unique: true}, // 手机号码
        info: STRING, // 备注说明
        roleId: {type: INTEGER, defaultValue: 0}, // 角色id: 0: 普通用户 1:超级管理员 2:管理员
        status: {type: INTEGER, defaultValue: 1}, //  用户状态： 0:禁用, 1:启用, 2:删除(隐藏)
        token: STRING, // 认证 token
        lastSignInAt: DATE // 上次登录时间
    });

    return User;
};

