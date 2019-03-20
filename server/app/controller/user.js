/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-20
 * Description: 文件描述
 */
const Controller = require('../core/base_controller');


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

        let results = await this.service.user.editUserInfo(newData)

        this.ctx.body = results
    }

    // 获取用户列表
    async userList() {
        let getListData = this.ctx.request.body
        let list = await this.ctx.service.user.userList(getListData)

        this.ctx.body = list
    }

    // 删除用户
    async delUser() {
        let id = this.ctx.request.body.id
        let result = await this.ctx.service.user.delUser(id)
        this.ctx.body = result
    }
}

module.exports = UserController
