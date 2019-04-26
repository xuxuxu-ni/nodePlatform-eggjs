/**
 * Created by WebStorm.
 * User: Administrator
 * Date: 2019/4/26
 * Description: 文件描述
 */
const Service = require('egg/index').Service;
const {cryptoMd5} = require('../../extend/helper');

class RoleService extends Service {
    async addRole(options){
        let {ctx} = this
        let {name, describe, status} = options
        let results = ''
        await this.ctx.model.SystemRole.findOne({
            where: {
                name//查询条件
            }
        }).then(async result=> {
            if (!result) {
                await ctx.model.SystemRole.create(options).then(ok => {
                    results = {
                        code: 200,
                        message: '角色添加成功'
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
                    message: '该角色已存在'
                }
            }
        })

        return results
    }

    // 获取角色列表
    async getRoleList() {
        let {ctx} = this
        let result
        await this.ctx.model.SystemRole.findAndCountAll().then(async res => {
            console.log(res);
            result = res
        }).catch(err => {
            console.log(err);
        })
        return result
    }
}
module.exports = RoleService

