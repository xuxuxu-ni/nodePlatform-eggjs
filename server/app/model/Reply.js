/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-18
 * Description: 文件描述
 */
const db = require("../database/db")

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize

  const Reply = db.defineModel(app, "replys", {
    content: { type: TEXT("long"), allowNull: false }, // 评论内容
    from_user_id: {
      type: STRING,
      allowNull: false,
    }, // 作者id
    comment_id: {
      type: STRING,
      allowNull: false,
    }, // 评论id
    to_user_id: {
      type: STRING,
      allowNull: false,
    }, // 回复对象id
  })

  return Reply
}
