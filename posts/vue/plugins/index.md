# Plugins

Plugins are self-contained code that usually add app-level functionality to Vue.

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

::: code-group

<<< ./demo/Index.vue

<<< ./demo/app.js

<<< ./demo/i18n.js

:::
