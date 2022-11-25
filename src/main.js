import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './assets/js/config'
import ToastProps from './components/basic/ToastProps.vue'

// mock 开关
const mock = true
if (mock) {
  // 使用 require 而不使用 import 防止预编译
  require('./mock/mock.js')
}

const app = createApp(App)
app.component('ToastProps', ToastProps)

app.config.globalProperties.$config = config
app.use(store).use(router).mount('#app')
