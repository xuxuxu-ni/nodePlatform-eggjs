/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const chalk = require('chalk');
const {cryptoMd5} = require('./app/extend/helper');
class AppBootHook {
    constructor(app) {
        this.app = app;
    }

    async willReady() {
        let keys = this.app.config.keys;
        await this.app.model.sync({ force: true}).then((res) => {
            res.User.findOne({
                where: {
                    username: "admin"//查询条件
                }
            }).then(async result=>{
                console.log(chalk.green("========== 用户表创建完成 =========="))
                console.log(chalk.green("超级管理员账号检查..."))
                if(!result){
                    const password = await cryptoMd5("admin", keys)
                    await res.User.create({
                        username: "admin",
                        password: password,
                        name: "超级管理员",
                        roleId: 0,
                        status: 1,
                    }).then( ok => {
                        console.log(chalk.green("系统默认生成超级管理员:用户名 [")+ chalk.blue("admin") + chalk.green("]  密码[")+ chalk.blue("admin")+chalk.green("]"))
                    }).catch( err => {
                        console.log(chalk.red("========== 管理员账号检查失败 =========="))
                        console.log(chalk.red(err))

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

