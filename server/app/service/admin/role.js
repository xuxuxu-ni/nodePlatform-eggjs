/**
 * Created by WebStorm.
 * User: Administrator
 * Date: 2019/4/26
 * Description: 文件描述
 */
const Service = require("egg/index").Service

class RoleService extends Service {
  // 获取角色列表
  async getRoleList () {
    const { ctx } = this
    let result = {}
    await ctx.model.SystemRole.findAndCountAll().then(async res => {
      result = res
      for (let i = 0; i < result.rows.length; i++) {
        if (result.rows[i].name === "超级管理员") {
          result.rows[i].dataValues.disabled = true
        }
      }

    }).catch(err => {
      console.log(err)
    })
    return result
  }

  // 增加角色
  async addRole (options) {
    const { ctx } = this
    const { id = null, name, describe, status } = options
    let results = {}

    if (id) {
      await ctx.model.SystemRole.findById(id).then(async res => {
        if (res.name === "超级管理员") {
          results = {
            code: 10000,
            message: "系统最高权限不可以修改",
          }
        } else {
          await ctx.model.SystemRole.update({
            name,
            describe,
            status,
          }, {
            where: {
              id,
            },
          }).then(res => {
            if (res > 0) {
              results = {
                code: 200,
                message: "角色修改成功",
              }
            }
          }).catch(err => {
            results = {
              code: 10000,
              message: err,
            }
          })
        }
      })
    } else {
      await ctx.model.SystemRole.findOne({
        where: {
          name, // 查询条件
        },
      }).then(async result => {
        if (!result) {
          await ctx.model.SystemRole.create(options).then(async res => {
            await ctx.model.SystemRolePermission.create({
              role_id: res.id
            }).then(() => {
              results = {
                code: 200,
                message: "角色添加成功",
              }
            }).catch(err => {
              results = {
                code: 10000,
                message: err,
              }
            })
          }).catch(err => {
            results = {
              code: 10000,
              message: err,
            }
          })
        } else {
          results = {
            code: 10000,
            message: "该角色已存在",
          }
        }
      })
    }
    return results
  }

  // 删除角色
  async delRole (rid) {
    let results = {}
    const { ctx } = this
    await ctx.model.SystemRole.findById(rid).then(async res => {
      if (res.name === "超级管理员") {
        results = {
          code: 10000,
          message: "系统最高权限不可以删除",
        }
      } else {
        await ctx.model.SystemRole.destroy({
          where: {
            id: rid,
          },
        }).then(async res => {
          if (res > 0) {
            await ctx.model.SystemRolePermission.destroy({
              where: {
                role_id: rid,
              }
            }).then(() => {
              if (res > 0) {
                results = {
                  code: 200,
                  message: "删除成功",
                }
              }
            })
          } else {
            results = {
              code: 10000,
              message: "删除失败",
            }
          }
        }).catch(error => {
          console.log(error)
          results = {
            code: 10000,
            message: error,
          }
        })
      }
    })
    return results
  }

  // 分配角色权限
  async rolePermissions (options) {
    const { ctx } = this
    const { rid, selectPermission } = options
    const permissionPage = []
    const permissionButton = []
    for (let i = 0; i < selectPermission.length; i++) {
      if (selectPermission[i].toString().includes("btn")) {
        permissionButton.push(selectPermission[i])
      } else {
        permissionPage.push(selectPermission[i])
      }
    }
    let results = ""
    await ctx.model.SystemRolePermission.update({
      permission_page: permissionPage.join(","),
      permission_button: permissionButton.join(","),
    }, {
      where: {
        role_id: rid,
      },
    })
      .then(async res => {
        console.log(res)
        results = {
          code: 200,
          message: "该角色权限分配成功",
        }
      })
      .catch(err => {
        results = {
          code: 10000,
          message: err,
        }
      })
    return results
  }

  // 获取角色所拥有的权限
  async searchRolePermissions (rid) {
    const { ctx } = this
    let results = {}
    await ctx.model.SystemRolePermission.findOne({
      where: {
        role_id: rid,
      }
    })
      .then(async res => {
        console.log(res)
        results = {
          code: 200,
          message: "",
          data: {
            permissionPage: res.permission_page,
            permissionButton: res.permission_button,
          },
        }
      })
      .catch(err => {
        console.log(err)
      })
    return results
  }
}

module.exports = RoleService

