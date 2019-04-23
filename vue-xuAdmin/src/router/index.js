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
    r_name: roleNmae.systemManage,
    path: '/',
    iconCls: 'fa fa-universal-access', // 图标样式class
    name: 'systemManage',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_name: roleNmae.organizeManage,
        path: '/organizeManage',
        iconCls: 'fa fa-server',
        name: 'organizeManage',
        component: () => import('@/views/commerViews'), // 无限极菜单的容器
        children: [
          {
            r_name: roleNmae.unitManage,
            path: '/organizeManage',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'unitManage',
            component: () => import('@/views/systemManage/organizeManage'),
            children: []
          },
          {
            r_name: roleNmae.personnelManage,
            path: '/personnelManage',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'personnelManage',
            component: () => import('@/views/systemManage/personnelManage'),
            children: []
          },
          {
            r_name: roleNmae.menuManage,
            path: '/menuManage',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'menuManage',
            component: () => import('@/views/systemManage/menuManage'),
            children: []
          },
          {
            r_name: roleNmae.roleManage,
            path: '/roleManage',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'roleManage',
            component: () => import('@/views/systemManage/roleManage'),
            children: []
          },
          {
            r_name: roleNmae.jurisdictionManage,
            path: '/jurisdictionManage',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'jurisdictionManage',
            component: () => import('@/views/systemManage/jurisdictionManage'),
            children: []
          }
        ]
      },
      {
        r_name: roleNmae.parameterManage,
        path: '/parameterManage',
        iconCls: 'fa fa-server',
        name: 'parameterManage',
        component: () => import('@/views/commerViews'), // 无限极菜单的容器
        children: [
          {
            r_name: roleNmae.codeManage,
            path: '/codeManage',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'codeManage',
            component: () => import('@/views/systemManage/codeManage'),
            children: []
          }
        ]
      }
    ]
  },
  {
    r_name: roleNmae.business,
    path: '/',
    iconCls: 'fa fa-universal-access', // 图标样式class
    name: 'business',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_name: roleNmae.kehujiekuanshengpi,
        path: '/kehujiekuanshengpi',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'kehujiekuanshengpi',
        component: () => import('@/views/business/kehujiekuanshengpi'),
        children: []
      },
      {
        r_name: roleNmae.fuyoutuipiaochaxun,
        path: '/fuyoutuipiaochaxun',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'fuyoutuipiaochaxun',
        component: () => import('@/views/business/fuyoutuipiaochaxun'),
        children: []
      },
      {
        r_name: roleNmae.customerInformation,
        path: '/customerInformation',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'customerInformation',
        component: () => import('@/views/business/customerInformation'),
        children: []
      },
      {
        r_name: roleNmae.orderInformation,
        path: '/orderInformation',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'orderInformation',
        component: () => import('@/views/business/orderInformation'),
        children: []
      },
      {
        r_name: roleNmae.lenderManage,
        path: '/lenderManage',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'lenderManage',
        component: () => import('@/views/business/lenderManage'),
        children: []
      },
      {
        r_name: roleNmae.reduceManage,
        path: '/reduceManage',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'reduceManage',
        component: () => import('@/views/business/reduceManage'),
        children: []
      },
      {
        r_name: roleNmae.wxxiaozhangguanli,
        path: '/wxxiaozhangguanli',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'wxxiaozhangguanli',
        component: () => import('@/views/business/wxxiaozhangguanli'),
        children: []
      },
      {
        r_name: roleNmae.xiaozhangguanli,
        path: '/xiaozhangguanli',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'xiaozhangguanli',
        component: () => import('@/views/business/xiaozhangguanli'),
        children: []
      },
      {
        r_name: roleNmae.cuishouguanli,
        path: '/cuishouguanli',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'cuishouguanli',
        component: () => import('@/views/commerViews'),
        children: [
          {
            r_name: roleNmae.neibujigoupaidan,
            path: '/neibujigoupaidan',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'neibujigoupaidan',
            component: () => import('@/views/business/neibujigoupaidan'),
            children: []
          },
          {
            r_name: roleNmae.cuishouzhuguanpaidan,
            path: '/cuishouzhuguanpaidan',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'cuishouzhuguanpaidan',
            component: () => import('@/views/business/cuishouzhuguanpaidan'),
            children: []
          },
          {
            r_name: roleNmae.cuishou,
            path: '/cuishou',
            iconCls: 'el-icon-edit-outline', // 图标样式class
            name: 'cuishou',
            component: () => import('@/views/business/cuishou'),
            children: []
          }
        ]
      }
    ]
  },
  {
    r_name: roleNmae.article,
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'article',
    component: () => import('@/views/layout/layout'),
    children: [
      // {
      //   path: '/addArticle',
      //   iconCls: 'el-icon-edit-outline', // 图标样式class
      //   name: 'publishArticle',
      //   component: () => import('@/views/article/addArticle'),
      //   children: []
      // },
      {
        r_name: roleNmae.publishArticle,
        path: '/addArticleEditor',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'publishArticle',
        component: () => import('@/views/article/addArticleEditor'),
        children: []
      },
      {
        r_name: roleNmae.articleList,
        path: '/articleList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'articleList',
        component: () => import('@/views/article/articleList'),
        children: []
      },
      {
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
    r_name: roleNmae.userSettings,
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'userSettings',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_name: roleNmae.editUser,
        path: '/editUser',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'editUser',
        component: () => import('@/views/user/editUser'),
        children: []
      },
      {
        r_name: roleNmae.addUser,
        path: '/addUser',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'addUser',
        component: () => import('@/views/user/addUser'),
        meta: {role: ['superAdmin', 'admin']},
        children: []
      },
      {
        r_name: roleNmae.userList,
        path: '/userList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'userList',
        component: () => import('@/views/user/userList'),
        children: []
      },
      {
        r_name: roleNmae.editPassworld,
        path: '/editPassworld',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'editPassworld',
        component: () => import('@/views/user/editPassworld'),
        children: []
      },

    ]
  },
  {
    r_name: roleNmae.icon,
    path: '/',
    iconCls: 'fa fa-paw', // 图标样式class
    name: 'icon',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_name: roleNmae.builtInIcon,
        path: '/icon',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: 'builtInIcon',
        component: () => import('@/views/icon/index'),
        children: []
      }
    ]
  },
  {
    r_name: roleNmae.shuttleBox,
    path: '/',
    iconCls: 'fa fa-exchange', // 图标样式class
    name: 'shuttleBox',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_name: roleNmae.demoShuttle,
        path: '/transfer',
        iconCls: 'fa fa-sign-in', // 图标样式class
        name: 'demoShuttle',
        component: () => import('@/views/transfer/transfer'),
        children: []
      }
    ]
  },
  {
    r_name: roleNmae.permissions,
    path: '/',
    iconCls: 'fa fa-universal-access', // 图标样式class
    name: 'permissions',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_name: roleNmae.pageControl,
        path: '/pagePermissions',
        iconCls: 'fa fa-expeditedssl', // 图标样式class
        name: 'pageControl',
        component: () => import('@/views/permissions/pagePermissions'),
        children: []
      },
      {
        r_name: roleNmae.btnControl,
        path: '/btnPermissions',
        iconCls: 'fa fa-toggle-on', // 图标样式class
        name: 'btnControl',
        component: () => import('@/views/permissions/btnPermissions'),
        children: []
      },
      {
        r_name: roleNmae.roleList,
        path: '/roleList',
        iconCls: 'fa fa-toggle-on', // 图标样式class
        name: 'roleList',
        component: () => import('@/views/permissions/roleList'),
        children: []
      }
    ]
  },
  {
    r_name: roleNmae.table,
    path: '/',
    iconCls: 'fa fa-newspaper-o', // 图标样式class
    name: 'table',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_name: roleNmae.multiDataTable,
        path: '/dataTable',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: 'multiDataTable',
        component: () => import('@/views/table/dataTables'),
        children: []
      },
      {
        r_name: roleNmae.filterTable,
        path: '/filterTable',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: 'filterTable',
        component: () => import('@/views/table/filterTable'),
        children: []
      },
      {
        r_name: roleNmae.dragSort,
        path: '/dragTabe',
        iconCls: 'fa fa-hand-stop-o', // 图标样式class
        name: 'dragSort',
        component: () => import('@/views/table/filterTable'),
        children: []
      }
    ]
  },

  {
    r_name: roleNmae.multiDirectory,
    path: '/',
    iconCls: 'fa fa-server',
    name: 'multiDirectory',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_name: roleNmae['menu2-1'],
        path: '/erji1',
        iconCls: 'fa fa-server',
        name: 'menu2-1',
        component: () => import('@/views/duoji/erji'),
        children: []
      },
      {
        r_name: roleNmae['menu2-2'],
        path: '/erji2',
        iconCls: 'fa fa-server',
        name: 'menu2-2',
        component: () => import('@/views/duoji/erji2'),
        children: []
      },
      {
        r_name: roleNmae['menu2-3'],
        path: '/erji3',
        iconCls: 'fa fa-server',
        name: 'menu2-3',
        component: () => import('@/views/commerViews'), // 无限极菜单的容器
        children: [
          {
            r_name: roleNmae['menu3-1'],
            path: '/sanji1',
            iconCls: 'fa fa-server',
            name: 'menu3-1',
            component: () => import('@/views/duoji/sanji'),
            children: []
          },
          {
            r_name: roleNmae['menu3-2'],
            path: '/sanji2',
            iconCls: 'fa fa-server',
            name: 'menu3-2',
            component: () => import('@/views/duoji/sanji2'),
            children: []
          },
          {
            r_name: roleNmae['menu3-3'],
            path: '/sanji3',
            iconCls: 'fa fa-server',
            name: 'menu3-3',
            component: import('@/views/commerViews'),
            children: [
              {
                r_name: roleNmae['menu4-1'],
                path: '/siji',
                iconCls: 'fa fa-server',
                name: 'menu4-1',
                component: () => import('@/views/duoji/siji'),
                children: []
              },
              {
                r_name: roleNmae['menu4-2'],
                path: '/siji1',
                iconCls: 'fa fa-server',
                name: 'menu4-2',
                component: import('@/views/commerViews'),
                children: [
                  {
                    r_name: roleNmae['menu5-1'],
                    path: '/wuji',
                    iconCls: 'fa fa-server',
                    name: 'menu5-1',
                    component: () => import('@/views/duoji/wuji'),
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    r_name: roleNmae['upload'],
    path: '/',
    iconCls: 'fa fa-cloud-upload', // 图标样式class
    name: 'upload',
    component: () => import('@/views/layout/layout'),
    meta: {role: ['superAdmin']},
    children: [
      {
        r_name: roleNmae.fileUpload,
        path: '/upload',
        iconCls: 'el-icon-upload2', // 图标样式class
        name: 'fileUpload',
        component: () => import('@/views/upload/upload'),
        children: []
      }
    ]
  },
  {
    r_name: roleNmae.editor,
    path: '/',
    iconCls: 'el-icon-edit', // 图标样式class
    name: 'editor',
    component: () => import('@/views/layout/layout'),
    meta: {role: ['superAdmin', 'admin']},
    children: [
      {
        r_name: roleNmae.markdown,
        path: '/markdown',
        iconCls: 'fa fa-file-code-o', // 图标样式class
        name: 'markdown',
        component: () => import('@/views/editor/markdownView'),
        children: []
      },
      {
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
    r_name: roleNmae.systemSettings,
    path: '/',
    iconCls: 'el-icon-setting', // 图标样式class
    name: 'systemSettings',
    component: () => import('@/views/layout/layout'),
    meta: {role: ['superAdmin']},
    children: [
      {
        r_name: roleNmae.navMenu,
        path: '/navClassifies',
        iconCls: 'el-icon-menu', // 图标样式class
        name: 'navMenu',
        component: () => import('@/views/syssetting/navClassify'),
        children: []
      }
    ]
  },
  {
    r_name: roleNmae.systemSettings,
    path: '/',
    iconCls: 'el-icon-setting', // 图标样式class
    name: 'systemSettings',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        r_name: roleNmae.bannerSetting,
        path: '/bannerSetting',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'bannerSetting',
        component: () => import('@/views/systemSetting/bannerSetting'),
        children: []
      },
      {
        r_name: roleNmae.questionSetting,
        path: '/questionSetting',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'questionSetting',
        component: () => import('@/views/systemSetting/questionSetting'),
        children: []
      },
      {
        r_name: roleNmae.agreementSetting,
        path: '/agreementSetting',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'agreementSetting',
        component: () => import('@/views/systemSetting/agreementSetting'),
        children: []
      },
      {
        r_name: roleNmae.noticeSetting,
        path: '/noticeSetting',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'noticeSetting',
        component: () => import('@/views/systemSetting/noticeSetting'),
        children: []
      },
      {
        r_name: roleNmae.navMenu,
        path: '/navClassifies',
        iconCls: 'el-icon-menu', // 图标样式class
        name: 'navMenu',
        component: () => import('@/views/syssetting/navClassify'),
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
