# Custom Directives

Custom directives are mainly intended for reusing logic that involves low-level DOM access on plain elements.


- **Type**

```ts

export type Directive<T = any, V = any> =
  | ObjectDirective<T, V>
  | FunctionDirective<T, V>

```

## ObjectDirective

A directive definition object can provide several hook functions

In `<script setup>`, any camelCase variable that starts with the `v` prefix can be used as a custom directive.

- **Type**

```ts

export interface ObjectDirective<T = any, V = any> {
  created?: DirectiveHook<T, null, V>
  beforeMount?: DirectiveHook<T, null, V>
  mounted?: DirectiveHook<T, null, V>
  beforeUpdate?: DirectiveHook<T, VNode<any, T>, V>
  updated?: DirectiveHook<T, VNode<any, T>, V>
  beforeUnmount?: DirectiveHook<T, null, V>
  unmounted?: DirectiveHook<T, null, V>
  getSSRProps?: SSRDirectiveHook
  deep?: boolean
}

```


- **Demo**

```vue
<script setup>
// enables v-hello in templates
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```


## FunctionDirective

It's common for a custom directive to have the same behavior for `mounted` and `updated`, with no need for the other hooks.


- **Type**

```ts

export interface DirectiveBinding<V = any> {
  instance: ComponentPublicInstance | null
  value: V
  oldValue: V | null
  arg?: string
  modifiers: DirectiveModifiers
  dir: ObjectDirective<any, V>
}

export type DirectiveHook<T = any, Prev = VNode<any, T> | null, V = any> = (
  el: T,
  binding: DirectiveBinding<V>,
  vnode: VNode<any, T>,
  prevVNode: Prev
) => void


export type FunctionDirective<T = any, V = any> = DirectiveHook<T, any, V>

```

- **Demo**

```vue-html
<div v-color:border.show="color"></div>
```

```js
const app = createApp({})

app.directive('color', (el, binding) => {
  // this will be called for both `mounted` and `updated`
  el.style.color = binding.value

  let b = binding.args
  let b_show = binding.modifiers.show

  if (b && b_show) {
    el.style.border = `1px solid ${binding.value}`
  }
})
```
