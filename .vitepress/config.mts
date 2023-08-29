import { defineConfig } from 'vitepress'

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
          text: 'Composition API',
          link: '/vue/',
          items: [
            {
              text: 'Reactivity API', link: '/vue/reactivity-api/'
            },
            {
              text: 'Lifecycle Hooks', link: '/vue/lifecycle-hooks/'
            },
            {
              text: 'Dependency Injection', link: '/vue/dependency-injection/'
            }
          ]
        },
        {
          text: 'Vite',
          link: '',
          items: [
            {
              text: '', link: ''
            }
          ]
        },
        {
          text: 'Pinia',
          link: '',
          items: [
            {
              text: '', link: ''
            }
          ]
        },
        {
          text: 'VueUse',
          link: '',
          items: [
            {
              text: '', link: ''
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
  }
})
