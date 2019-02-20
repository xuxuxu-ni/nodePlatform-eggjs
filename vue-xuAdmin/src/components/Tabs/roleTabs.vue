<template>
  <div class="cardshadow roleTabs">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="角色编辑" name="first">
        <div>
          <el-form label-width="120px">
            <el-form-item label="角色描述">
              <el-input v-model="editform.describe" placeholder="" class="describeLabel"></el-input>
            </el-form-item>
            <el-form-item label="角色类型">
              <el-select v-model="editform.type" placeholder="" class="describeLabel">
                <el-option label="管理" value="1"></el-option>
                <el-option label="技术" value="2"></el-option>
                <el-option label="临时" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="权限配置" name="second">
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
      <el-tab-pane label="用户配置" name="third">
        <div>
          <el-tag>角色未包含的用户</el-tag>
        </div>
        <div>
          <el-form :inline="true" :model="searchform" class="search-form-inline">
            <el-form-item label="系统用户名">
              <el-input v-model="searchform.number" size="small" class="searchinput"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="searchform.name" size="small" class="searchinput"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-select v-model="searchform.type" size="small" class="searchinput">
                <el-option label="管理" value="1"></el-option>
                <el-option label="技术" value="2"></el-option>
                <el-option label="临时" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          height="250"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="number"
            label="系统用户名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="dwname"
            label="单位名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="bmname"
            label="部门名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
          class="Paging"
          layout="prev, pager, next"
          align="right"
          :total="1000">
        </el-pagination>
        <div class="tagView">
          <el-tag>角色未包含的用户</el-tag>
        </div>
        <div>
          <el-form :inline="true" :model="searchform" class="search-form-inline">
            <el-form-item label="系统用户名">
              <el-input v-model="searchform.number" size="small" class="searchinput"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="searchform.name" size="small" class="searchinput"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-select v-model="searchform.type" size="small" class="searchinput">
                <el-option label="管理" value="1"></el-option>
                <el-option label="技术" value="2"></el-option>
                <el-option label="临时" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          height="250"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="number"
            label="系统用户名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="dwname"
            label="单位名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="bmname"
            label="部门名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
          class="Paging"
          layout="prev, pager, next"
          align="right"
          :total="1000">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "roleTabs",
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
              describe: '催收员',
              type: '临时'
            },
            activeName: 'first',
            searchform: {
              number: '',
              name: '',
              type: ''
            },
            tableData3: [{
              number: '11000000010',
              name: '催收员',
              dwname: '理小花',
              bmname: '催收部',
              status: '正常'
            }, {
              number: '11000000010',
              name: '催收员',
              dwname: '理小花',
              bmname: '催收部',
              status: '正常'
            }, {
              number: '11000000010',
              name: '催收员',
              dwname: '理小花',
              bmname: '催收部',
              status: '正常'
            }, {
              number: '11000000010',
              name: '催收员',
              dwname: '理小花',
              bmname: '催收部',
              status: '正常'
            }, {
              number: '11000000010',
              name: '催收员',
              dwname: '理小花',
              bmname: '催收部',
              status: '正常'
            }, {
              number: '11000000010',
              name: '催收员',
              dwname: '理小花',
              bmname: '催收部',
              status: '正常'
            }, {
              number: '11000000010',
              name: '催收员',
              dwname: '理小花',
              bmname: '催收部',
              status: '正常'
            }],
            multipleSelection: []
          };
        },
        methods: {
          handleClick(tab, event) {
             console.log(tab, event);
          }
        }
    }
</script>

<style scoped>
  .describeLabel{
    width: 200px;
  }
  .searchinput{
    width: 150px;
  }
  .tagView{
    margin-top: 20px;
  }
</style>
