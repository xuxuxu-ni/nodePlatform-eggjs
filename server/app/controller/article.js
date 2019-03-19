/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-18
 * Description: 文件描述
 */
const Controller = require('../core/base_controller');


class ArticleController extends Controller {
    // 发表文章
    async addArticle() {
        let result = {}
        let articleData = this.ctx.request.body
        // articleData.id = articleData.id ? articleData.id: null
        articleData.author = this.ctx.session.user.id
        let articleResult = await this.ctx.service.article.seaveOrUpArticle(articleData)
        if (articleResult) {
            result = {
                code: 200,
                message: "文章发布成功"
            }
        } else {
            result = {
                code: 10000,
                message: "文章发布失败,请重试"
            }
        }
        this.ctx.body = result
    }

    async uploadImg() {
        let imgurl = await this.ctx.helper.uploadImg()
        console.log(this.ctx.request.header.host);

        this.ctx.body = {errno: 0, data: [imgurl]}
    }

}

module.exports = ArticleController
