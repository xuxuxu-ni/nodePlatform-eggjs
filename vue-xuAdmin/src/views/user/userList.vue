<template>
  <div>
    <el-table
      :data="userListData"
      style="width: 100%"
      max-height="550">
      <el-table-column
        fixed
        prop="createdAt"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="mobilePhone"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="roleId"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户状态">
      </el-table-column>
      <el-table-column
        label="操作">
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
      currentPage: 0,
      sort: null,
      userListData: []
    }
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push({path: '/editUser?userId=' + row.id});
    },
    handleDelete (index, row) {
      console.log(index, row)
      let that = this
      this.$axios.post('/user/delUser', {
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
      })
    },
    getList (postdata) {
      let that = this
      this.$axios.post('/user/userList', postdata)
        .then(function (response) {
          for (let i = 0; i < response.data.rows.length; i++) {
            let d = new Date(response.data.rows[i].createdAt)
            let moth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
            let date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
            let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
            let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
            let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
            response.data.rows[i].createdAt = d.getFullYear() + '-' + moth + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds

            if (response.data.rows[i].roleId == 0) {
              response.data.rows[i].roleId = '普通用户'
            } else if (response.data.rows[i].roleId == 1) {
              response.data.rows[i].roleId = '超级管理员'
            } else if (response.data.rows[i].roleId == 2) {
              response.data.rows[i].roleId = '管理员'
            }


          }
          console.log(response)
          that.total = response.data.count
          that.userListData = response.data.rows
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
    })
  }
}
</script>

<style scoped>

</style>
