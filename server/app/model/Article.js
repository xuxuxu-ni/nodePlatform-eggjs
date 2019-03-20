/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const db = require("../database/db");

module.exports = app => {
    const { STRING, INTEGER, BOOLEAN, TEXT } = app.Sequelize;

    const Article = db.defineModel(app, "articles", {
        title: { type: STRING, allowNull: false }, // 标题
        sort: STRING, // 分类
        top: {
            type: BOOLEAN,
            defaultValue: false
        }, // 是否置顶
        contentHtml: TEXT('long'), // html格式内容
        author: {
            type: STRING,
            allowNull: false
        }, // 作者
        readNum: {
            type: INTEGER,
            defaultValue: 0
        }, // 阅读数
        commentNum: {
            type: INTEGER,
            defaultValue: 0
        }, // 评论数
        praiseNum: {
            type: INTEGER,
            defaultValue: 0
        }, //  点赞数
        thumbnail: STRING,
        banner: STRING
    });

    return Article;
};

