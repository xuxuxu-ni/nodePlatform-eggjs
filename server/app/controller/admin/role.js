/**
 * Created by WebStorm.
 * User: Administrator
 * Date: 2019/4/26
 * Description: 文件描述
 */
const Controller = require('../../core/base_controller');

class RoleController extends Controller {
    // 获取角色列表
    async getRoleList() {
        let roleList = await this.ctx.service.admin.role.getRoleList()
        this.ctx.body = roleList
    }

    // 增加角色
    async addRole() {
        let roleData = this.ctx.request.body
        let results = await this.service.admin.role.addRole(roleData)
        this.ctx.body = results
    }

    // 删除用户
    async delRole() {
        let id = this.ctx.request.body.id
        let result = await this.ctx.service.admin.role.delRole(id)
        this.ctx.body = result
    }

    // 分配角色权限
    async rolePermissions() {
        let permissionsData = this.ctx.request.body
        let result = await this.ctx.service.admin.role.rolePermissions(permissionsData)
        this.ctx.body = result
    }


}

module.exports = RoleController
