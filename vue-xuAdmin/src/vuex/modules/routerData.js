/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019/5/8
 * Description: 文件描述
 */
import {defaultRouter, addRouter} from "@/router/index"
import store from "../index"

const routerData = {
  state: {
    routers: [],
    addRouters: [],
    roleData: []
  },
  mutations: {
    setRouters: (state, routers) => {
      state.addRouters = routers // 保存动态路由用来addRouter
      state.routers = defaultRouter.concat(routers) // 所有有权限的路由表，用来生成菜单列表
    },
    setRoleData: (state, roleData) => {
      state.roleData = roleData
    }
  },
  actions: {
    async newRoutes ({commit}, perRouter) {
      //  通过递归路由表，删除掉没有权限的路由
      function eachSelect (routers, userRole, type) {
        for (let j = 0; j < routers.length; j++) {
          if (routers[j].r_id && userRole.indexOf(routers[j].r_id.toString()) === -1 && store.getters.info.role !== "超级管理员") {
            routers.splice(j, 1)
            j = j - 1
          }
          if (routers[j] && routers[j].children && routers[j].children.length) {
            if (routers[j].children[0].type !== "button") {
              eachSelect(routers[j].children, userRole, type)
            } else if (type === "setRouters") {
              routers[j].children = []
            } else if (store.getters.info.role !== "超级管理员") {
              let btnPer = JSON.parse(localStorage.getItem("info")).permissionButton
              routers[j].children.forEach(function (item, index) {
                if (btnPer.indexOf(item.r_id) === -1) {
                  routers[j].children.splice(index, 1)
                }
              })
            }
          }
        }
        return routers
      }

      let newRoleData = JSON.parse(JSON.stringify(addRouter))
      eachSelect(newRoleData, perRouter)
      commit("setRoleData", newRoleData)

      eachSelect(addRouter, perRouter, "setRouters")
      commit("setRouters", addRouter)
    }
  }
}

export default routerData
