/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-17
 * Description: 文件描述
 */
const Controller = require('../core/base_controller');

class RegisterController extends Controller {
    async userRegister() {
        let regData = this.ctx.request.body
        if (!regData.name) {
            regData.name = regData.username
        }
        let newData = {}
        for (let item in regData) {
            if (item != 'checkPass') {
                newData[item] = regData[item]
            }
        }

        let results = await this.service.register.userRegister(newData)

        this.ctx.body =  results
    }

}

module.exports = RegisterController;
