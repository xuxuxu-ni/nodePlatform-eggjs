/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const Controller = require('../core/base_controller');

class LoginController extends Controller {
    async register() {
        this.ctx.body = {
            code: 200
        }
    }

    async userLogin() {
        let {username, password} = this.ctx.request.body
        let keys = this.app.config.keys;
        let user = await this.ctx.service.login.findUsername(username)

        if (!user) {
            this.ctx.body = {
                code: 10000,
                message: "用户名不存在",
            };
        } else {
            let newPass = await this.ctx.helper.cryptoMd5(password, keys)
            if (user.password !== newPass) {
                this.ctx.body = {
                    code: 10000,
                    message: "密码错误",
                }
            } else {
                let refresh_token = await this.ctx.helper.createToken({id: user.id}, "7", "days", this.app);
                let access_token = await this.ctx.helper.createToken({id: user.id}, "2", "hours", this.app);
                // console.log("token::"+access_token);

                this.ctx.service.login.saveToken(user.id, access_token, refresh_token)
                this.ctx.body = {
                    code: 200,
                    data: {
                        access_token
                    }
                }
            }

        }
    }
}

module.exports = LoginController;
