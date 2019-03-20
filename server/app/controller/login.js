/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const Controller = require('../core/base_controller');
const {cryptoMd5} = require('../extend/helper');


class LoginController extends Controller {
    // 用户登录
    async userLogin() {
        let {username, password} = this.ctx.request.body
        let keys = this.config.keys;
        let results = '';
        let user = await this.ctx.service.login.findUsername(username)
        if (!user) {
            results = {
                code: 10000,
                message: "用户名不存在",
            };
        } else {
            let newPass = await cryptoMd5(password, keys)
            if (user.password !== newPass) {
                results = {
                    code: 10000,
                    message: "密码错误",
                }
            } else {
                let refresh_token = await this.ctx.helper.createToken({id: user.id}, "7", "days");
                let access_token = await this.ctx.helper.createToken({id: user.id}, "2", "hours");
                // console.log("token::"+access_token);
                let uid = user.id
                this.ctx.service.login.saveToken({uid, access_token, refresh_token})
                results = {
                    code: 200,
                    data: {
                        access_token
                    }
                }
            }

        }
        this.ctx.body =  results
    }

    // 登录查询个人信息
    async getUserInfor() {
        let token = await this.ctx.helper.getAccessToken()

        let result = {};
        await this.ctx.app.jwt.verify(token, this.ctx.app.config.jwt.secret, function(err, decoded) {
            if (err) {
                result.verify = false;
                result.message = err.message;
            } else {
                result.verify = true;
                result.message = decoded;
            }
        });

        let userInfo = await this.ctx.service.login.getUserInfor(result)
        this.ctx.session.user = userInfo;
        let role = ''
        if (userInfo.roleId == 0) {
            role = 'ordinary'
        } else if (userInfo.roleId == 1) {
            role = 'superAdmin'
        } else if (userInfo.roleId == 2) {
            role = 'admin'
        }

        this.ctx.body = {
            name: userInfo.name,
            role,
            avatar: userInfo.avatar,
            id: userInfo.id
        }

    }

    // 获取用户信息
    async getUserInforId() {
        let {id} = this.ctx.request.body
        let userInfo = await this.ctx.service.login.getUserInforId(id)

        this.ctx.body = userInfo

    }


    async wxLogin(){
        let {code, appID, secret} = this.ctx.request.body
        console.log(code, appID, secret);
        const result = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appID}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,{
            dataType: 'json',
        });
        console.log(result.data.session_key);
        await this.ctx.service.login.saveWXdata(result.data)
        // console.log(reqdata);
        this.ctx.body = result.data.openid
    }
}

module.exports = LoginController;
