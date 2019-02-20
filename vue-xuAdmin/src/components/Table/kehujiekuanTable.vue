<template>
    <div class="cardshadow kehujiekuanTable">
      <div>
        <el-form :inline="true" :model="searchform" class="search-form-inline">
          <el-form-item label="客户姓名">
            <el-input v-model="searchform.name" size="small" class="nameinput"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="searchform.phone" size="small" class="phoneinput"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="searchform.idnumber" size="small" class="idnumberinput"></el-input>
          </el-form-item>
          <el-form-item label="申请日期">
            <el-date-picker
              v-model="value6"
              size="small"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="datepicker">
            </el-date-picker>
        </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="onSubmit">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        height="250"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        @current-change="handleCurrentChange">
        <el-table-column
          fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          fixed
          label="操作"
          width="135">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-check"
              circle
              @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"></el-button>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-message"
              circle
              @click="handleDelete(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phonenumber"
          label="手机号码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="credit"
          label="信用标签"
          width="100">
        </el-table-column>
        <el-table-column
          prop="idnumber"
          label="身份证号"
          width="170">
        </el-table-column>
        <el-table-column
          prop="applytime"
          label="申请时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="borrowamount"
          label="借款金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="lendamount"
          label="放款金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="payamount"
          label="还款金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="borrowtime"
          label="借款周期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="interestrate"
          label="利率"
          width="100">
        </el-table-column>
        <el-table-column
          prop="paytime"
          label="应还款时间"
          width="120">
        </el-table-column>
      </el-table>
      <el-pagination
        class="Paging"
        layout="prev, pager, next"
        align="right"
        :total="1000">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "kehujiekuanTable",
      data() {
        return {
          searchform: {
            number: '',
            date: '',
            name: ''
          },
          value6: '',
          tableData: [{
            name: '张三',
            phonenumber: '15888888888',
            credit: 'D级',
            idnumber: '321281198808088888',
            applytime: '2019-01-15 11:30:43',
            borrowamount: '10',
            lendamount: '8.5',
            payamount: '10.07',
            borrowtime: '7',
            interestrate: '0.001',
            paytime: '2019-01-21'
          }, {
            name: '张三',
            phonenumber: '15888888888',
            credit: 'D级',
            idnumber: '321281198808088888',
            applytime: '2019-01-15 11:30:43',
            borrowamount: '10',
            lendamount: '8.5',
            payamount: '10.07',
            borrowtime: '7',
            interestrate: '0.001',
            paytime: '2019-01-21'
          }, {
            name: '张三',
            phonenumber: '15888888888',
            credit: 'D级',
            idnumber: '321281198808088888',
            applytime: '2019-01-15 11:30:43',
            borrowamount: '10',
            lendamount: '8.5',
            payamount: '10.07',
            borrowtime: '7',
            interestrate: '0.001',
            paytime: '2019-01-21'
          }, {
            name: '张三',
            phonenumber: '15888888888',
            credit: 'D级',
            idnumber: '321281198808088888',
            applytime: '2019-01-15 11:30:43',
            borrowamount: '10',
            lendamount: '8.5',
            payamount: '10.07',
            borrowtime: '7',
            interestrate: '0.001',
            paytime: '2019-01-21'
          }, {
            name: '张三',
            phonenumber: '15888888888',
            credit: 'D级',
            idnumber: '321281198808088888',
            applytime: '2019-01-15 11:30:43',
            borrowamount: '10',
            lendamount: '8.5',
            payamount: '10.07',
            borrowtime: '7',
            interestrate: '0.001',
            paytime: '2019-01-21'
          }, {
            name: '张三',
            phonenumber: '15888888888',
            credit: 'D级',
            idnumber: '321281198808088888',
            applytime: '2019-01-15 11:30:43',
            borrowamount: '10',
            lendamount: '8.5',
            payamount: '10.07',
            borrowtime: '7',
            interestrate: '0.001',
            paytime: '2019-01-21'
          }, {
            name: '张三',
            phonenumber: '15888888888',
            credit: 'D级',
            idnumber: '321281198808088888',
            applytime: '2019-01-15 11:30:43',
            borrowamount: '10',
            lendamount: '8.5',
            payamount: '10.07',
            borrowtime: '7',
            interestrate: '0.001',
            paytime: '2019-01-21'
          }],
          currentRow: null
        };
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
