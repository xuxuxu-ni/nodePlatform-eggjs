<template>
  <div>
    <el-table
      :data="articletData"
      style="width: 100%"
      max-height="550">
      <el-table-column
        fixed
        prop="createdAt"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="commentNum"
        label="评论数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="praiseNum"
        label="点赞数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="150">
      </el-table-column>
      <el-table-column
        prop="readNum"
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
      @current-change="currentChange"
      @prev-click="currentChange"
      @next-click="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'articleList',
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
      this.$router.push({path: '/addArticleEditor?articleId=' + row.id});
    },
    handleDelete (index, row) {
      console.log(index, row)
      let that = this
      this.$axios.post('/article/delArticle', {
        id: row.id
      })
        .then(response => {
          console.log(response)
            that.$message({
              showClose: true,
              message: response.data.message,
              type: 'success'
            })
            that.getList({
                currentPage: that.currentPage,
                pageSize:10,
                sort: null
              })
        })
        .catch(err => {
          console.log(err)
        })
    },
    currentChange(page){
      console.log(page);
      this.currentPage = page
      this.getList({
        currentPage: page,
        pageSize:10,
        sort: null
      })
    },
    getList (postdata) {
      let that = this
      this.$axios.post('/article/articleList', postdata)
        .then(function (response) {
          for (let i = 0; i < response.data.rows.length; i++) {
            let d = new Date(response.data.rows[i].createdAt)
            let moth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
            let date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
            let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
            let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
            let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
            response.data.rows[i].createdAt = d.getFullYear() + '-' + moth + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds

            if ( response.data.rows[i].title.length> 22) {
              response.data.rows[i].title = response.data.rows[i].title.substring(0, 22)+'...'
            }
          }
          console.log(response)
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
      pageSize:10,
      sort: null
    })
  }
}
</script>

<style scoped>

</style>
