/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const crypto = require('crypto')
const Controller = require('egg').Controller;

class LoginController extends Controller {

    async register(options) {
        const hash = crypto.createHash('md5');
        hash.update(options.password);
        const password = obj.digest("hex")
        console.log("options" + options);
        // let {user} = options
    }
}

module.exports = LoginController;
