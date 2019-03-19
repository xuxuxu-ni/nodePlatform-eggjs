/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-18
 * Description: 文件描述
 */
const Service = require('egg').Service

class articleService extends Service {
    async seaveOrUpArticle (data){
        let result = ''
        await this.ctx.model.Article.upsert(data).then( res => {
            console.log(res);
            result = true
        }).catch(err=>{
            console.log(err);
            result = false
        })

        return result
    }
}

module.exports = articleService
