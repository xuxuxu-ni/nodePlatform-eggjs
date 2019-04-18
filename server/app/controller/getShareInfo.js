/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-01
 * Description: 文件描述
 */
'use strict';

const Controller = require('egg').Controller;

class GetShareInfoController extends Controller {
    async decryptData(ctx) {
        let {appID, openid, resData} = this.ctx.request.body
        let { encryptedData, iv } = resData

        await this.app.model.SystemUser.findOne({
            where: {
                openid
            }
        }).then(async result=>{
            console.log(result) //空时为null
            let reqdata = await this.ctx.helper.WXBizDataCrypt(appID, result.session_key, encryptedData, iv)
            this.ctx.body = reqdata
        })



    }
}

module.exports = GetShareInfoController;
