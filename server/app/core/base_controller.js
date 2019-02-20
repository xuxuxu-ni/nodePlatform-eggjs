/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-02-02
 * Description: 文件描述
 */
const { Controller } = require('egg');
class BaseController extends Controller {
    get user() {
        return this.ctx.session.user;
    }

    // success(options) {
    //     this.ctx.body = {
    //         code: options.code,
    //         message: options.message,
    //         data: options.data
    //     };
    // }
    //
    // notFound(msg) {
    //     msg = msg || 'not found';
    //     this.ctx.throw(404, msg);
    // }
}
module.exports = BaseController;
