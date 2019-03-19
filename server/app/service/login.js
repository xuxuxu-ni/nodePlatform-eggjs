/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-02-01
 * Description: 文件描述
 */
const Service = require('egg').Service;

class UserService extends Service {
    // 登录查询账号
    async findUsername(username) {
        let user = await this.app.model.User.findOne({
            where: {username}
        })
        return user;
    }

    // 查询用户信息
    async getUserInfor(info) {
        let userInfo = await this.app.model.User.findOne({
            where: {id: info.message.id}
        })

        return userInfo
    }

    // 生成 token 保存数据库
    async saveToken(data) {
        await this.app.model.Token.upsert(data)
    }

    // 生成 微信数据 保存数据库
    async saveWXdata(data) {
        console.log(this.app);
        let {session_key,openid} = data
        await this.app.model.WxUser.upsert({
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
        let tokenInfo = await this.app.model.Token.findOne({
            where: {
                access_token
            }
        })
        return tokenInfo
    }



}

module.exports = UserService;
