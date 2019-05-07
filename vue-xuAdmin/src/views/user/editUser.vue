<template>
  <div class="card">
    <p class="title"><i class="fa fa-th-large fa-lg"></i>个人资料</p>
    <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm2.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-if="roleName" v-model="ruleForm2.roleId" disabled  placeholder="请选择等级">
          <el-option
            v-for="item in roleData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-else v-model="ruleForm2.roleId"  placeholder="请选择等级">
          <el-option
            v-for="item in roleData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm2.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="ruleForm2.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="name">
        <el-input v-model="ruleForm2.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobilePhone">
        <el-input v-model="ruleForm2.mobilePhone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="ruleForm2.status"></el-switch>
      </el-form-item>
      <el-form-item label="头像上传">
        <el-upload
          class="avatar-uploader"
          action="/api/editor/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm2.avatar" :src="ruleForm2.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'addUser',
  data () {
    return {
      roleName: false,
      roleData: '',
      ruleForm2: {
        mobilePhone: '',
        username: '',
        roleId: '',
        status: '',
        sex: "1",
        age: 0,
        checkPass: '',
        name: '',
        avatar: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.ruleForm2.avatar = res.data[0];
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG || isPNG)) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return  isLt2M && isJPG || isPNG;
    },
    getList () {
      let that = this
      this.$axios.post('/permissions/getRoleList').then(function (response) {
          console.log(response)
          that.roleData = response.data.rows
          let id = that.$route.query.userId
          if (!id) {
            id = that.$store.getters.info.uid
          }
          that.$axios.post('/user/getUserInforId', {id})
            .then(function (res) {
              console.log(res)
              res.data.password = ''
              if (res.data.status === '1'){
                res.data.status = true
              } else {
                res.data.status = false
              }

              that.ruleForm2 = res.data
              that.roleName = true
              for (let i = 0; i < that.roleData.length; i++) {
                if (that.$store.getters.info.role === '超级管理员' && that.$store.getters.info.uid !== id ){
                  that.roleName = false
                }
              }
              return false
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitForm (formName) {
      let that = this
      console.log(that.ruleForm2);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/editUserInfo', that.ruleForm2).then((res) => {
              that.$message({
                showClose: true,
                message: res.data.message,
                type: 'success'
              })
            console.log(that.ruleForm2);
          }).catch((err) => {
            console.log(err);
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style scoped>
  .demo-ruleForm {
    width: 460px;
    padding-top: 25px;
  }

  .card {
    width: 560px;
    padding-bottom: 15px;
    margin: 0px auto;
  }
</style>
