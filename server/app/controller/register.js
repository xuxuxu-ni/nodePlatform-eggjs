/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-17
 * Description: 文件描述
 */
const Controller = require('../core/base_controller');

class RegisterController extends Controller {
    async userRegister() {
        let {username, password} = this.ctx.request.body
        let results = await this.service.register.userRegister({username, password})

        this.ctx.body = {
            code: 200,
            message: results
        }
    }
}

module.exports = RegisterController;
