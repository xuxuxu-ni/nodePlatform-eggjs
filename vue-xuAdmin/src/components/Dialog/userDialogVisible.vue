<template>
  <div class="userDialogVisible">
    <el-dialog title="用户信息" :visible.sync="dialogVisible" @close="peopleData">
      <el-tabs type="border-card">
        <el-tab-pane label="角色分配">
          <div class="tabsconbox">
            <el-transfer
              filterable
              :filter-method="filterMethod"
              :titles="['用户未包含的角色', '用户已包含的角色']"
              filter-placeholder="请输入角色关键字"
              v-model="value2"
              :data="data2">
            </el-transfer>
          </div>
        </el-tab-pane>
        <el-tab-pane label="密码重置">
          <div class="tabsconbox">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" size="medium"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')" size="small">提交</el-button>
                <el-button @click="resetForm('ruleForm2')" size="small">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="账号设置">
          <div class="tabsconbox3">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item>
                <el-switch
                  style="display: block"
                  v-model="form.value"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  inactive-text="锁定账号">
                </el-switch>
              </el-form-item>
              <el-form-item>
                <el-switch
                  style="display: block"
                  v-model="form.value1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  inactive-text="账号过期">
                </el-switch>
                <el-date-picker
                  v-model="form.value2"
                  type="date"
                  placeholder="过期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-switch
                  style="display: block"
                  v-model="form.value3"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  inactive-text="密码过期">
                </el-switch>
                <el-date-picker
                  v-model="form.value4"
                  type="date"
                  placeholder="过期时间">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="peopleData">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "userDialogVisible",
    data() {
      const generateData2 = _ => {
        const data = [];
        const cities = ['信息管理员(技术)', '财务人员(管理)', '催收专员角色(管理)', '催收主管(管理)', '催收员角色(管理)', '催收员(临时)'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index
          });
        });
        return data;
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dialogVisible: this.visible,
        data2: generateData2(),
        value2: [],
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        },

        ruleForm2: {
          pass: '',
          checkPass: ''
        },
        form: {
          value: true,
          value1: true,
          value2: '',
          value3: true,
          value4: '',
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }

      };
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
        this.$emit('userData', this.form)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      console.log(this.dialogVisible)
    }
  }
</script>

<style scoped>
  .tabsconbox {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .tabsconbox3 {
    display: flex;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .tabsconbox .el-form {
    width: 390px;
  }

  .tabsconbox3 .el-switch {
    display: inline-block !important;
    margin-right: 20px;
  }

</style>
