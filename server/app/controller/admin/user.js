/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-20
 * Description: 文件描述
 */
const Controller = require('../../core/base_controller');
const {cryptoMd5} = require('../../extend/helper');

class UserController extends Controller {
    // 资料修改
    async editUserInfo() {
        let userData = this.ctx.request.body

        let newData = {}
        for (let item in userData) {
            if (item != 'password') {
                newData[item] = userData[item]
            }
        }

        let results = await this.service.admin.user.editUserInfo(newData)

        this.ctx.body = results
    }

    // 获取用户列表
    async userList() {
        let getListData = this.ctx.request.body
        let list = await this.ctx.service.admin.user.userList(getListData)
        let roleList = await this.ctx.service.admin.role.getRoleList()
        for (let i = 0; i < list.rows.length; i++) {
            for (let j = 0; j < roleList.rows.length; j++) {
                if (list.rows[i].roleId === roleList.rows[j].id ){
                    list.rows[i].dataValues.roleName = roleList.rows[j].name
                }
            }
        }

        this.ctx.body = list
    }

    // 删除用户
    async delUser() {
        let id = this.ctx.request.body.id
        let result = await this.ctx.service.admin.user.delUser(id)
        this.ctx.body = result
    }

    // 修改密码
    async editPassworld() {
        let {oldPassword, newPassword} = this.ctx.request.body
        let keys = this.config.keys;
        let results = '';
        let myPassword = this.ctx.session.admin.user.password
        let myId = this.ctx.session.user.id
        let oldPass = await cryptoMd5(oldPassword, keys)


        if (oldPass !== myPassword) {
            results = {
                code: 10000,
                message: "原密码错误",
            }
        } else {
            let newPass = await cryptoMd5(newPassword, keys)
            results = await this.ctx.service.admin.user.editPassworld(myId,newPass)
        }

        this.ctx.body = results
    }
}

module.exports = UserController
