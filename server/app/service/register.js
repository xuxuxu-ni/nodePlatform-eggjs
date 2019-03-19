/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-17
 * Description: 文件描述
 */
const Service = require('egg').Service;
const {cryptoMd5} = require('../extend/helper');

class RegisterService extends Service {
    async userRegister(options){
        let {username, password} = options
        let keys = this.config.keys;
        let results = ''
        await this.ctx.model.User.findOne({
            where: {
                username//查询条件
            }
        }).then(async result=> {
            // console.log(result);
            if (!result) {
                const newPassword = await cryptoMd5(password, keys)
                await this.ctx.model.User.create({
                    username,
                    password: newPassword,
                    roleId: 0,
                    status: 1,
                }).then(ok => {
                    results = '注册成功'
                }).catch(err => {
                    results = err
                    console.log(chalk.red(err))
                });
            } else {
                results = '该账号已存在'
            }
        })

        return results
    }
}
module.exports = RegisterService
