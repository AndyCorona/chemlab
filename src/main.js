import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './assets/js/config'

const app = createApp(App)
app.config.globalProperties.$config = config
app.use(store).use(router).mount('#app')
