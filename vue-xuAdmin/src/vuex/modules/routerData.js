import {defaultRouter} from '@/router/index'

const routerData = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    setRouters: (state, routers) => {
      state.addRouters = routers  // 保存动态路由用来addRouter
      state.routers = defaultRouter.concat(routers) // 所有有权限的路由表，用来生成菜单列表
    }
  },
  actions: {
    newRoutes({commit}) {
      // 后台返回动态路由
      let newArr = [
        // {
        //   path: '/',
        //   iconCls: 'fa fa-universal-access', // 图标样式class
        //   name: 'systemManage',
        //   component: () => import('@/views/layout/layout'),
        //   children: [
        //     {
        //       path: '/organizeManage',
        //       iconCls: 'fa fa-server',
        //       name: 'organizeManage',
        //       component: () => import('@/views/commerViews'), // 无限极菜单的容器
        //       children: [
        //         {
        //           path: '/organizeManage',
        //           iconCls: 'el-icon-edit-outline', // 图标样式class
        //           name: 'unitManage',
        //           component: () => import('@/views/systemManage/organizeManage'),
        //           children: []
        //         },
        //         {
        //           path: '/personnelManage',
        //           iconCls: 'el-icon-edit-outline', // 图标样式class
        //           name: 'personnelManage',
        //           component: () => import('@/views/systemManage/personnelManage'),
        //           children: []
        //         },
        //         {
        //           path: '/menuManage',
        //           iconCls: 'el-icon-edit-outline', // 图标样式class
        //           name: 'menuManage',
        //           component: () => import('@/views/systemManage/menuManage'),
        //           children: []
        //         },
        //         {
        //           path: '/roleManage',
        //           iconCls: 'el-icon-edit-outline', // 图标样式class
        //           name: 'roleManage',
        //           component: () => import('@/views/systemManage/roleManage'),
        //           children: []
        //         },
        //         {
        //           path: '/jurisdictionManage',
        //           iconCls: 'el-icon-edit-outline', // 图标样式class
        //           name: 'jurisdictionManage',
        //           component: () => import('@/views/systemManage/jurisdictionManage'),
        //           children: []
        //         }
        //       ]
        //     },
        //     {
        //       path: '/parameterManage',
        //       iconCls: 'fa fa-server',
        //       name: 'parameterManage',
        //       component: () => import('@/views/commerViews'), // 无限极菜单的容器
        //       children: [
        //         {
        //           path: '/codeManage',
        //           iconCls: 'el-icon-edit-outline', // 图标样式class
        //           name: 'codeManage',
        //           component: () => import('@/views/systemManage/codeManage'),
        //           children: []
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: '/',
        //   iconCls: 'fa fa-universal-access', // 图标样式class
        //   name: 'business',
        //   component: () => import('@/views/layout/layout'),
        //   children: [
        //     {
        //       path: '/kehujiekuanshengpi',
        //       iconCls: 'el-icon-edit-outline', // 图标样式class
        //       name: 'kehujiekuanshengpi',
        //       component: () => import('@/views/business/kehujiekuanshengpi'),
        //       children: []
        //     },
        //     {
        //       path: '/fuyoutuipiaochaxun',
        //       iconCls: 'el-icon-edit-outline', // 图标样式class
        //       name: 'fuyoutuipiaochaxun',
        //       component: () => import('@/views/business/fuyoutuipiaochaxun'),
        //       children: []
        //     },
        //     {
        //       path: '/customerInformation',
        //       iconCls: 'el-icon-edit-outline', // 图标样式class
        //       name: 'customerInformation',
        //       component: () => import('@/views/business/customerInformation'),
        //       children: []
        //     },
        //     {
        //       path: '/orderInformation',
        //       iconCls: 'el-icon-edit-outline', // 图标样式class
        //       name: 'orderInformation',
        //       component: () => import('@/views/business/orderInformation'),
        //       children: []
        //     },
        //     {
        //       path: '/lenderManage',
        //       iconCls: 'el-icon-edit-outline', // 图标样式class
        //       name: 'lenderManage',
        //       component: () => import('@/views/business/lenderManage'),
        //       children: []
        //     },
        //     {
        //       path: '/reduceManage',
        //       iconCls: 'el-icon-edit-outline', // 图标样式class
        //       name: 'reduceManage',
        //       component: () => import('@/views/business/reduceManage'),
        //       children: []
        //     },
        //     {
        //       path: '/wxxiaozhangguanli',
        //       iconCls: 'el-icon-edit-outline', // 图标样式class
        //       name: 'wxxiaozhangguanli',
        //       component: () => import('@/views/business/wxxiaozhangguanli'),
        //       children: []
        //     },
        //     {
        //       path: '/xiaozhangguanli',
        //       iconCls: 'el-icon-edit-outline', // 图标样式class
        //       name: 'xiaozhangguanli',
        //       component: () => import('@/views/business/xiaozhangguanli'),
        //       children: []
        //     },
        //     {
        //       path: '/cuishouguanli',
        //       iconCls: 'el-icon-edit-outline', // 图标样式class
        //       name: 'cuishouguanli',
        //       component: () => import('@/views/commerViews'),
        //       children: [
        //         {
        //           path: '/neibujigoupaidan',
        //           iconCls: 'el-icon-edit-outline', // 图标样式class
        //           name: 'neibujigoupaidan',
        //           component: () => import('@/views/business/neibujigoupaidan'),
        //           children: []
        //         },
        //         {
        //           path: '/cuishouzhuguanpaidan',
        //           iconCls: 'el-icon-edit-outline', // 图标样式class
        //           name: 'cuishouzhuguanpaidan',
        //           component: () => import('@/views/business/cuishouzhuguanpaidan'),
        //           children: []
        //         },
        //         {
        //           path: '/cuishou',
        //           iconCls: 'el-icon-edit-outline', // 图标样式class
        //           name: 'cuishou',
        //           component: () => import('@/views/business/cuishou'),
        //           children: []
        //         }
        //       ]
        //     }
        //   ]
        // },

        {
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
              path: '/addArticleEditor',
              iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'publishArticle',
              component: () => import('@/views/article/addArticleEditor'),
              children: []
            },
            {
              path: '/articleList',
              iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'articleList',
              component: () => import('@/views/article/articleList'),
              children: []
            },
            {
              path: '/commentList',
              iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'commentList',
              component: () => import('@/views/article/commentList'),
              children: []
            }
          ]
        },
        {
          path: '/',
          iconCls: 'el-icon-tickets', // 图标样式class
          name: 'userSettings',
          component: () => import('@/views/layout/layout'),
          children: [
            {
              path: '/editUser',
              iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'editUser',
              component: () => import('@/views/user/editUser'),
              children: []
            },
            {
              path: '/addUser',
              iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'addUser',
              component: () => import('@/views/user/addUser'),
              meta: {role: ['superAdmin', 'admin']},
              children: []
            },
            {
              path: '/userList',
              iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'userList',
              component: () => import('@/views/user/userList'),
              children: []
            },
            {
              path: '/editPassworld',
                iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'editPassworld',
              component: () => import('@/views/user/editPassworld'),
              children: []
            },

          ]
        },
        // {
        //   path: '/',
        //   iconCls: 'fa fa-paw', // 图标样式class
        //   name: 'icon',
        //   component: () => import('@/views/layout/layout'),
        //   children: [
        //     {
        //       path: '/icon',
        //       iconCls: 'fa fa-life-ring', // 图标样式class
        //       name: 'builtInIcon',
        //       component: () => import('@/views/icon/index'),
        //       children: []
        //     }
        //   ]
        // },
        // {
        //   path: '/',
        //   iconCls: 'fa fa-exchange', // 图标样式class
        //   name: 'shuttleBox',
        //   component: () => import('@/views/layout/layout'),
        //   children: [
        //     {
        //       path: '/transfer',
        //       iconCls: 'fa fa-sign-in', // 图标样式class
        //       name: 'demoShuttle',
        //       component: () => import('@/views/transfer/transfer'),
        //       children: []
        //     }
        //   ]
        // },
        // {
        //   path: '/',
        //   iconCls: 'fa fa-universal-access', // 图标样式class
        //   name: 'permissions',
        //   component: () => import('@/views/layout/layout'),
        //   children: [
        //     {
        //       path: '/pagePermissions',
        //       iconCls: 'fa fa-expeditedssl', // 图标样式class
        //       name: 'pageControl',
        //       component: () => import('@/views/permissions/pagePermissions'),
        //       children: []
        //     },
        //     {
        //       path: '/btnPermissions',
        //       iconCls: 'fa fa-toggle-on', // 图标样式class
        //       name: 'btnControl',
        //       component: () => import('@/views/permissions/btnPermissions'),
        //       children: []
        //     }
        //   ]
        // },
        // {
        //   path: '/',
        //   iconCls: 'fa fa-newspaper-o', // 图标样式class
        //   name: 'table',
        //   component: () => import('@/views/layout/layout'),
        //   children: [
        //     {
        //       path: '/dataTable',
        //       iconCls: 'fa fa-sliders', // 图标样式class
        //       name: 'multiDataTable',
        //       component: () => import('@/views/table/dataTables'),
        //       children: []
        //     },
        //     {
        //       path: '/filterTable',
        //       iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        //       name: 'filterTable',
        //       component: () => import('@/views/table/filterTable'),
        //       children: []
        //     },
        //     {
        //       path: '/dragTabe',
        //       iconCls: 'fa fa-hand-stop-o', // 图标样式class
        //       name: 'dragSort',
        //       component: () => import('@/views/table/filterTable'),
        //       children: []
        //     }
        //   ]
        // },

        // {
        //   path: '/',
        //   iconCls: 'fa fa-server',
        //   name: 'multiDirectory',
        //   component: () => import('@/views/layout/layout'),
        //   children: [
        //     {
        //       path: '/erji1',
        //       iconCls: 'fa fa-server',
        //       name: 'menu2-1',
        //       component: () => import('@/views/duoji/erji'),
        //       children: []
        //     },
        //     {
        //       path: '/erji2',
        //       iconCls: 'fa fa-server',
        //       name: 'menu2-2',
        //       component: () => import('@/views/duoji/erji2'),
        //       children: []
        //     },
        //     {
        //       path: '/erji3',
        //       iconCls: 'fa fa-server',
        //       name: 'menu2-3',
        //       component: () => import('@/views/commerViews'), // 无限极菜单的容器
        //       children: [
        //         {
        //           path: '/sanji1',
        //           iconCls: 'fa fa-server',
        //           name: 'menu3-1',
        //           component: () => import('@/views/duoji/sanji'),
        //           children: []
        //         },
        //         {
        //           path: '/sanji2',
        //           iconCls: 'fa fa-server',
        //           name: 'menu3-2',
        //           component: () => import('@/views/duoji/sanji2'),
        //           children: []
        //         },
        //         {
        //           path: '/sanji3',
        //           iconCls: 'fa fa-server',
        //           name: 'menu3-3',
        //           component: import('@/views/commerViews'),
        //           children: [
        //             {
        //               path: '/siji',
        //               iconCls: 'fa fa-server',
        //               name: 'menu4-1',
        //               component: () => import('@/views/duoji/siji'),
        //               children: []
        //             },
        //             {
        //               path: '/siji1',
        //               iconCls: 'fa fa-server',
        //               name: 'menu4-2',
        //               component: import('@/views/commerViews'),
        //               children: [
        //                 {
        //                   path: '/wuji',
        //                   iconCls: 'fa fa-server',
        //                   name: 'menu5-1',
        //                   component: () => import('@/views/duoji/wuji'),
        //                   children: []
        //                 }
        //               ]
        //             }
        //           ]
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: '/',
        //   iconCls: 'fa fa-cloud-upload', // 图标样式class
        //   name: 'upload',
        //   component: () => import('@/views/layout/layout'),
        //   meta: {role: ['superAdmin']},
        //   children: [
        //     {
        //       path: '/upload',
        //       iconCls: 'el-icon-upload2', // 图标样式class
        //       name: 'fileUpload',
        //       component: () => import('@/views/upload/upload'),
        //       children: []
        //     }
        //   ]
        // },
        // {
        //   path: '/',
        //   iconCls: 'el-icon-edit', // 图标样式class
        //   name: 'editor',
        //   component: () => import('@/views/layout/layout'),
        //   meta: {role: ['superAdmin', 'admin']},
        //   children: [
        //     {
        //       path: '/markdown',
        //       iconCls: 'fa fa-file-code-o', // 图标样式class
        //       name: 'markdown',
        //       component: () => import('@/views/editor/markdownView'),
        //       children: []
        //     },
        //     {
        //       path: '/wangeditor',
        //       iconCls: 'fa fa-file-code-o', // 图标样式class
        //       name: 'wangeditor',
        //       component: () => import('@/views/editor/wangeditorView'),
        //       children: []
        //     }
        //   ]
        // },
        // {
        //   path: '/',
        //   iconCls: 'el-icon-setting', // 图标样式class
        //   name: 'systemSettings',
        //   component: () => import('@/views/layout/layout'),
        //   meta: {role: ['superAdmin']},
        //   children: [
        //     {
        //       path: '/navClassifies',
        //       iconCls: 'el-icon-menu', // 图标样式class
        //       name: 'navMenu',
        //       component: () => import('@/views/syssetting/navClassify'),
        //       children: []
        //     }
        //   ]
        // },
        {
          path: '/',
          iconCls: 'el-icon-setting', // 图标样式class
          name: 'systemSettings',
          component: () => import('@/views/layout/layout'),
          children: [
            {
              path: '/bannerSetting',
              iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'bannerSetting',
              component: () => import('@/views/systemSetting/bannerSetting'),
              children: []
            },
            {
              path: '/questionSetting',
              iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'questionSetting',
              component: () => import('@/views/systemSetting/questionSetting'),
              children: []
            },
            {
              path: '/agreementSetting',
              iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'agreementSetting',
              component: () => import('@/views/systemSetting/agreementSetting'),
              children: []
            },
            {
              path: '/noticeSetting',
              iconCls: 'el-icon-edit-outline', // 图标样式class
              name: 'noticeSetting',
              component: () => import('@/views/systemSetting/noticeSetting'),
              children: []
            },
            {
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
      commit('setRouters', newArr)

    }
  }
}

export default routerData
