/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-18
 * Description: 文件描述
 */
const Service = require('egg').Service

class CommentService extends Service {
    // 发表评论
    async addComment(data) {
        let result = ''
        await this.ctx.model.Comment.create(data).then(res => {
            console.log(res);
            result = true
        }).catch(err => {
            console.log(err);
            result = false
        })

        return result
    }

    // 回复评论
    async replyComment(data) {
        let result = ''
        await this.ctx.model.Reply.create(data).then(res => {
            console.log(res);
            result = true
        }).catch(err => {
            console.log(err);
            result = false
        })

        return result
    }
}

module.exports = CommentService
