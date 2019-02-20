<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <manage-table></manage-table>
      </el-col>
      <el-col :span="16">
        <role-tabs></role-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import ManageTable from "../../components/Table/manageTable";
    import RoleTabs from "../../components/Tabs/roleTabs";
    export default {
        name: "roleManage",
      components: {RoleTabs, ManageTable}
    }
</script>

<style scoped>

</style>
