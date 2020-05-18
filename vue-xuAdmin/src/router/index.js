import en from "../i18n/lang/en"
import cn from "../i18n/lang/cn"
import Vue from "vue"
import Router from "vue-router"
import Login from "@/views/login/index"
import Layout from "@/views/layout/layout"
import HomeMain from "@/views/index/mainIndex"

// 不是必须加载的组件使用懒加载
const NotFound = () => import("@/views/page404")

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)
let routeName = en.routeName
let roleName = cn.routeName
let defaultRouter = [
  { path: "/",
    redirect: "/index",
    hidden: true,
    children: []
  },
  {
    path: "/login",
    component: Login,
    name: "",
    hidden: true,
    children: []
  },
  {
    path: "/",
    iconCls: "fa fa-dashboard", // 图标样式class
    name: routeName.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: "/index",
        iconCls: "fa fa-dashboard", // 图标样式class
        name: "主页",
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: "/404",
    component: NotFound,
    name: "404",
    hidden: true,
    children: []
  }
]

let addRouter = [
  {
    r_id: 100022,
    r_name: roleName.article,
    path: "/",
    iconCls: "el-icon-tickets", // 图标样式class
    name: "article",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 100023,
        r_name: roleName.publishArticle,
        path: "/addArticleEditor",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "publishArticle",
        component: () => import("@/views/article/addArticleEditor"),
        children: []
      },
      {
        r_id: 100024,
        r_name: roleName.articleList,
        path: "/articleList",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "articleList",
        component: () => import("@/views/article/articleList"),
        children: []
      },
      {
        r_id: 100025,
        r_name: roleName.commentList,
        path: "/commentList",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "commentList",
        component: () => import("@/views/article/commentList"),
        children: []
      }
    ]
  },
  {
    r_id: 100055,
    r_name: roleName.editor,
    path: "/",
    iconCls: "el-icon-edit", // 图标样式class
    name: "editor",
    component: () => import("@/views/layout/layout"),
    meta: {role: ["superAdmin", "admin"]},
    children: [
      {
        r_id: 100056,
        r_name: roleName.markdown,
        path: "/markdown",
        iconCls: "fa fa-file-code-o", // 图标样式class
        name: "markdown",
        component: () => import("@/views/editor/markdownView"),
        children: []
      },
      {
        r_id: 100057,
        r_name: roleName.wangeditor,
        path: "/wangeditor",
        iconCls: "fa fa-file-code-o", // 图标样式class
        name: "wangeditor",
        component: () => import("@/views/editor/wangeditorView"),
        children: []
      }
    ]
  },
  {
    r_id: 100000,
    r_name: roleName.systemManage,
    path: "/",
    iconCls: "fa fa-universal-access", // 图标样式class
    name: "systemManage",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 100005,
        r_name: roleName.roleManage,
        path: "/roleManage",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "roleManage",
        component: () => import("@/views/systemManage/roleManage"),
        children: [
          {
            r_id: "btn_100002",
            r_name: "btn:增加",
            path: "",
            type: "button",
            children: []
          }
        ]
      },
      {
        r_id: 100026,
        r_name: roleName.userManage,
        path: "/",
        iconCls: "el-icon-tickets", // 图标样式class
        name: "userManage",
        component: () => import("@/views/commerViews"),
        children: [
          {
            r_id: 100029,
            r_name: roleName.userList,
            path: "/userList",
            iconCls: "el-icon-edit-outline", // 图标样式class
            name: "userList",
            component: () => import("@/views/user/userList"),
            children: []
          }
        ]
      }
    ]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
    children: []
  }
]

export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
