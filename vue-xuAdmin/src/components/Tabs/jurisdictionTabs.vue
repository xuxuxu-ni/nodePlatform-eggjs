<template>
    <div class="cardshadow roleTabs">
      <el-tabs type="card">
        <el-tab-pane label="权限编辑">
          <div>
            <el-form label-width="120px">
              <el-form-item label="权限描述">
                <el-input v-model="editform.describe" placeholder="" class="describeLabel"></el-input>
              </el-form-item>
              <el-form-item label="权限类型">
                <el-select v-model="editform.type" placeholder="" class="describeLabel">
                  <el-option label="信息管理权限" value="1"></el-option>
                  <el-option label="管理岗位权限" value="2"></el-option>
                  <el-option label="财务岗位权限" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色配置">
          <div class="tabsconbox">
            <el-transfer
              filterable
              :filter-method="filterMethod"
              :titles="['角色未包含的权限', '角色已包含的权限']"
              filter-placeholder="请输入角色关键字"
              v-model="value2"
              :data="data2">
            </el-transfer>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设置菜单">
          <el-tree
            :data="data3"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
          <div class="footer">
            <el-button type="primary" @click="submiTree('ruleTree')">保 存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "jurisdictionTabs",
      data() {
        const generateData2 = _ => {
          const data = [];
          const cities = ['信息管理权限(信息)', '财务管理权限(财务)', '催收专员权限(财务)', '催收主管权限(管理)', '催收员权限(管理)'];
          cities.forEach((city, index) => {
            data.push({
              label: city,
              key: index
            });
          });
          return data;
        };
        return {
          data2: generateData2(),
          value2: [],
          filterMethod(query, item) {
            return item.label.indexOf(query) > -1;
          },
          editform: {
            describe: '催收专员权限',
            type: '管理岗位权限'
          },
          data3: [{
            id: 1,
            label: '系统管理',
            children: [{
              id: 2,
              label: '组织权限管理',
              children: [{
                id: 3,
                label: '单位管理'
              }, {
                id: 4,
                label: '部门人员管理'
              },{
                id: 5,
                label: '菜单管理'
              },{
                id: 6,
                label: '角色管理'
              },{
                id: 7,
                label: '权限管理'
              }]
            },{
              id: 8,
              label: '系统参数管理',
              children: [{
                id: 9,
                label: '代码管理'
              }]
            }]
          }, {
            id: 10,
            label: '业务功能',
            children: [{
              id: 11,
              label: '客户借款审批'
            }, {
              id: 12,
              label: '富友退票查询'
            },{
              id: 13,
              label: '客户信息查询'
            },{
              id: 14,
              label: '订单信息查询'
            },{
              id: 15,
              label: '出借人管理'
            },{
              id: 16,
              label: '违约金减免管理'
            },{
              id: 17,
              label: '微信销账管理'
            },{
              id: 18,
              label: '销账管理'
            },{
              id: 19,
              label: '催收管理',
              children: [{
                id: 20,
                label: '内部机构派单'
              },{
                id: 21,
                label: '催收主管派单'
              },{
                id: 22,
                label: '催收'
              }]
            }]
          }, {
            id: 23,
            label: '系统配置项',
            children: [{
              id: 24,
              label: '轮播图配置'
            },{
              id: 25,
              label: '常见问题配置'
            },{
              id: 26,
              label: '协议配置'
            },{
              id: 27,
              label: '系统公告配置'
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
  .describeLabel{
    width: 200px;
  }
  .footer{
    margin-top: 20px;
    margin-left: 50px;
  }
</style>
