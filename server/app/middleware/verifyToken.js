/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-02-08
 * Description: 文件描述
 */
module.exports = () => {
    return async function (ctx, next) {
        let ver = await ctx.helper.verifyToken();
        if (ver) {
            await next();
        }
    }
}
