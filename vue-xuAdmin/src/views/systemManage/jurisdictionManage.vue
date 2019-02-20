<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <manage-table></manage-table>
      </el-col>
      <el-col :span="16">
        <jurisdiction-tabs></jurisdiction-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import ManageTable from "../../components/Table/manageTable";
    import JurisdictionTabs from "../../components/Tabs/jurisdictionTabs";
    export default {
        name: "jurisdictionManage",
      components: {JurisdictionTabs, ManageTable}
    }
</script>

<style scoped>

</style>
