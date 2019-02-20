<template>
  <div> <el-row :gutter="10">
    <el-col :span="6">
      <department-tree></department-tree>
    </el-col>
    <el-col :span="18">
      <department-table></department-table>
    </el-col>
  </el-row>
</div>
</template>

<script>
    import DepartmentTree from "../../components/Tree/departmentTree";
    import DepartmentTable from "../../components/Table/departmentTable";
    export default {
        name: "personnelManage",
      components: {DepartmentTable, DepartmentTree}
    }
</script>

<style scoped>

</style>
