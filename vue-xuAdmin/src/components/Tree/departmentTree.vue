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
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },

  data () {
    return {
      filterText: "",
      data2: [{
        id: 1,
        label: "系统管理部门(xx公司)",
        children: [{
          id: 4,
          label: "xx公司(xx公司)",
          children: [{
            id: 9,
            label: "财务部(xx公司)"
          }, {
            id: 10,
            label: "信息科(xx公司)"
          }, {
            id: 2,
            label: "催收部(xx公司)",
            children: [{
              id: 5,
              label: "催无虑(xx公司)"
            }, {
              id: 6,
              label: "催收员(xx公司)"
            }]
          }]
        }]
      }],
      defaultProps: {
        children: "children",
        label: "label"
      }
    }
  }
}
</script>

<style scoped>

</style>
