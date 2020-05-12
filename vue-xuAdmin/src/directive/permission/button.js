/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/15
 * Description: 文件描述
 */
export default {
  install (Vue, options) {
    Vue.directive("roleBtn", {
      inserted: function (el, binding) {
        let btnId = binding.value
        let userBtnPer = JSON.parse(localStorage.getItem("info")).permissionButton
        if (btnId && userBtnPer.indexOf(btnId) !== -1) {
          debugger
          return false
        } else {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}

