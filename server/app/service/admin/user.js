/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-20
 * Description: 文件描述
 */
const Service = require('egg/index').Service;

class UserService extends Service {
    // 修改用户信息
    async editUserInfo(options) {
        let {id} = options
        options.status = options.status ? "1": "0"
        let results
        await this.ctx.model.SystemUser.update(options, {
            where: {
                id//查询条件
            }
        }).then(ok => {
            console.log(ok);
            results = {
                code: 200,
                message: '修改成功'
            }
        }).catch(err => {
            console.log(err);
            results = {
                code: 10000,
                message: err
            }
        });

        return results
    }

    // 获取用户列表
    async userList(getListData) {
        let result
        let {currentPage = 1, pageSize = 10} = getListData
        await this.ctx.model.SystemUser.findAndCountAll({
            limit: pageSize,
            offset: pageSize * (currentPage - 1),
        }).then(async res => {
            console.log(res);
            result = res
        }).catch(err => {
            console.log(err);
        })
        return result
    }

    // 删除用户
    async delUser(uid) {
        let results;

        await this.ctx.model.SystemUser.destroy({
            where: {
                id: uid
            }
        }).then( res=>{
            console.log(res);
            if (res > 0){
                results = {
                    code: 200,
                    message: '删除成功'
                }
            } else {
                results = {
                    code: 10000,
                    message: '删除失败'
                }
            }
        }).catch( error=>{
            console.log(error);
            results = {
                code: 10000,
                message: error
            }
        })
        return results
    }

    // 修改密码
    async editPassworld(id, pass) {
        let results
        await this.ctx.model.SystemUser.update({
            password: pass
        },{
            where:{
                id
            }
        }).then(res=>{
            console.log(res);
            if (res[0] > 0){
                results = {
                    code: 200,
                    message: '修改成功,请重新登录'
                }
            } else {
                results = {
                    code: 10000,
                    message: '修改失败,请重试'
                }
            }

        }).catch(err=>{
            console.log(err);
            results = {
                code: 10000,
                message: error
            }
        })

        return results
    }
}

module.exports = UserService
