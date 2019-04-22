/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const db = require("../database/db");

module.exports = app => {
    const { STRING } = app.Sequelize;

    const RolePermission = db.defineModel(app, "system_role_permission", {
        role_id: STRING, // 角色id
        permission_id: STRING, // 权限id
    });

    // User.hasMany(Article, {as: 'articlesss'})
    return RolePermission;
};

