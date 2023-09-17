# State

Multiple components share a common state by [Pinia](https://pinia.vuejs.org/)

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

<<< ./demo/counter.js
:::
