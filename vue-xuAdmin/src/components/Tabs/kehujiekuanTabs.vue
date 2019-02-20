<template>
    <div class="cardshadow kehujiekuanTabs">
      <el-tabs type="card">
        <el-tab-pane label="订单申请信息" >
          <div>
            <el-form :inline="true" :model="searchform" class="form-inline">
              <el-form-item label="姓名">
                <span>{{ orderdata.name }}</span>
              </el-form-item>
              <el-form-item label="手机号码">
                <span>{{ orderdata.phonenumber }}</span>
              </el-form-item>
              <el-form-item label="信用标签">
                <span>{{ orderdata.credit }}</span>
              </el-form-item>
              <el-form-item label="身份证号">
                <span>{{ orderdata.idnumber }}</span>
              </el-form-item>
              <el-form-item label="申请时间">
                <span>{{ orderdata.applytime }}</span>
              </el-form-item>
              <el-form-item label="借款金额">
                <span>{{ orderdata.borrowamount }}</span>
              </el-form-item>
              <el-form-item label="放款金额">
                <span>{{ orderdata.lendamount }}</span>
              </el-form-item>
              <el-form-item label="应还款金额">
                <span>{{ orderdata.payamount }}</span>
              </el-form-item>
              <el-form-item label="借款周期">
                <span>{{ orderdata.borrowtime }}</span>
              </el-form-item>
              <el-form-item label="利率">
                <span>{{ orderdata.interestrate }}</span>
              </el-form-item>
              <el-form-item label="应还款时间">
                <span>{{ orderdata.paytime }}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="客户基本信息" >客户基本信息</el-tab-pane>
        <el-tab-pane label="客户关系联系信息" >客户关系联系信息</el-tab-pane>
        <el-tab-pane label="工作认证信息" >工作认证信息</el-tab-pane>
        <el-tab-pane label="银行卡绑定信息" >银行卡绑定信息</el-tab-pane>
        <el-tab-pane label="客户手机通讯录" >客户手机通讯录</el-tab-pane>
        <el-tab-pane label="客户通话记录" >客户通话记录</el-tab-pane>
        <el-tab-pane label="借款记录" >借款记录</el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "kehujiekuanTabs",
      data() {
        return {
          orderdata: {
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
          }
        };
      }
    }
</script>

<style scoped>
.el-form-item{
  margin-right: 50px;
}
</style>
