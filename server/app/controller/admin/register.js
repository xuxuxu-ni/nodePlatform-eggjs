/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-17
 * Description: 文件描述
 */
const Controller = require('../../core/base_controller');

class RegisterController extends Controller {
    // 用户注册
    async userRegister() {
        let regData = this.ctx.request.body
        if (!regData.name) {
            // 如果真实名字为空,默认使用用户名
            regData.name = regData.username
        }

        let results = await this.service.admin.register.userRegister(regData)

        this.ctx.body =  results
    }

}

module.exports = RegisterController;
