import { getCurrentInstance } from "vue";
import { createPinia } from 'pinia'

export function initPlugin() {
  const instance = getCurrentInstance()
  const app = instance.appContext.app

  if (app.config.globalProperties.$pinia) return
  const pinia = createPinia()
  app.use(pinia)
}
