/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-17
 * Description: 文件描述
 */
const Service = require('egg/index').Service;
const {cryptoMd5} = require('../../extend/helper');

class RegisterService extends Service {
    async userRegister(options){
        let {ctx} = this
        let {username, password} = options
        let keys = this.config.keys;
        let results = ''
        await this.ctx.model.SystemUser.findOne({
            where: {
                username//查询条件
            }
        }).then(async result=> {
            if (!result) {
                options.password = await cryptoMd5(password, keys)
                await ctx.model.SystemUser.create(options).then(ok => {
                    results = {
                        code: 200,
                        message: '注册成功'
                    }
                }).catch(err => {
                    results = {
                        code: 10000,
                        message: err
                    }
                });
            } else {
                results = {
                    code: 10000,
                    message: '该账号已存在'
                }
            }
        })

        return results
    }
}
module.exports = RegisterService
