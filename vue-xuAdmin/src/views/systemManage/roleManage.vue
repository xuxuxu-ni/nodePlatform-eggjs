<template>
  <div class="cardshadow roleListTable">
    <div>
      <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="addRole" plain v-role-btn="'btn_100002'">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        property="name"
        label="角色名">
      </el-table-column>
      <el-table-column
        property="describe"
        label="角色描述">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="scope.row.name=='超级管理员'"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            :disabled="scope.row.name=='超级管理员'"
            @click="roleEdit(scope.$index, scope.row)">权限分配
          </el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.name=='超级管理员'"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色信息" width="700px" class="dialog1" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    maxlength="8"
                    show-word-limit
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.describe"
                    maxlength="15"
                    show-word-limit
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否开启" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="addRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限分配" class="dialog2" @opened="setRoleData" :visible.sync="dialogFormVisible2">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText"
        style="margin-bottom: 20px"
      >
      </el-input>
      <el-tree
        :data="roleTree"
        node-key="r_id"
        show-checkbox
        check-on-click-node
        default-expand-all
        check-strictly
        :expand-on-click-node="false"
        ref="permission"
        :filter-node-method="filterNode"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="rolePermissionSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "../../vuex"
import router from "../../router"

export default {
  name: "roleManage",
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: "",
        describe: "",
        status: true,
        permission: []
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "r_name",
        id: "r_id"
      },
      selectRoleId: "",
      selectData: [],
      filterText: ""
    }
  },
  methods: {
    handleEdit (index, row) {
      for (let item in row) {
        this.form[item] = row[item]
      }
      this.form.status = row.status === "启用"
      this.dialogFormVisible = true
    },
    addRole () {
      this.form = {
        name: "",
        describe: "",
        status: true
      }
      this.dialogFormVisible = true
    },
    addRoleSubmit () {
      let that = this
      if (!this.form.name) {
        that.$message({
          showClose: true,
          message: "角色名称不能为空",
          type: "error"
        })
        return false
      }
      this.$request.fetchAddRole(this.form).then((res) => {
        that.$message({
          showClose: true,
          message: res.data.message,
          type: "success"
        })
        this.dialogFormVisible = false
        this.getList()
      }).catch((err) => {
        console.log(err)
      })
    },
    rolePermissionSubmit () {
      let that = this
      let rolePermissionData = {
        selectPermission: that.$refs.permission.getCheckedKeys(),
        rid: that.selectRoleId
      }
      this.$request.fetchRolePermissions(rolePermissionData).then(res => {
        that.$restBack(res.data, () => {
          that.dialogFormVisible2 = false
          that.getList()
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    roleEdit (index, row) {
      console.log(index, row)
      this.selectRoleId = row.id
      this.selectData = row.permission ? row.permission.split(",") : []
      this.dialogFormVisible2 = true
    },
    setRoleData () {
      this.$request.fetchSearchRolePermissions({rid: this.selectRoleId}).then(res => {
        this.$refs.permission.setCheckedKeys([])
        let permissionData = res.data.data.permissionPage + "," + res.data.data.permissionButton
        this.$refs.permission.setCheckedKeys(permissionData.split(","))
      })
    },
    handleDelete (index, row) {
      let that = this
      this.$request.fetchDelRole({
        id: row.id
      })
        .then(response => {
          console.log(response)
          that.$message({
            showClose: true,
            message: response.data.message,
            type: "success"
          })
          that.getList()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getList () {
      let that = this
      this.$request.fetchGetRoleList()
        .then(function (response) {
          console.log(response)
          for (let i = 0; i < response.data.rows.length; i++) {
            if (response.data.rows[i].status) {
              response.data.rows[i].status = "启用"
            } else {
              response.data.rows[i].status = "禁用"
            }
          }
          that.tableData = response.data.rows
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.r_name.indexOf(value) !== -1
    }
  },
  watch: {
    filterText (val) {
      this.$refs.permission.filter(val)
    }
  },
  computed: {
    roleTree: function () {
      let roleData = this.$store.getters.roleData
      for (let i = 0; i < roleData.length; i++) {
        if (roleData[i].redirect === "/404") {
          roleData.splice(i, 1)
        }
      }
      return roleData
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>
  .nameinput {
    width: 150px;
  }

  .phoneinput {
    width: 120px;
  }

  .datepicker {
    width: 260px;
  }
  .dialog1 .el-dialog {
    width: 35%;
  }

  .dialog1 .el-dialog .el-form {
    width: 500px;
    margin: 0 auto;
  }

  .el-form-item__content {
    margin-left: 120px;
    width: 300px;
  }

</style>

