<template>
  <div class="addArticle">
    <el-form ref="article" :model="article" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-autocomplete
          class="inline-input"
          v-model="article.tag"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-switch v-model="article.top"></el-switch>
      </el-form-item>
    </el-form>
    <Markdown :onchange="change" v-bind:initData="initData"></Markdown>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button class="subBtn" type="primary" @click="submitArticle">发布</el-button>
    </el-row>
  </div>
</template>

<script>
import Markdown from '../../components/markdown/markdown-editor'
import initData from '../../markData.js'
export default {
  name: 'addArticle',
  data () {
    return {
      article: {
        title: '',
        tag: '',
        top: false,
        content: {}
      },
      initData: initData,
      restaurants: []
    }
  },
  components: {Markdown},
  methods: {
    change () {
      console.log(arguments[0], this.article)
      this.article.content = arguments[0]
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { 'value': 'vue' },
        { 'value': 'node.js' }
      ]
    },
    handleSelect (item) {
      console.log(item)
    },
    submitArticle () {
      this.$axios.post('/pay/createOrderAndOutPutQr', {
        // data: this.article

          "callBackUri":"http://47.99.184.57:8080/pay/testCallBack",
          "orderUserUid": "1",
          "OrderAmount": "0.1",
          "RetailPrice": 0.1,
          "OrderParameters":{
            "B014_ZhiFuMoShiXinXi_SNID":1,
            "DingDanShangPin": [{"RID":"1","Code":"1","Name":"1","Price":"0.1","Qty":"1"}]
          }

      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  }
}
</script>

<style scoped>
.subBtn{
  width: 100px;
  margin: 0 auto;
}
</style>
