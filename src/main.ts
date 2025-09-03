import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
}
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, vueQueryOptions)
app.mount('#app')
