<template>
    <div class="cardshadow organizeForm">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="单位编号" prop="number">
          <el-input v-model="form.number" placeholder="单位编号"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-radio v-model="radio" label="1">菜单夹</el-radio>
          <el-radio v-model="radio" label="2">菜单项</el-radio>
        </el-form-item>
        <el-form-item label="单位名称" prop="name">
          <el-input v-model="form.name" placeholder="单位名称"></el-input>
        </el-form-item>
        <el-form-item label="上级单位" prop="higher">
          <el-input v-model="form.higher" placeholder="上级单位"></el-input>
        </el-form-item>
        <el-form-item label="单位描述" prop="describe">
          <el-input v-model="form.describe" placeholder="单位描述"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="serial">
          <el-input v-model="form.serial" placeholder="排序号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "organizeForm",
      data() {
        return {
          radio: '1',
          form: {
            number: '10101',
            name: '天天',
            higher: '浪花易借',
            describe: '',
            serial: '1'
          },
          formLabelWidth: '120px'
        }
      }
    }
</script>

<style scoped>

  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>

