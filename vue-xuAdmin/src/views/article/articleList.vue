<template>
  <div>
    <el-table
      :data="articletData">
      <el-table-column
        fixed
        prop="created_at"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="comment_num"
        label="评论数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="praise_num"
        label="点赞数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="150">
      </el-table-column>
      <el-table-column
        prop="read_num"
        label="浏览数"
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :hide-on-single-page="true"
      @current-change="currentChange"
      @prev-click="currentChange"
      @next-click="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "articleList",
  data () {
    return {
      total: 0,
      currentPage: 1,
      sort: null,
      articletData: []
    }
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push({
        path: "/addArticleEditor",
        query: {
          articleId: row.id
        }
      })
    },
    handleDelete (index, row) {
      console.log(index, row)
      let that = this
      this.$request.fetchDelArticle({
        id: row.id
      }).then(response => {
        console.log(response)
        that.$message({
          showClose: true,
          message: response.data.message,
          type: "success"
        })
        that.getList({
          currentPage: that.currentPage,
          pageSize: 10,
          sort: null
        })
      })
        .catch(err => {
          console.log(err)
        })
    },
    currentChange (page) {
      console.log(page)
      this.currentPage = page
      this.getList({
        currentPage: page,
        pageSize: 10,
        sort: null
      })
    },
    getList (postdata) {
      let that = this
      this.$request.fetchArticleList(postdata)
        .then(function (response) {
          for (let i = 0; i < response.data.rows.length; i++) {
            response.data.rows[i].created_at = that.$getDateDiff(response.data.rows[i].created_at)
            if (response.data.rows[i].title.length > 22) {
              response.data.rows[i].title = response.data.rows[i].title.substring(0, 22) + "..."
            }
          }
          that.total = response.data.count
          that.articletData = response.data.rows
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getList({
      currentPage: 1,
      pageSize: 10,
      sort: null
    })
  }
}
</script>

<style scoped>

</style>
