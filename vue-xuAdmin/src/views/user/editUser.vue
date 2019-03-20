<template>
  <div class="card">
    <p class="title"><i class="fa fa-th-large fa-lg"></i>个人资料</p>
    <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm2.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="ruleForm2.roleId" placeholder="请选择等级">
          <el-option label="普通用户" value="0"></el-option>
          <el-option label="管理员" value="2"></el-option>
          <el-option label="超级管理员" value="1"></el-option>
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
      ruleForm2: {
        mobilePhone: '',
        username: '',
        roleId: '0',
        sex: '',
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
    let that = this
    let id = this.$route.query.userId
    if (!id) {
      id = this.$store.getters.info.uid
    }
    this.$axios.post('/user/getUserInforId', {id})
      .then(function (response) {
        console.log(response)
        response.data.password = ''
        that.ruleForm2 = response.data
        return false
      })
      .catch(function (error) {
        console.log(error)
      })
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
