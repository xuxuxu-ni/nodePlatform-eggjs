/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-01
 * Description: 文件描述
 */

const Controller = require("egg").Controller

class GetShareInfoController extends Controller {
  async decryptData (ctx) {
    const { appID, openid, resData } = ctx.request.body
    const { encryptedData, iv } = resData

    await this.app.model.SystemUser.findOne({
      where: {
        openid,
      },
    }).then(async result => {
      console.log(result) // 空时为null
      ctx.body = await ctx.helper.WXBizDataCrypt(appID, result.session_key, encryptedData, iv)
    })


  }
}

module.exports = GetShareInfoController
