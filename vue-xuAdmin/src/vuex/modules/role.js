import store from "../index"

export default {
  state: {
    info: "" // 每次刷新都要通过token请求个人信息来筛选动态路由
  },
  mutations: {
    getInfo (state, data) {
      if (data.authorityRouter) {
        data.authorityRouter = data.authorityRouter.indexOf(",") !== -1 ? data.authorityRouter.split(",") : new Array(data.authorityRouter)
      } else {
        data.authorityRouter = []
      }

      if (data.permissionButton) {
        data.permissionButton = data.permissionButton.indexOf(",") !== -1 ? data.permissionButton.split(",") : new Array(data.permissionButton)
      } else {
        data.permissionButton = []
      }

      state.info = {
        role: data.role,
        name: data.name,
        authorityRouter: data.authorityRouter,
        permissionButton: data.permissionButton,
        avatar: data.avatar ? data.avatar : "/static/images/logo.png",
        uid: data.id
      }
      localStorage.setItem("info", JSON.stringify(store.getters.info))
    }
  },

  actions: {
    getInfo ({commit}, data) {
      commit("getInfo", data)
    }
  }
}
