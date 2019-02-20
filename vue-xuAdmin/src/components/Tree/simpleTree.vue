<template>
  <div class="cardshadow simpleTree">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
    export default {
        name: "simpleTree",
      data() {
        return {
          data: [{
            label: '信息管理权限',
          }, {
            label: '管理岗位权限',
          }, {
            label: '财务岗位权限',
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        };
      },
      methods: {
        handleNodeClick(data) {
          console.log(data);
        }
      }
    }
</script>

<style scoped>

</style>
