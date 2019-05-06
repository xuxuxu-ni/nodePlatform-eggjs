/**
 * Created by WebStorm.
 * User: Administrator
 * Date: 2019/5/5
 * Description: 对超级管理员进行操作的时候做权限校验
 */
module.exports = () => {
    return async function (ctx, next) {
        let tagRoleName, myRoleName, uid
        myRoleName = ctx.session.user.roleName
        uid = ctx.request.body.id
        await ctx.model.SystemUser.findById(uid).then(async res=>{
            await ctx.model.SystemRole.findById(res.roleId).then( response=>{
                tagRoleName = response.name
            })
        })
        if (tagRoleName == "超级管理员" &&  myRoleName != '超级管理员') {
            ctx.helper.error(200, 10000, "未获得此操作权限");
        }else {
            await next();
        }
    }
}
