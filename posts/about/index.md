---
layout: doc
title: About
description: Web and Mobile Applications Testing and Developing.

head:
  - ['meta', {property: 'og:title', content:  'About' }]
  - ['meta', {property: 'og:url', content:  'https://lruij.github.io/about/' }]
  - ['meta', {name: 'twitter:title', content: 'About'}]
  - ['link', {rel: 'canonical', href: 'https://lruij.github.io/about/'}]
---

# About Me

Hello, I'm Jerry, and I appreciate you taking the time to visit!

**Here are a few lines to introduce myself:**

- I have many years of experience in front-end development, as a software designer, a role I am truly passionate about.
- I take pleasure in engaging in outdoor workouts, such as biking, photos and leisurely walks.

## Knowledge

- HTML, CSS, and JavaScript
- Exploratory Testing for Web and Mobile Applications
- Essential Website Optimization
- Static Website Design

## About Website

Developed using [VitePress](https://vitepress.dev/), the code is hosted on GitHub, using the MIT license.

## Contact

Email: 1012232443@qq.com

<VPTeamMembers size="small" :members="members" />

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/17046447?v=4',
    name: 'Jerry',
    title: 'SDE',
    links: [
      { icon: 'github', link: 'https://github.com/lruij' }
    ]
  },

]
</script>
