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

    // 生成 token 保存数据库
    async saveToken(uid, access_token, refresh_token) {
        await this.app.model.Token.upsert({
            uid,
            access_token,
            refresh_token,
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
