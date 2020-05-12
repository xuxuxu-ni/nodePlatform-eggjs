/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019/4/26
 * Description: 文件描述
 */
const Controller = require("../../core/base_controller")

class RoleController extends Controller {
  // 获取角色列表
  async getRoleList () {
    this.ctx.body = await this.ctx.service.admin.role.getRoleList()
  }

  // 增加角色
  async addRole () {
    const roleData = this.ctx.request.body
    this.ctx.body = await this.service.admin.role.addRole(roleData)
  }

  // 删除角色
  async delRole () {
    const id = this.ctx.request.body.id
    this.ctx.body = await this.ctx.service.admin.role.delRole(id)
  }

  // 分配角色权限
  async rolePermissions () {
    const permissionsData = this.ctx.request.body
    this.ctx.body = await this.ctx.service.admin.role.rolePermissions(permissionsData)
  }

  // 获取角色所拥有的权限
  async searchRolePermissions () {
    const { rid } = this.ctx.request.body
    this.ctx.body = await this.ctx.service.admin.role.searchRolePermissions(rid)
  }

}

module.exports = RoleController
