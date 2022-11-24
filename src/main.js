import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './assets/js/config'
import ToastProps from './components/basic/ToastProps.vue'

const app = createApp(App)
app.component('ToastProps', ToastProps)

app.config.globalProperties.$config = config
app.use(store).use(router).mount('#app')
