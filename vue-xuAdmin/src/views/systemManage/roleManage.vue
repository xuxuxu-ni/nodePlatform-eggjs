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
            disable-transitions>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="roleEdit(scope.$index, scope.row)">权限分配</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色信息" class="dialog1" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.describe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否开启" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限分配" class="dialog2" :visible.sync="dialogFormVisible2">
      <el-tree
        :data="$store.getters.addRouters"
        show-checkbox
        node-key="id"
        :props="defaultProps">
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import RoleTable from "./roleTable";
  export default {
    name: "roleManage",
    components: {RoleTable},
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
        form: {
          name: '',
          describe: '',
          status: true
        },
        formLabelWidth: '120px',
        defaultProps:{
          children: 'children',
          label: 'r_name',
          id: 'path'
        }
      };
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible = true
        let formData = {
          name:row.name,
          describe: row.describe,
          status: row.status
        }
        for (let item in formData){
          this.form[item] = formData[item]
        }
        this.form.status = row.status === "启用" ? true : false
      },
      addRole() {
        this.form = {
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
      }
    }
  }
</script>

<style scoped>
  .nameinput{
    width: 150px;
  }
  .phoneinput{
    width: 120px;
  }
  .datepicker{
    width: 260px;
  }

</style>
<style>
  .dialog1 .el-dialog{
    width: 35%;
  }
  .dialog1 .el-dialog .el-form{
    width: 500px;
    margin: 0 auto;
  }
  .el-form-item__content{
    margin-left: 120px;
    width: 300px;
  }

</style>

