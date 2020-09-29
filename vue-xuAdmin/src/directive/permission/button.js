/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/15
 * Description: 文件描述
 */
export default {
  install (Vue, options) {
    Vue.directive("roleBtn", {
      componentUpdated: function (el, binding) {
        let btnId = binding.value
        let userInfo = JSON.parse(localStorage.getItem("info"))
        if ((btnId && userInfo.permissionButton.indexOf(btnId) !== -1) || userInfo.role === "超级管理员") {
          return false
        } else {
          el.parentNode.removeChild(el)
        }
      },
      inserted: function (el, binding) {
        let btnId = binding.value
        let userInfo = JSON.parse(localStorage.getItem("info"))
        if ((btnId && userInfo.permissionButton.indexOf(btnId) !== -1) || userInfo.role === "超级管理员") {
          return false
        } else {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}
