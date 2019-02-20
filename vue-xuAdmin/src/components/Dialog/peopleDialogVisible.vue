<template>
  <div class="peopleDialogVisible">
    <el-dialog title="人员信息" :visible.sync="dialogVisible" @close="peopleData">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <div class="formitembox">
          <el-form-item label="部门" class="left">
            <el-select v-model="form.department" placeholder="部门">
              <el-option label="财务部" value="shanghai"></el-option>
              <el-option label="信息部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工号" class="right">
            <el-input v-model="form.jobNumber" placeholder="工号"></el-input>
          </el-form-item>
        </div>
        <div class="formitembox">
          <el-form-item label="姓名" class="left">
            <el-input v-model="form.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" class="right">
            <el-select v-model="form.sex" placeholder="性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formitembox">
          <el-form-item label="手机号" class="left">
            <el-input v-model="form.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="办公电话" class="right">
            <el-input v-model="form.workphone" placeholder="办公电话"></el-input>
          </el-form-item>
        </div>
        <div class="formitembox">
          <el-form-item label="身份证" class="left">
            <el-input v-model="form.ID" placeholder="身份证"></el-input>
          </el-form-item>
          <el-form-item label="职位" class="right">
            <el-input v-model="form.position" placeholder="职位"></el-input>
          </el-form-item>
        </div>
        <div class="formitembox">
          <el-form-item label="文化程度" class="left">
            <el-select v-model="form.degre" placeholder="文化程度">
              <el-option label="大专" value="shanghai"></el-option>
              <el-option label="本科" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" class="right">
            <el-date-picker
              v-model="form.chushengdate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="formitembox">
          <el-form-item label="工作日期" class="left">
            <el-date-picker
              v-model="form.workdate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="政治面貌" class="right">
            <el-select v-model="form.political" placeholder="政治面貌">
              <el-option label="团员" value="shanghai"></el-option>
              <el-option label="党员" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formitembox">
          <el-form-item label="备注" class="textarea">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="peopleData">取 消</el-button>
        <el-button type="primary" @click="peopleData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "peopleDialogVisible",
    data() {
      return {
        dialogVisible: this.visible,
        form: {
          name: '',
          sex: '1',
          ID: '',
          position: '',
          degre: '',
          chushengdate: '',
          workdate: '',
          political: '',
          remark: '',
          department: '',
          unit: '',
          username: '',
          phone: '',
          jobNumber: '10001'
        },
        formLabelWidth: '120px'
      }
    },
    props: ['peopleRowData', 'visible'],
    watch: {
      visible(newVal) {
        console.log(newVal);
        this.dialogVisible = newVal
      }
    },
    methods: {
      peopleData() {
        this.dialogVisible = false
        this.$emit('peopleData', this.form)
      }
    },
    mounted() {
      console.log(this.dialogVisible)
    }
  }
</script>

<style scoped>
  .el-input, .el-select {
    width: 194px;
  }

  .formitembox {
    width: 630px;
    margin-left: auto;
    margin-right: auto;
  }

  .textarea {
    width: 590px;
    text-align: right;
  }

  .textarea .el-textarea {
    width: 509px;
  }

  .left {
    width: 275px;
    margin-right: 36px;
    text-align: right;
  }

  .right {
    width: 275px;
    text-align: right;
  }
</style>
