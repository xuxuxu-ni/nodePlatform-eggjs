/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-20
 * Description: 文件描述
 */
const Controller = require("../../core/base_controller")
const { cryptoMd5 } = require("../../extend/helper")

class UserController extends Controller {
  // 资料修改
  async editUserInfo () {
    const userData = this.ctx.request.body

    const newData = {}
    for (const item in userData) {
      if (item !== "password") {
        newData[item] = userData[item]
      }
    }

    this.ctx.body = await this.service.admin.user.editUserInfo(newData)
  }

  // 获取用户列表
  async userList () {
    const getListData = this.ctx.request.body
    const list = await this.ctx.service.admin.user.userList(getListData)
    const roleList = await this.ctx.service.admin.role.getRoleList()
    for (let i = 0; i < list.rows.length; i++) {
      for (let j = 0; j < roleList.rows.length; j++) {
        if (list.rows[i].role_id === roleList.rows[j].id) {
          list.rows[i].dataValues.roleName = roleList.rows[j].name
        }
      }
    }

    this.ctx.body = list
  }

  // 删除用户
  async delUser () {
    const id = this.ctx.request.body.id
    this.ctx.body = await this.ctx.service.admin.user.delUser(id)
  }

  // 修改密码
  async editPassword () {
    const { oldPassword, newPassword } = this.ctx.request.body
    const keys = this.config.keys
    let results = ""
    const myPassword = this.ctx.session.admin.user.password
    const myId = this.ctx.session.user.id
    const oldPass = await cryptoMd5(oldPassword, keys)


    if (oldPass !== myPassword) {
      results = {
        code: 10000,
        message: "原密码错误",
      }
    } else {
      const newPass = await cryptoMd5(newPassword, keys)
      results = await this.ctx.service.admin.user.editPassword(myId, newPass)
    }

    this.ctx.body = results
  }
}

module.exports = UserController
