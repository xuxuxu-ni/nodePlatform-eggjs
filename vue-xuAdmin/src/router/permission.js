//  获取角色信息，根据用户权限动态加载路由
import NProgress from "nprogress"
import router from "./index"
import store from "../vuex"
import fetchUser from "@/api/apis/user"

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token && store.getters.token !== "undefined") {
    if (to.path === "/login") {
      next({path: "/"})
    } else {
      if (!store.getters.info) {
        (async function getAddRouters () {
          fetchUser.fetchGetUserInfo().then(async function (response) {
            await store.dispatch("getInfo", response.data)
            await store.dispatch("newRoutes", store.getters.info.authorityRouter)
            let newAddRouters = store.getters.addRouters
            await router.addRoutes(newAddRouters)
            next({path: to.path})
          }).catch(function (error) {
            console.log(error)
          })
        }())
      } else {
        let is404 = to.matched.some(record => {
          console.log(record)
          if (record.meta.role) {
            return store.getters.info.authorityRouter === -1
          }
        })
        if (is404) {
          next({path: "/404"})
          return false
        }
        next()
      }
    }
  } else {
    if (to.path === "/login") {
      next()
    }
    next({path: "/login"})
  }
})

router.afterEach(() => {
  NProgress.done()
})
