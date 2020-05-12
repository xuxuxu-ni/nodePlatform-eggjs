/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-03-18
 * Description: 文件描述
 */
const Service = require("egg").Service

class CommentService extends Service {
  // 发表评论
  async addComment (data) {
    let result = ""
    await this.ctx.model.Comment.create(data).then(async res => {
      console.log(res)
      // await ctx.model.Article.update({
      //     comment_num: +1
      // },{
      //     where: {
      //         id: res.article_id
      //     }
      // })
      result = true
    }).catch(err => {
      console.log(err)
      result = false
    })

    return result
  }

  // 回复评论
  async replyComment (data) {
    let result = ""
    await this.ctx.model.Reply.create(data).then(res => {
      console.log(res)
      result = true
    }).catch(err => {
      console.log(err)
      result = false
    })

    return result
  }

  // 评论列表
  async commentList (getListData) {
    let result = ""
    const { currentPage = 1, pageSize = 10 } = getListData
    await this.ctx.model.Comment.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (currentPage - 1),
    }).then(async res => {
      console.log(res)
      for (let i = 0; i < res.rows.length; i++) {
        await this.ctx.model.SystemUser.findById(res.rows[i].author_id).then(resUser => {
          res.rows[i].author_name = resUser.name
        }).catch(erruser => {
          console.log(erruser)
        })

        await this.ctx.model.Article.findById(res.rows[i].article_id).then(resArticle => {
          console.log(resArticle)
          res.rows[i].article_title = resArticle.title
        }).catch(erruser => {
          console.log(erruser)
        })
      }
      result = res
    }).catch(err => {
      console.log(err)
    })
    return result
  }

  // 删除评论
  async delComment (cId) {
    let results
    await this.ctx.model.Comment.destroy({
      where: {
        id: cId,
      },
    }).then(res => {
      console.log(res)
      if (res > 0) {
        results = {
          code: 200,
          message: "删除成功",
        }
      } else {
        results = {
          code: 10000,
          message: "删除失败",
        }
      }
    }).catch(error => {
      console.log(error)
      results = {
        code: 10000,
        message: error,
      }
    })
    return results
  }
}

module.exports = CommentService
