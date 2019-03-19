/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-18
 * Description: 文件描述
 */
const db = require("../database/db");

module.exports = app => {
    const { STRING, INTEGER, BOOLEAN, TEXT } = app.Sequelize;

    const Comment = db.defineModel(app, "comments", {
        content: { type: TEXT('long'), allowNull: false }, // 评论内容
        authorId: {
            type: STRING,
            allowNull: false
        }, // 作者id
        articleId: {
            type: STRING,
            allowNull: false
        }, // 文章id
        praiseNum: {
            type: INTEGER,
            defaultValue: 0
        }, //  点赞数
    });

    return Comment;
};
