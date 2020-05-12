<template>
  <div class="addArticle">
    <el-form ref="article" :inline="true" :model="article" label-width="80px">
      <el-form-item label="文章标题">
        <el-input class="title" v-model="article.title"/>
      </el-form-item>
      <el-form-item label="标签">
        <el-autocomplete
          class="inline-input"
          v-model="article.sort"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        />
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-switch v-model="article.top"/>
      </el-form-item>

      <el-form-item>
        <el-button class="subBtn" type="primary" @click="submitArticle">发布</el-button>
      </el-form-item>
      <br />
      <el-form-item label="缩略图上传" label-width="95px">
        <el-upload
          class="avatar-uploader"
          :action="this.$path+'/editor/uploadImg'"
          :show-file-list="false"
          :on-success="handlethumbnailSuccess"
          :before-upload="beforethumbnailUpload">
          <img v-if="article.thumbnail" :src="article.thumbnail" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="banner图上传" label-width="110px">
        <el-upload
          class="avatar-uploader"
          action="/api/editor/uploadImg"
          :show-file-list="false"
          :on-success="handleBannerSuccess"
          :before-upload="beforeBannerUpload">
          <img v-if="article.banner" :src="article.banner" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from "wangeditor"

export default {
  name: "addArticle",
  data () {
    return {
      article: {
        title: "文章测试-标题",
        sort: "",
        top: true,
        content_html: "",
        thumbnail: "",
        banner: ""
      },
      initData: "",
      restaurants: []
    }
  },
  methods: {
    handlethumbnailSuccess (res, file) {
      this.article.thumbnail = res.data[0]
    },
    beforethumbnailUpload (file) {
      const isJPG = file.type === "image/jpeg"
      const isPNG = file.type === "image/png"
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!(isJPG || isPNG)) {
        this.$message.error("上传文章缩略图只能是 JPG/PNG 格式!")
      }
      if (!isLt2M) {
        this.$message.error("上传文章缩略图大小不能超过 2MB!")
      }
      // eslint-disable-next-line no-mixed-operators
      return isLt2M && isJPG || isPNG
    },
    handleBannerSuccess (res, file) {
      this.article.banner = res.data[0]
    },
    beforeBannerUpload (file) {
      const isJPG = file.type === "image/jpeg"
      const isPNG = file.type === "image/png"
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!(isJPG || isPNG)) {
        this.$message.error("上传banner只能是 JPG/PNG 格式!")
      }
      if (!isLt5M) {
        this.$message.error("上传banner图片大小不能超过 5MB!")
      }
      // eslint-disable-next-line no-mixed-operators
      return isLt5M && isJPG || isPNG
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
        {"value": "vue"},
        {"value": "node.js"}
      ]
    },
    handleSelect (item) {
      console.log(item)
    },

    getContent: function () {
      alert(this.editorContent)
    },
    submitArticle () {
      this.$request.fetchAddArticle(this.article).then(response => {
        this.$restBack(response.data)
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    let that = this
    this.restaurants = this.loadAll()
    var editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      that.article.content_html = html
    }
    editor.customConfig.uploadImgServer = "/router/editor/uploadImg" // 上传图片到服务器
    editor.customConfig.debug = true
    // editor.customConfig.showLinkImg = false
    editor.create()

    let id = this.$route.query.articleId

    if (!id) return false
    this.$request.fetchGetArticle({id})
      .then(function (response) {
        console.log(response)
        that.article = response.data
        editor.txt.html(response.data.content_html)
        return false
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
