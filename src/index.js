
import { createApp } from 'vue'
import ElementPlus from 'element-plus';

import App from './App.vue'

let app = createApp(App)
app.use(ElementPlus)

app.directive('tresize', {
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

















app.mount("#app")