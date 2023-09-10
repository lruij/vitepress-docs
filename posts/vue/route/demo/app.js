import { getCurrentInstance } from "vue";
import { createRouter, createWebHashHistory } from 'vue-router'

export function initPlugin() {
  const instance = getCurrentInstance()

  const app = instance.appContext.app
  if (app.config.globalProperties.$router) return
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      { path: '/', name: 'Home', component: () => import('./Home.vue') }
    ]
  })

  router.addRoute({ path: '/about', name: 'About', component: () => import('./About.vue') })
  app.use(router)

  // console.log(router.getRoutes())
}
