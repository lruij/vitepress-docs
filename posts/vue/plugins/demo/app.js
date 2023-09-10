import { getCurrentInstance } from "vue";
import i18nPlugin from './i18n'

export function initPlugin() {
  const instance = getCurrentInstance()

  const app = instance.appContext.app
  if (app.config.globalProperties.$translate) return
  app.use(i18nPlugin, {
    'zh-n': {
      hello: "你好"
    }
  })
}
