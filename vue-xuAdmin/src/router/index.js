import en from '../i18n/lang/en'
import cn from '../i18n/lang/cn'
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'

// 不是必须加载的组件使用懒加载
const NotFound = () => import('@/page404')

Vue.use(Router)
let routeNmae = en.routeNmae
let roleNmae = cn.routeNmae
let defaultRouter = [
  { path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/index',
    iconCls: 'fa fa-dashboard', // 图标样式class
    name: routeNmae.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard', // 图标样式class
        name: '主页',
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  },
]

let addRouter = [

  {
    r_id: 100022,
    r_name: roleNmae.article,
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'article',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_id: 100023,
        r_name: roleNmae.publishArticle,
        path: '/addArticleEditor',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'publishArticle',
        component: () => import('@/views/article/addArticleEditor'),
        children: []
      },
      {
        r_id: 100024,
        r_name: roleNmae.articleList,
        path: '/articleList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'articleList',
        component: () => import('@/views/article/articleList'),
        children: []
      },
      {
        r_id: 100025,
        r_name: roleNmae.commentList,
        path: '/commentList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'commentList',
        component: () => import('@/views/article/commentList'),
        children: []
      }
    ]
  },
  {
    r_id: 100055,
    r_name: roleNmae.editor,
    path: '/',
    iconCls: 'el-icon-edit', // 图标样式class
    name: 'editor',
    component: () => import('@/views/layout/layout'),
    meta: {role: ['superAdmin', 'admin']},
    children: [
      {
        r_id: 100056,
        r_name: roleNmae.markdown,
        path: '/markdown',
        iconCls: 'fa fa-file-code-o', // 图标样式class
        name: 'markdown',
        component: () => import('@/views/editor/markdownView'),
        children: []
      },
      {
        r_id: 100057,
        r_name: roleNmae.wangeditor,
        path: '/wangeditor',
        iconCls: 'fa fa-file-code-o', // 图标样式class
        name: 'wangeditor',
        component: () => import('@/views/editor/wangeditorView'),
        children: []
      }
    ]
  },
  {
    r_id: 100000,
    r_name: roleNmae.systemManage,
    path: '/',
    iconCls: 'fa fa-universal-access', // 图标样式class
    name: 'systemManage',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_id: 100001,
        r_name: roleNmae.organizeManage,
        path: '/organizeManage',
        iconCls: 'fa fa-server',
        name: 'organizeManage',
        component: () => import('@/views/commerViews'), // 无限极菜单的容器
        children: [
          {
            r_id: 100002,
            r_name: roleNmae.unitManage,
            path: '/organizeManage',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'unitManage',
            component: () => import('@/views/systemManage/organizeManage'),
            children: []
          },
          {
            r_id: 100003,
            r_name: roleNmae.personnelManage,
            path: '/personnelManage',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'personnelManage',
            component: () => import('@/views/systemManage/personnelManage'),
            children: []
          },
          {
            r_id: 100005,
            r_name: roleNmae.roleManage,
            path: '/roleManage',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'roleManage',
            component: () => import('@/views/systemManage/roleManage'),
            children: []
          },
        ]
      },
      {
        r_id: 100026,
        r_name: roleNmae.userManage,
        path: '/',
        iconCls: 'el-icon-tickets', // 图标样式class
        name: 'userManage',
        component: () => import('@/views/commerViews'),
        children: [
          {
            r_id: 100027,
            r_name: roleNmae.editUser,
            path: '/editUser',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'editUser',
            component: () => import('@/views/user/editUser'),
            children: []
          },
          {
            r_id: 100028,
            r_name: roleNmae.addUser,
            path: '/addUser',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'addUser',
            component: () => import('@/views/user/addUser'),
            meta: {role: ['superAdmin', 'admin']},
            children: []
          },
          {
            r_id: 100029,
            r_name: roleNmae.userList,
            path: '/userList',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'userList',
            component: () => import('@/views/user/userList'),
            children: []
          },
          {
            r_id: 100030,
            r_name: roleNmae.editPassworld,
            path: '/editPassworld',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'editPassworld',
            component: () => import('@/views/user/editPassworld'),
            children: []
          },

        ]
      },
    ]
  },
  {
    r_id: 100058,
    r_name: roleNmae.systemSettings,
    path: '/',
    iconCls: 'el-icon-setting', // 图标样式class
    name: 'systemSettings',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_id: 100063,
        r_name: roleNmae.navMenu,
        path: '/navClassifies',
        iconCls: 'el-icon-menu', // 图标样式class
        name: 'navMenu',
        component: () => import('@/views/systemSetting/navClassify'),
        children: []
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    children: []
  },
]

export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
