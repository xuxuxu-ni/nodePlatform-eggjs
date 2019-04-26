/**
 * Created by WebStorm.
 * User: Administrator
 * Date: 2019/4/26
 * Description: 文件描述
 */
const Controller = require('../../core/base_controller');
const {cryptoMd5} = require('../../extend/helper');

class RoleController extends Controller {
    // 增加角色
    async addRole() {
        let roleData = this.ctx.request.body
        let results = await this.service.admin.role.addRole(roleData)
        this.ctx.body = results
    }

    // 获取权限列表
    async getRoleList() {
        let roleList = await this.ctx.service.admin.role.getRoleList()

        this.ctx.body = roleList
    }
}

module.exports = RoleController
