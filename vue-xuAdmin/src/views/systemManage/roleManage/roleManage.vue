<template>
  <div class="cardshadow roleListTable">
    <div>
      <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="addRole">新增</el-button>
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
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            @click="roleEdit(scope.$index, scope.row)">权限分配
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-role :dialogVisible="dialogFormVisible" :form="formData"></add-role>
    <role-allocate :dialogVisible="dialogFormVisible2" :roleTree="roleTree" ></role-allocate>
  </div>
</template>

<script>
  import RoleTable from "../roleTable";
  import AddRole from "./addRole";
  import RoleAllocate from "./roleAllocate";

  export default {
    name: "roleManage",
    components: {RoleAllocate, AddRole, RoleTable},
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          describe: '上海市普陀区金沙江路 1518 弄',
          status: '禁用'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          describe: '上海市普陀区金沙江路 1517 弄',
          status: '禁用'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          describe: '上海市普陀区金沙江路 1519 弄',
          status: '启用'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          describe: '上海市普陀区金沙江路 1516 弄',
          status: '启用'
        }],
        dialogFormVisible: false,
        dialogFormVisible2: false,
        formData: {
          name: '',
          describe: '',
          status: true
        },

      };
    },
    methods: {
      handleEdit(index, row) {
        for (let item in row) {
          this.formData[item] = row[item]
        }
        this.formData.status = row.status === "启用" ? true : false
        this.dialogFormVisible = true
      },
      addRole() {
        this.formData = {
          name: '',
          describe: '',
          status: true
        }
        this.dialogFormVisible = true;
      },
      roleEdit(index, row) {
        console.log(index, row)
        this.dialogFormVisible2 = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      backFormData(start) {

        this.dialogFormVisible = start;
      }
    },
    computed: {
      roleTree: function () {
        let addRouters = this.$store.getters.addRouters
        for (let i = 0; i < addRouters.length; i++) {
          if (addRouters[i].redirect === '/404') {
            addRouters.splice(i, 1)
          }
        }
        return addRouters
      }
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

</style>
<style>
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

