<template>
  <div class="cardshadow departmentTable">
    <div>
      <el-form :inline="true" :model="searchform" class="search-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="searchform.name" size="small" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchform.phone" size="small" clearable placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="handlePeopleEdit">新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="身份证号">
              <span>{{ props.row.ID }}</span>
            </el-form-item>
            <el-form-item label="职位">
              <span>{{ props.row.position }}</span>
            </el-form-item>
            <el-form-item label="文化程度">
              <span>{{ props.row.degre }}</span>
            </el-form-item>
            <el-form-item label="出生日期">
              <span>{{ props.row.chushengdate }}</span>
            </el-form-item>
            <el-form-item label="工作日期">
              <span>{{ props.row.workdate }}</span>
            </el-form-item>
            <el-form-item label="政治面貌">
              <span>{{ props.row.political }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名"
        width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>工号: {{ scope.row.jobNumber }}</p>
            <p>办公电话: {{ scope.row.workphone }}</p>
            <p>手机: {{ scope.row.phone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        property="department"
        label="所属部门"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="80"
        :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"  >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.sex === '男' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.sex}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        property="unit"
        label="所属单位"
        width="120">
      </el-table-column>
      <el-table-column
        property="username"
        label="系统用户名"
        width="110">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handlePeopleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            @click="handleUserEdit(scope.$index, scope.row)">用户信息
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="Paging"
      layout="prev, pager, next"
      align="right"
      :total="1000">
    </el-pagination>
    <people-dialog-visible @peopleData="newPeopleData" :peopleRowData="peopleRowData"
                           :visible="peopleDialogVisible"></people-dialog-visible>
    <user-dialog-visible @userData="newUserData" :peopleRowData="peopleRowData" :visible="userDialogVisible"></user-dialog-visible>
  </div>
</template>

<script>
  import PeopleDialogVisible from "../Dialog/peopleDialogVisible";
  import UserDialogVisible from "../Dialog/userDialogVisible";

  export default {
    name: "departmentTable",
    components: {UserDialogVisible, PeopleDialogVisible},
    data() {
      return {
        peopleDialogVisible: false,
        userDialogVisible: false,
        peopleRowData: '',
        searchform: {
          name: '',
          phone: ''
        },
        tableData: [
          {
            name: '张三',
            sex: '男',
            ID: '320382100000006543',
            position: '前端开发',
            degre: '硕士',
            chushengdate: '1994年04月14日',
            workdate: '2018年12月1日',
            political: '党员',
            remark: '无',
            department: '财务部',
            unit: '浪花易借',
            username: '13913131313',
            phone: '18813912345',
            workphone: '18813912345',
            jobNumber: '10001'
          }, {
            name: '李四',
            sex: '男',
            ID: '320382100000006543',
            position: '安卓开发',
            degre: '博士',
            chushengdate: '1984年09月14日',
            workdate: '2018年10月1日',
            political: '党员',
            remark: '态度认真,工作负责,行为端正,优秀员工',
            department: '信息科',
            unit: '浪花易借',
            username: '13922222222',
            phone: '18888888888',
            workphone: '18813912345',
            jobNumber: '10002'
          }, {
            name: '王小虎',
            sex: '女',
            ID: '320382100000006543',
            position: '前端开发',
            degre: '硕士',
            chushengdate: '1994年04月14日',
            workdate: '2018年12月1日',
            political: '党员',
            remark: '无',
            department: '催收员',
            unit: '浪花易借',
            username: '13933333333',
            phone: '18899999999',
            workphone: '18813912345',
            jobNumber: '10001'
          }, {
            name: '张三',
            sex: '男',
            ID: '320382100000006543',
            position: '前端开发',
            degre: '硕士',
            chushengdate: '1994年04月14日',
            workdate: '2018年12月1日',
            political: '党员',
            remark: '无',
            department: '财务部',
            unit: '浪花易借',
            username: '13913131313',
            phone: '18813912345',
            workphone: '18813912345',
            jobNumber: '10001'
          }, {
            name: '李四',
            sex: '女',
            ID: '320382100000006543',
            position: 'ios开发',
            degre: '博士',
            chushengdate: '1994年04月14日',
            workdate: '2018年12月1日',
            political: '党员',
            remark: '态度认真,工作负责,行为端正,优秀员工',
            department: '信息科',
            unit: '浪花易借',
            username: '13922222222',
            phone: '18888888888',
            workphone: '18813912345',
            jobNumber: '10001'
          }, {
            name: '王小虎',
            sex: '男',
            ID: '320382100000006543',
            position: '安卓开发',
            degre: '硕士',
            chushengdate: '1994年04月14日',
            workdate: '2018年12月1日',
            political: '群众',
            remark: '态度认真,工作负责,行为端正,优秀员工',
            department: '催收员',
            unit: '浪花易借',
            username: '13933333333',
            phone: '18899999999',
            workphone: '18813912345',
            jobNumber: '10001'
          }, {
            name: '张三',
            sex: '男',
            ID: '320382100000006543',
            position: '前端开发',
            degre: '硕士',
            chushengdate: '1994年04月14日',
            workdate: '2018年12月1日',
            political: '党员',
            remark: '态度认真,工作负责,行为端正,优秀员工',
            department: '财务部',
            unit: '浪花易借',
            username: '13913131313',
            phone: '18813912345',
            workphone: '18813912345',
            jobNumber: '10001'
          }, {
            name: '李四',
            sex: '女',
            ID: '320382100000006543',
            position: 'java开发',
            degre: '博士',
            chushengdate: '1974年04月14日',
            workdate: '2016年12月1日',
            political: '党员',
            remark: '态度认真,工作负责,行为端正,优秀员工',
            department: '信息科',
            unit: '浪花易借',
            username: '13922222222',
            phone: '18888888888',
            workphone: '18813912345',
            jobNumber: '10001'
          }, {
            name: '王小虎',
            sex: '女',
            ID: '320382100000006543',
            position: 'java开发',
            degre: '大专',
            chushengdate: '1984年04月14日',
            workdate: '2017年12月1日',
            political: '团员',
            remark: '无',
            department: '催收员',
            unit: '浪花易借',
            username: '13933333333',
            phone: '18899999999',
            workphone: '18813912345',
            jobNumber: '10001'
          }, {
            name: '张三',
            sex: '男',
            ID: '320382100000006543',
            position: '前端开发',
            degre: '本科',
            chushengdate: '1984年04月14日',
            workdate: '2017年12月1日',
            political: '团员',
            remark: '无',
            department: '财务部',
            unit: '浪花易借',
            username: '13913131313',
            phone: '18813912345',
            workphone: '18813912345',
            jobNumber: '10001'
          }],
        currentRow: null,
        search: ''
      }
    },
    // watch: {
    //   peopleDialogVisible(newVal) {
    //     this.peopleDialogVisible = newVal
    //   }
    // },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handlePeopleEdit(index, row) {
        console.log(index, row);
        this.peopleDialogVisible = true
        this.peopleRowData = row
      },
      handleUserEdit(index, row) {
        console.log(index, row);
        this.userDialogVisible = true
        this.peopleRowData = row
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      filterTag(value, row) {
        return row.sex === value;
      },
      onSubmit() {
        console.log('submit!');
      },
      newPeopleData(data) {
        console.log(data);
        this.peopleDialogVisible = false
      },
      newUserData() {
        this.userDialogVisible = false
      }
    }
  }
</script>

<style>
  .search-form-inline {
    border-bottom: 1px solid #dddddd;
  }

  .search-form-inline .el-form-item {
    margin-bottom: 0px;
  }

  .Paging {
    margin-top: 10px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf !important;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
