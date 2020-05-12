<template>
  <div>
    <div class="cardshadow roleListTable">
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="addUserFn" plain>添加账号</el-button>
      </div>
    <el-table
      :data="userListData">
      <el-table-column
        fixed
        prop="created_at"
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
        prop="mobile_phone"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '启用' ? 'primary' : 'danger'"
            disable-transitions>{{scope.row.status}}
          </el-tag>
        </template>
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
      hide-on-single-page
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
      @prev-click="currentChange"
      @next-click="currentChange"
    >
    </el-pagination>
    </div>
    <user-info v-if="dialogVisible" :title="title" :dialogVisible="dialogVisible" :userId="userId" @successCallback="successCallback"/>
  </div>
</template>

<script>
import UserInfo from "../../components/userForm/userInfo"
export default {
  name: "articleList",
  components: { UserInfo },
  data () {
    return {
      total: 0,
      currentPage: 1,
      sort: null,
      userListData: [],
      dialogVisible: false,
      title: "",
      userId: ""
    }
  },
  methods: {
    addUserFn () {
      this.dialogVisible = true
      this.title = "添加账号"
      this.userId = ""
    },
    handleEdit (index, row) {
      this.dialogVisible = true
      this.title = "编辑信息"
      this.userId = row.id
    },
    successCallback () {
      this.dialogVisible = false
      this.getList()
    },
    handleDelete (index, row) {
      console.log(index, row)
      let that = this
      this.$request.fetchDelUser({
        id: row.id
      })
        .then(response => {
          that.$message({
            showClose: true,
            message: response.data.message,
            type: "success"
          })
          that.getList({
            currentPage: that.currentPage,
            pageSize: 10
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
        pageSize: 10
      })
    },
    getList (postdata = {
      currentPage: 1,
      pageSize: 10
    }) {
      let that = this
      this.$request.fetchUserList(postdata)
        .then(function (response) {
          for (let i = 0; i < response.data.rows.length; i++) {
            response.data.rows[i].created_at = that.$getDateDiff(response.data.rows[i].created_at)
            if (response.data.rows[i].status === "1") {
              response.data.rows[i].status = "启用"
            } else {
              response.data.rows[i].status = "禁用"
            }
          }
          that.total = response.data.count
          that.userListData = response.data.rows
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>

</style>
