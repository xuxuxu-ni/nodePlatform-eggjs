/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */

import enLocale from "element-ui/lib/locale/lang/en"
const en = {
  routeName: {
    home: "home",
    article: "article",
    publishArticle: "publishArticle",
    publishArticleEditor: "publishArticle",
    articleList: "articleList",
    userList: "userList",
    commentList: "commentList",
    userManage: "userManage",
    editPassword: "editPassword",
    demo: "demo",

    editor: "editor",
    markdown: "markdown",
    wangeditor: "wangeditor",

    systemSettings: "systemSettings",
    systemManage: "systemManage",
    unitManage: "unitManage",
    roleManage: "roleManage",
    systemSetting: "systemSetting"
  },
  rightMenu: {
    close: "close",
    closeOther: "closeOther",
    closeAll: "closeAll"
  },
  role: {
    superAdmin: "superAdmin",
    admin: "admin",
    ordinary: "ordinary"
  },
  userDropdownMenu: {
    basicInfo: "basicInfo",
    changePassword: "changePassword",
    logout: "logout"
  },

  ...enLocale //  合并element-ui内置翻译
}

export default en
