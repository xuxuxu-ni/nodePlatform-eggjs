/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-02-08
 * Description: 文件描述
 */
module.exports = ( options, app) => {
    return async function (ctx, next) {
        if (ctx.request.url !== "/login"){
            let ver = await ctx.helper.verifyToken(ctx, app);
            if (ver){
                await next();
            }
        } else {
            await next();
        }

    }
}
