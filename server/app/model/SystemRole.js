/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const db = require("../database/db");

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const Roles = db.defineModel(app, "system_roles", {
        name: STRING, // 名字
        describe: STRING, // 角色描述
        status: {type: INTEGER, defaultValue: '1'}, //  用户状态： 0:禁用, 1:启用
    });

    return Roles;
};

