# Route

In SPA, the client-side JavaScript can intercept the navigation, dynamically fetch new data, and update the current page without full page reloads.

The "routing" is done on the client side, in the browser.

It's recommended to use the officially-supported [Vue Router library](https://router.vuejs.org/)

## Demo

<script setup>
  import { defineClientComponent } from 'vitepress'

  const Demo = defineClientComponent(() => {
    return import('./demo/Index.vue')
  })

</script>
<DemoContainer>
  <Demo />
</DemoContainer>

## Usage

:::code-group
<<< ./demo/Index.vue

<<< ./demo/app.js

<<< ./demo/Home.vue

<<< ./demo/About.vue
:::
