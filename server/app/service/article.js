/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-18
 * Description: 文件描述
 */
const Service = require('egg').Service

class articleService extends Service {
    // 增加修改文章
    async seaveOrUpArticle(data) {
        let result = ''
        await this.ctx.model.Article.upsert(data).then(res => {
            console.log(res);
            result = true
        }).catch(err => {
            console.log(err);
            result = false
        })

        return result
    }

    // 查询文章列表
    async articleList(getListData) {
        let {ctx} = this
        let result
        let {currentPage = 1, pageSize = 10, sort} = getListData
        await this.ctx.model.Article.findAndCountAll({
            limit: pageSize,
            offset: pageSize * (currentPage - 1),
        }).then(async res => {
            console.log(res);
            for (let i = 0; i < res.rows.length; i ++) {
                await ctx.model.SystemUser.findById(res.rows[i].author).then(resUser=>{
                    res.rows[i].author = resUser.name
                }).catch(erruser=>{
                    console.log(erruser);
                })
            }
            result = res
        }).catch(err => {
            console.log(err);
        })
        return result
    }

    // 文章回显
    async getArticle(aId) {
        let result
        await this.ctx.model.Article.findById(aId).then(res=>{
            console.log(res);
            result = res
        }).catch(error => {
            console.log(error);
        })

        return result
    }

    // 删除文章
    async delArticle(aId) {
        let results
        await this.ctx.model.Article.destroy({
            where: {
                id: aId
            }
        }).then( res=>{
            console.log(res);
            if (res > 0){
                results = {
                    code: 200,
                    message: '删除成功'
                }
            } else {
                results = {
                    code: 10000,
                    message: '删除失败'
                }
            }
        }).catch( error=>{
            console.log(error);
            results = {
                code: 10000,
                message: error
            }
        })
        return results
    }
}

module.exports = articleService
