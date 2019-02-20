<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <department-tree></department-tree>
      </el-col>
      <el-col :span="18">
        <organize-form></organize-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import DepartmentTree from "../../components/Tree/departmentTree";
    import OrganizeForm from "../../components/Form/organizeForm";
    export default {
        name: "organizeManage",
      components: {OrganizeForm, DepartmentTree},
    }
</script>

<style scoped>

</style>
