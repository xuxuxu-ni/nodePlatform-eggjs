<template>
  <div>
    <el-dialog title="权限分配" class="dialog2" :visible.sync="dialogVisible">
      <el-tree
        :data="roleTree"
        show-checkbox
        node-key="id"
        :props="defaultProps">
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "roleAllocate",
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'r_name',
          id: 'path'
        }
      }
    },
    props: ['roleTree','dialogVisible']
  }
</script>

<style scoped>

</style>
