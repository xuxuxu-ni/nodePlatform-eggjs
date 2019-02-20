<template>
    <div>
      <kehujiekuan-table></kehujiekuan-table>
      <kehujiekuan-tabs class="tabs"></kehujiekuan-tabs>
    </div>
</template>

<script>
    import KehujiekuanTable from "../../components/Table/kehujiekuanTable";
    import KehujiekuanTabs from "../../components/Tabs/kehujiekuanTabs";
    export default {
        name: "kehujiekuanshengpi",
      components: {KehujiekuanTabs, KehujiekuanTable}
    }
</script>

<style scoped>
  .tabs{
    margin-top: 10px;
  }

</style>
