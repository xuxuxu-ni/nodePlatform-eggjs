/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const db = require("../database/db");

module.exports = app => {
    const { UUID, STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

    const User = db.defineModel(app, "system_users", {
        username: { type: STRING, unique: true, allowNull: false }, // 用户名
        email: { type: STRING }, // 邮箱
        password: { type: STRING, allowNull: false }, // 密码
        name: STRING, // 姓名
        sex: {type: STRING, defaultValue: '1'}, // 用户性别：1男性, 2女性, 0未知
        age: {type: INTEGER, defaultValue: 0}, // 年龄
        avatar: STRING, // 头像
        company: STRING, // 公司
        department: STRING, // 部门
        telePhone: STRING, // 联系电话
        mobilePhone: { type: STRING}, // 手机号码
        info: STRING, // 备注说明
        roleId: UUID, // 角色id
        status: {type: STRING, defaultValue: '1'}, //  用户状态： 0:禁用, 1:启用, 2:删除(隐藏)
        lastSignInAt: DATE, // 上次登录时间
        unionid: STRING, // 微信unionid
        openid: STRING, // 微信openid
        session_key: STRING, // 微信session_key
    });

    return User;
};

