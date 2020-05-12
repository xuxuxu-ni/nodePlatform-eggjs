/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const db = require("../database/db")

module.exports = app => {
  const { UUID, TEXT } = app.Sequelize

  const RolePermission = db.defineModel(app, "system_role_permission", {
    role_id: UUID, // 角色id
    permission_page: TEXT("long"), // 页面权限
    permission_button: TEXT("long"), // 按钮权限
  })

  return RolePermission
}

