import { defineConfig } from 'vitepress'
import { resolve } from 'node:path'
import { MarkdownTransform } from './plugins/markdownTransform'
import Components from 'unplugin-vue-components/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LuffyFE",
  description: "shared something with life",
  srcDir: 'posts',
  base: '/vitepress-docs/',
  lastUpdated: true,
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ]
  ],
  themeConfig: {
    logo: { src: '/logo.svg' },
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Tutorials',
        link: '/tutorials/'
      },
    ],

    sidebar: {
      '/vue/': [
        {
          text: 'Vue',
          link: '/vue/',
          items: [
            {
              text: 'Lifecycle', link: '/vue/lifecycle/'
            },
            {
              text: 'Reactivity', link: '/vue/reactivity/'
            },
            {
              text: 'Injection', link: '/vue/injection/'
            },
            {
              text: 'Directives', link: '/vue/directives/'
            },
            {
              text: 'Composables', link: '/vue/composables/'
            },
            {
              text: 'Plugins', link: '/vue/plugins/'
            },
            {
              text: 'State', link: '/vue/state/'
            },
            {
              text: 'Route', link: '/vue/route/'
            },
            {
              text: 'Test', link: '/vue/test/'
            }
          ]
        }
      ]
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2017-${new Date().getFullYear()} LuffyFE`
    },
  },
  vite: {
    plugins: [
      MarkdownTransform(),
      Components({
        dirs: resolve(__dirname, './theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: './components.d.ts',
        transformer: 'vue3',
      })
    ]
  }
})
