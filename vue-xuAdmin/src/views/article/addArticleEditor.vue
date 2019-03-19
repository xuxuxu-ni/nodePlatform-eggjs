<template>
  <div class="addArticle">
    <el-form ref="article" :inline="true" :model="article" label-width="80px">
      <el-form-item label="文章标题">
        <el-input class="title" v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-autocomplete
          class="inline-input"
          v-model="article.sort"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-switch v-model="article.top"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button class="subBtn" type="primary" @click="submitArticle">发布</el-button>
      </el-form-item>
    </el-form>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
  import E from 'wangeditor'

  export default {
    name: 'addArticle',
    data() {
      return {
        article: {
          title: '文章测试-标题',
          sort: '',
          top: true,
          contentHtml: '',
        },
        initData: "",
        restaurants: [],
      }
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll() {
        return [
          {'value': 'vue'},
          {'value': 'node.js'}
        ]
      },
      handleSelect(item) {
        console.log(item)
      },

      getContent: function () {
        alert(this.editorContent)
      },
      submitArticle() {
        let that = this
        this.$axios.post('/article/addArticle', this.article ).then( response => {
            console.log(response);
            that.$message({
              showClose: true,
              message: response.data.message,
              type: 'success'
            })
          })
          .catch(function (error) {
            console.log(error);
          });

        // this.$axios.post('/comment/replyComment', {
        //   "to_user_id": "32306360496411e9901b65a0664389a9",
        //   "CcommentId": "e5552650498d11e9875e3d9681c01fb9",
        //   "content": "这是回复内容"
        // }).then( response => {
        //   console.log(response);
        //   debugger
        //   that.$message({
        //     showClose: true,
        //     message: response.data.message,
        //     type: 'success'
        //   })
        // })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      }
    },
    mounted() {
      let that = this
      this.restaurants = this.loadAll()
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        that.article.contentHtml = html
      }
      editor.customConfig.uploadImgServer = '/api/editor/uploadImg'  // 上传图片到服务器
      editor.customConfig.debug = true
      // editor.customConfig.showLinkImg = false
      editor.create()


      let id = this.$route.query.articleId
      debugger

      if (!id) return false
      this.article.id = id
      this.$axios.get('/article/addArticle' + id)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response)
            that.article = response.data
            that.initData = response.data.content.markdown
            return false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
</script>

<style scoped>
  .title {
    width: 1000px;
  }

  .subBtn {
    width: 100px;
    margin: 0 auto;
  }
</style>
<style>
  .el-autocomplete-suggestion {
    z-index: 10010 !important;
  }

  .w-e-text-container {
    height: 600px !important;
  }
</style>
