import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import './assets/mvp.css'

import {Tree,Input,Dialog,Button,Form,FormItem} from 'element-ui'
Vue.use(Tree)
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


Vue.directive('tresize', {
  bind (el, binding) {
    let width = ''
    let height = ''
    let className = ''
    // console.log(className)
    function get () {
      const style = document.defaultView.getComputedStyle(el)
      // console.log(style)
      if (width !== style.width || height !== style.height) {
        className = el.classList[0]
        binding.value({width, height, className})
        // console.log(el.classList)
      }
      width = style.width
      height = style.height
      className = style.className
    }

    el.__vueReize__ = setInterval(get, 400)
  },
  unbind (el) {
    clearInterval(el.__vueReize__)
  }
})


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')


// 隐藏开发模式console安全告警
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'