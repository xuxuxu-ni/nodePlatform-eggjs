<template>
  <div>
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
  </div>
</template>

<script>
  export default {
    name: "addRole",
    data() {
      return {
        formLabelWidth: '120px',
        dialogFormVisible: false
      }
    },
    props: ['form','dialogVisible'],
    methods: {

    },
    watch: {
      dialogVisible(nv, ov){
        this.dialogFormVisible = nv
      }
    },
    mounted() {
      console.log(this.form)

    }
  }
</script>

<style scoped>

</style>
