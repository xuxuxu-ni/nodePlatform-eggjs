/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-02-01
 * Description: 文件描述
 */
const Service = require("egg/index").Service

class UserService extends Service {
  // 登录查询账号
  async findUsername (username) {
    const user = await this.ctx.model.SystemUser.findOne({
      where: { username },
    })
    return user
  }

  // 登录查询个人信息
  async getUserInfo (info) {
    const { ctx } = this
    let userInfo = ""
    await this.ctx.model.SystemUser.findOne({
      where: { id: info.message.id },
    }).then(async res => {
      console.log(res)
      if (res) {
        const roleInfo = await ctx.model.SystemRole.findById(res.role_id)
        res.setDataValue("roleName", roleInfo.name)
        await ctx.model.SystemRolePermission.findOne({
          where: { role_id: res.role_id },
        }).then(async perRes => {
          if (perRes) {
            res.setDataValue("authorityRouter", perRes.permission_page)
            res.setDataValue("permissionButton", perRes.permission_button)
          }

        })

      }
      userInfo = res
    })
    return userInfo
  }

  // 查询用户信息
  async getUserInfoId (uid) {
    return await this.app.model.SystemUser.findById(uid)
  }

  // 生成 token 保存数据库
  async saveToken (data) {
    await this.app.model.SystemToken.upsert(data)
  }

  // 生成 微信数据 保存数据库
  async saveWXdata (data) {
    console.log(this.app)
    const { session_key, openid } = data
    await this.ctx.model.SystemUser.upsert({
      session_key,
      openid,
    }).then(res => {
      console.log("res: " + JSON.stringify(res))
    }).catch(err => {
      console.log("err: " + JSON.stringify(err))
    })
  }

  // 查找 token 信息
  async findToken (access_token) {
    const tokenInfo = await this.ctx.model.SystemToken.findOne({
      where: {
        access_token,
      },
    })
    return tokenInfo
  }


}

module.exports = UserService
