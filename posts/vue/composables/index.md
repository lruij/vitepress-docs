# Composables

In the context of Vue applications, a "composable" is a function that leverages Vue's Composition API to **encapsulate** and **reuse** stateful logic.

The composables function name is starts with the `use` prefix

## Demo

<script setup>
  import Demo from './demo/Index.vue'
</script>
<DemoContainer>
  <Demo />
</DemoContainer>

## Usage

:::code-group

<<< ./demo/Index.vue

<<< ./demo/useMouse.js

<<< ./demo/event.js

:::
