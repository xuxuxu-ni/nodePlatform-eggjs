<template>
  <div class="cardshadow department">
    <el-input
      placeholder="输入关键字进行过滤"
      size="small"
      clearable
      v-model="filterText">
    </el-input>

    <el-tree
      class="filter-tree"
      :data="data2"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree2">
    </el-tree>
  </div>
</template>

<script>
    export default {
        name: "departmentTree",
      watch: {
        filterText(val) {
          this.$refs.tree2.filter(val);
        }
      },

      methods: {
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        }
      },

      data() {
        return {
          filterText: '',
          data2: [{
            id: 1,
            label: '系统管理部门(浪花易借)',
            children: [{
              id: 4,
              label: '浪花易借(浪花易借)',
              children: [{
                id: 9,
                label: '财务部(浪花易借)'
              }, {
                id: 10,
                label: '信息科(浪花易借)'
              },{
                id: 2,
                label: '催收部(浪花易借)',
                children: [{
                  id: 5,
                  label: '催无虑(浪花易借)'
                }, {
                  id: 6,
                  label: '催收员(浪花易借)'
                }]
              }]
            }]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        };
      }
    }
</script>

<style scoped>

</style>
