/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const db = require("../database/db");

module.exports = app => {
    const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

    const wxUser = db.defineModel(app, "wx_users", {

        unionid: STRING,
        openid: STRING,
        session_key: STRING, // 公司
    });

    return wxUser;
};

