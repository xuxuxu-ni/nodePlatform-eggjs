/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-02-18
 * Description: 文件描述
 */
const db = require("../database/db");

module.exports = app => {
    const { STRING, UUID } = app.Sequelize;

    const refresh_token = db.defineModel(app, "refresh_token", {
        uid: { type: UUID, unique: true, allowNull: false }, // 用户id
        access_token: { type: STRING, unique: true, allowNull: false }, // 2小时的 Token
        refresh_token: { type: STRING, unique: true, allowNull: false }, // 7天的 Token
    });

    return refresh_token;
};
