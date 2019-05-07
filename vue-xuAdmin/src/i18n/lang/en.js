/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */

import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
  routeNmae: {
    home: 'home',
    article: 'article',
    publishArticle: 'publishArticle',
    publishArticleEditor: 'publishArticle',
    articleList: 'articleList',
    addUser: 'addUser',
    editUser: 'editUser',
    userList: 'userList',
    commentList: 'commentList',
    userManage: 'userManage',
    editPassworld: 'editPassworld',


    editor: 'editor',
    markdown: 'markdown',
    wangeditor: 'wangeditor',

    systemSettings: 'systemSettings',
    navMenu : 'navMenu',
    systemManage: "systemManage",
    organizeManage: "organizeManage",
    unitManage: "unitManage",
    personnelManage: "personnelManage",
    roleManage: "roleManage",
    systemSetting: "systemSetting",
  },
  rightMenu: {
    close: 'close',
    closeOther: 'closeOther',
    closeAll: 'closeAll'
  },
  role: {
    superAdmin: 'superAdmin',
    admin: 'admin',
    ordinary: 'ordinary'
  },
  userDropdownMenu: {
    basicInfor: 'basicInfor',
    changePassword: 'changePassword',
    logout: 'logout'
  },

  ...enLocale   //  合并element-ui内置翻译
}

export default en
