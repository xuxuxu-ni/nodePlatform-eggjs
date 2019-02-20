<template>
  <div class="cardshadow manageTable">
    <div>
      <el-form :inline="true" :model="searchform" class="search-form-inline">
        <el-form-item label="描述">
          <el-input v-model="searchform.describe" size="small" clearable placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchform.type" size="small" placeholder="">
            <el-option label="管理" value="1"></el-option>
            <el-option label="技术" value="2"></el-option>
            <el-option label="临时" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="describe"
        label="角色描述"
        width="200">
      </el-table-column>
      <el-table-column
        property="type"
        label="角色类型"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      name: "manageTable",
      data() {
        return {
          searchform: {
            describe: '',
            type: ''
          },
          tableData: [{
            describe: '催收员',
            type: '临时'
          }, {
            describe: '催收专员A',
            type: '管理'
          }, {
            describe: '催收专员角色',
            type: '管理'
          }, {
            describe: '催收主管角色',
            type: '管理'
          }, {
            describe: '催收员角色',
            type: '技术'
          }, {
            describe: '信息管理员',
            type: '技术'
          }, {
            describe: '财务人员',
            type: '管理'
          }],
          currentRow: null
        }
      },
    }
</script>

<style scoped>

</style>
