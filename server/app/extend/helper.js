/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-02-01
 * Description: 文件描述
 */
const crypto = require('crypto')

// 创建 Token
exports.createToken = ( data, expires, strTimer, app) => {
    return app.jwt.sign(data, app.config.jwt.secret, {
        expiresIn: expires + " " + strTimer
    });
}

// 获取 Token
exports.getAccessToken = ctx => {
    let bearerToken = ctx.request.header.authorization;
    return bearerToken && bearerToken.replace("Bearer", "");
};

// 校验 Token
exports.verifyToken = async ctx => {
    let app = ctx.app
    let backResult = false;
    let token = this.getAccessToken(ctx, app);
    let verify = await function(token, app){
        let result = {};
        app.jwt.verify(token, app.config.jwt.secret, function(err, decoded) {
            if (err) {
                result.verify = false;
                result.message = err.message;
            } else {
                result.verify = true;
                result.message = decoded;
            }
        });
        // console.log(result);
        return result
    }
    let verifyResult = verify (token, app)
    let tokenInfo = await ctx.service.login.findToken(token);

    if (!verifyResult.verify) {
        // 2小时的 token 验证失败了
            if (tokenInfo) {
                // 能查到对应的 refresh_token
                if ( !verify (tokenInfo.refresh_token, app).verify ){
                    // 2小时的 token 验证失败了并且7天的 token 验证也失败了
                    await this.error(ctx, 401, "token身份认证失效,请重新登录");
                } else {
                    // 2小时的 token 验证失败了,但是能查到对应的 refresh_token 并且在有效期内就重新生成新的 token
                    let refresh_token = await ctx.helper.createToken({ id: tokenInfo.uid }, "7", "days", app);
                    let access_token = await ctx.helper.createToken({ id: tokenInfo.uid }, "2", "hours", app);
                    await ctx.service.login.saveToken(tokenInfo.id, access_token, refresh_token)
                    backResult = true;
                }
            } else {
                // 2小时的 token 验证失败了并且查不到对应的 refresh_token
                await this.error(ctx, 401, "token身份认证失效,请重新登录");
            }

    } else {
        if (tokenInfo) {
            // 2小时的 token 验证通过了并且可以查到对应的 refresh_token
            backResult = true;
        } else {
            // 2小时的 token 验证通过了但是查不到对应的 refresh_token
            await this.error(ctx, 401, "该账号已在其他地方登陆,请重新登录");
        }
    }
    return backResult;
};

// MD5 对密码和秘钥进行混合双重加密
exports.cryptoMd5 = async function ( password, key){
    const hash1 = await crypto.createHash('md5').update(password).digest("hex")
    const hash2 = await crypto.createHash('md5').update(hash1 + key).digest("hex")
    return hash2
}

// 处理失败响应
exports.error = (ctx, code, message) => {
    ctx.body = {
        code: 200,
        message: message
    };
    ctx.status = code;
};


//  微信小程序 开放数据校验与解密
exports.WXBizDataCrypt = async (appId, sessionKey, encryptedData, iv) => {
        // base64 decode
        var sessionKey = new Buffer(sessionKey, 'base64')
        encryptedData = new Buffer(encryptedData, 'base64')
        iv = new Buffer(iv, 'base64')

        try {
            // 解密
            var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true)
            var decoded = decipher.update(encryptedData, 'binary', 'utf8')
            decoded += decipher.final('utf8')

            decoded = JSON.parse(decoded)

        } catch (err) {
            throw new Error('Illegal Buffer')
        }

        if (decoded.watermark.appid !== appId) {
            throw new Error('Illegal Buffer')
        }

        return decoded
}
