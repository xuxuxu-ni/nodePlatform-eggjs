/**
 * Created by WebStorm.
 * User: Administrator
 * Date: 2019/4/26
 * Description: 文件描述
 */
const Service = require('egg/index').Service;

class RoleService extends Service {
    // 获取角色列表
    async getRoleList() {
        let {ctx} = this
        let result
        await this.ctx.model.SystemRole.findAndCountAll().then(async res => {
            result = res
            for (let i = 0; i < result.rows.length; i++) {
                if (result.rows[i].name === '超级管理员') {
                    result.rows[i].dataValues.disabled = true
                }
            }

        }).catch(err => {
            console.log(err);
        })
        return result
    }

    // 增加角色
    async addRole(options) {
        let {ctx} = this
        let {id = null, name, describe, status} = options
        let results = ''

        if (id) {
            await this.ctx.model.SystemRole.findById(id).then(async res => {
                if (res.name === '超级管理员') {
                    results = {
                        code: 10000,
                        message: '系统最高权限不可以修改'
                    }
                } else {
                    await ctx.model.SystemRole.update({
                        name,
                        describe,
                        status
                    }, {
                        where: {
                            id
                        }
                    }).then(res => {
                        results = {
                            code: 200,
                            message: '角色修改成功'
                        }
                    }).catch(err => {
                        results = {
                            code: 10000,
                            message: err
                        }
                    });
                }
            })
        } else {
            await this.ctx.model.SystemRole.findOne({
                where: {
                    name//查询条件
                }
            }).then(async result => {
                if (!result) {
                    await ctx.model.SystemRole.create(options).then(res => {
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
        }
        return results
    }

    // 删除角色
    async delRole(rid) {
        let results
        let {ctx} = this
        await this.ctx.model.SystemRole.findById(rid).then(async res => {
            console.log(res);
            if (res.name === '超级管理员') {
                results = {
                    code: 10000,
                    message: '系统最高权限不可以删除'
                }
            } else {
                await ctx.model.SystemRole.destroy({
                    where: {
                        id: res.id
                    }
                }).then(res => {
                    console.log(res);
                    if (res > 0) {
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
                }).catch(error => {
                    console.log(error);
                    results = {
                        code: 10000,
                        message: error
                    }
                })
            }
        })
        return results
    }

    // 分配角色权限
    async rolePermissions(options) {
        let {ctx} = this
        let {rid, selectPermission} = options
        let results = ''

        await this.ctx.model.SystemRole.update({
            permission: selectPermission.join(',')
        }, {
            where: {
                id: rid
            }
        }).then(async res => {
            console.log(res);
            results = {
                code: 200,
                message: '该角色权限分配成功'
            }
        }).catch(err => {
            results = {
                code: 10000,
                message: err
            }
        });

        return results
    }

}

module.exports = RoleService

