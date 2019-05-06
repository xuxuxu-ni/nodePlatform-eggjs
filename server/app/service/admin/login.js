/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-02-01
 * Description: 文件描述
 */
const Service = require('egg/index').Service;

class UserService extends Service {
    // 登录查询账号
    async findUsername(username) {
        let user = await this.ctx.model.SystemUser.findOne({
            where: {username}
        })
        return user;
    }

    // 登录查询个人信息
    async getUserInfor(info) {
        let {ctx} = this
        let userInfo;
        await this.ctx.model.SystemUser.findOne({
            where: {id: info.message.id}
        }).then( async res => {
            console.log(res);
            if (res) {
                let roleInfo = await ctx.model.SystemRole.findById(res.roleId)
                res.setDataValue('roleName', roleInfo.name)
                res.setDataValue("authorityRouter", roleInfo.permission)
            }
            userInfo = res
        })
        return userInfo
    }

    // 查询用户信息
    async getUserInforId(uid) {
        let userInfo = await this.app.model.SystemUser.findById(uid)
        return userInfo
    }

    // 生成 token 保存数据库
    async saveToken(data) {
        await this.app.model.SystemToken.upsert(data)
    }

    // 生成 微信数据 保存数据库
    async saveWXdata(data) {
        console.log(this.app);
        let {session_key,openid} = data
        await this.ctx.model.SystemUser.upsert({
            session_key,
            openid,
        }).then(res => {
            console.log('res: '+ JSON.stringify(res))
        }).catch(err => {
            console.log('err: '+ JSON.stringify(err))
        })
    }

    // 查找 token 信息
    async findToken(access_token){
        let tokenInfo = await this.ctx.model.SystemToken.findOne({
            where: {
                access_token
            }
        })
        return tokenInfo
    }



}

module.exports = UserService;
