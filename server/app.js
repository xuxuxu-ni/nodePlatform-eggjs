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
        let rid;
        await this.app.model.sync({ force: false}).then(async (res) => {
            console.log(chalk.green(`
\\\\ \\\\ \\\\ \\\\ \\\\ \\\\ \\\\ \\\\ || || || || || || // // // // // // // //
\\\\ \\\\ \\\\ \\\\ \\\\ \\\\ \\\\        _ooOoo_          // // // // // // //
\\\\ \\\\ \\\\ \\\\ \\\\ \\\\          o8888888o            // // // // // //
\\\\ \\\\ \\\\ \\\\ \\\\             88" . "88               // // // // //
\\\\ \\\\ \\\\ \\\\                (| -_- |)                  // // // //
\\\\ \\\\ \\\\                   O\\  =  /O                     // // //
\\\\ \\\\                   ____/\`---'\\____                     // //
\\\\                    .'  \\\\|     |//  \`.                      //
==                   /  \\\\|||  :  |||//  \\                     ==
==                  /  _||||| -:- |||||-  \\                    ==
==                  |   | \\\\\\  -  /// |   |                    ==
==                  | \\_|  ''\\---/''  |   |                    ==
==                  \\  .-\\__  \`-\`  ___/-. /                    ==
==                ___\`. .'  /--.--\\  \`. . ___                  ==
==              ."" '<  \`.___\\_<|>_/___.'  >'"".               ==
==            | | :  \`- \\\`.;\`\\ _ /\`;.\`/ - \` : | |              \\\\
//            \\  \\ \`-.   \\_ __\\ /__ _/   .-\` /  /              \\\\
//      ========\`-.____\`-.___\\_____/___.-\`____.-'========      \\\\
//                           \`=---='                           \\\\
// //   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  \\\\ \\\\
// // //      佛祖保佑      永无BUG      永不修改        \\\\ \\\\ \\\\
// // // // // // || || || || || || || || || || \\\\ \\\\ \\\\ \\\\ \\\\ \\\\
            `))

            await res.SystemRole.findOne({
                where: {
                    name: "超级管理员"//查询条件
                }
            }).then(async result=>{
                console.log(chalk.green("========== 系统表创建完成 =========="))
                console.log(chalk.green("系统最高权限角色检查..."))
                if(!result){
                    await res.SystemRole.create({
                        name: '超级管理员',
                        describe: '系统最高权限',
                        status: true
                    }).then( ok => {
                        rid = ok.id
                        console.log(chalk.green("系统默认最高权限角色生成成功:角色名 [")+ chalk.blue("超级管理员") + chalk.green("]"))
                    }).catch( err => {
                        console.log(chalk.red("========== 系统最高权限角色检查失败 =========="))
                        console.log(chalk.red(err))
                    });
                } else {
                    console.log(chalk.green("系统检查到已存在默认最高权限角色:角色名 [")+ chalk.blue("超级管理员") + chalk.green("]"))
                }
            })


            await res.SystemUser.findOne({
                where: {
                    username: "admin"//查询条件
                }
            }).then(async result=>{
                console.log(chalk.green("超级管理员账号检查..."))
                if(!result){
                    const password = await cryptoMd5("admin", keys)
                    await res.SystemUser.create({
                        username: "admin",
                        password: password,
                        name: "超级管理员",
                        roleId: rid
                    }).then( ok => {
                        console.log(chalk.green("系统默认超级管理员账号生成成功:用户名 [")+ chalk.blue("admin") + chalk.green("]  密码[")+ chalk.blue("admin")+chalk.green("]"))
                        console.log(chalk.green(`
###################################
****** 欢迎使用 nodePlatform ******
****** 系统启动完成,准备就绪... ***
###################################
                    `))
                    }).catch( err => {
                        console.log(chalk.red("========== 管理员账号检查失败 =========="))
                        console.log(chalk.red(err))
                        console.log(chalk.red(`
 * _ooOoo_
 * o8888888o
 * 88" . "88
 * (| -_- |)
 *  O\\ = /O
 * ___/\`---'\\____
 * .   ' \\\\| |// \`.
 * / \\\\||| : |||// \\
 * / _||||| -:- |||||- \\
 * | | \\\\\\ - /// | |
 * | \\_| ''\\---/'' | |
 * \\ .-\\__ \`-\` ___/-. /
 * ___\`. .' /--.--\\ \`. . __
 * ."" '< \`.___\\_<|>_/___.' >'"".
 * | | : \`- \\\`.;\`\\ _ /\`;.\`/ - \` : | |
 * \\ \\ \`-. \\_ __\\ /__ _/ .-\` / /
 * ======\`-.____\`-.___\\_____/___.-\`____.-'======
 * \`=---='
 *          .............................................
 *           佛曰：bug泛滥，我已瘫痪！
 
                        `))

                    });
                } else {
                    console.log(chalk.green("系统检查到已存在默认超级管理员:用户名 [")+ chalk.blue("admin") + chalk.green("]  密码[")+ chalk.blue("admin")+chalk.green("]"))
                    console.log(chalk.green(`
###################################
****** 欢迎使用 nodePlatform ******
****** 系统启动完成,准备就绪... ***
###################################
                    `))
                }
            })
        }).catch( err => {
            console.log(chalk.red("========== 系统表创建失败 =========="))
            console.log(chalk.red(err))
            console.log(chalk.red(`
 * _ooOoo_
 * o8888888o
 * 88" . "88
 * (| -_- |)
 *  O\\ = /O
 * ___/\`---'\\____
 * .   ' \\\\| |// \`.
 * / \\\\||| : |||// \\
 * / _||||| -:- |||||- \\
 * | | \\\\\\ - /// | |
 * | \\_| ''\\---/'' | |
 * \\ .-\\__ \`-\` ___/-. /
 * ___\`. .' /--.--\\ \`. . __
 * ."" '< \`.___\\_<|>_/___.' >'"".
 * | | : \`- \\\`.;\`\\ _ /\`;.\`/ - \` : | |
 * \\ \\ \`-. \\_ __\\ /__ _/ .-\` / /
 * ======\`-.____\`-.___\\_____/___.-\`____.-'======
 * \`=---='
 *          .............................................
 *           佛曰：bug泛滥，我已瘫痪！

                        `))
        });
    }

}

module.exports = AppBootHook;

