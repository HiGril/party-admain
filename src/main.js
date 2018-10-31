// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import "normalize.css/normalize.css" //引入初始化样式
import "normalize.css"
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import Axios from "./axios/index"
import "./style/common.css"


import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from "./store/index"


Vue.config.productionTip = false

Vue.prototype.$axios = Axios
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,

  components: { App },
  template: '<App/>'
})
