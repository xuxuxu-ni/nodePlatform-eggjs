<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <department-tree></department-tree>
      </el-col>
      <el-col :span="8">
        <simple-tree></simple-tree>
      </el-col>
      <el-col :span="8">
        <organize-form></organize-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import DepartmentTree from "../../components/Tree/departmentTree";
    import SimpleTree from "../../components/Tree/simpleTree";
    import OrganizeForm from "../../components/Form/organizeForm";
    export default {
        name: "codeManage",
      components: {OrganizeForm, SimpleTree, DepartmentTree}
    }
</script>

<style scoped>

</style>
