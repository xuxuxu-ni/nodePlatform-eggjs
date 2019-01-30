/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const chalk = require('chalk');
const crypto = require('crypto')
const hash = crypto.createHash('md5');
class AppBootHook {
    constructor(app) {
        this.app = app;
    }

    async willReady() {
        await this.app.model.sync({ force: false }).then((res) => {
            res.User.findOne({
                where: {
                    username: "admin"//查询条件
                }
            }).then(result=>{
                console.log(chalk.green("========== 用户表创建完成 =========="))
                console.log(chalk.green("超级管理员账号检查..."))
                if(!result){
                    hash.update("admin");
                    const password = hash.digest("hex")
                    res.User.create({
                        username: "admin",
                        password: password,
                        name: "超级管理员",
                        roleId: 0,
                        status: 1,
                    }).then( ok => {
                        console.log(chalk.green("系统默认生成超级管理员:用户名 [")+ chalk.blue("admin") + chalk.green("]  密码[")+ chalk.blue("admin")+chalk.green("]"))
                    }).catch( err => {
                        console.red(chalk.red("========== 管理员账号检查失败 =========="))
                        console.red(chalk.red(err))

                    });
                } else {
                    console.log(chalk.green("系统检查到已存在默认超级管理员:用户名 [")+ chalk.blue("admin") + chalk.green("]  密码[")+ chalk.blue("admin")+chalk.green("]"))
                }
            })
        }).catch( err => {
            console.red(chalk.red("========== 用户表创建失败 =========="))
            console.red(chalk.red(err))
        });
    }

}

module.exports = AppBootHook;

