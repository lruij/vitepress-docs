# Lifecycle Hooks

Each Vue component instance goes through a series of initialization steps when it's created：

* set up data observation
* compile the template
* mount the instance to the DOM
* update the DOM when data changes

Along the way, it also runs functions called lifecycle hooks


<div align=center>
    <img src="https://cn.vuejs.org/assets/lifecycle.16e4c08e.png" style="width: 80%; height: 80%;">
</div>

## `onBeforeMount()`
Registers a hook to be called right before the component is to be mounted.

## `onMounted()`

It's used to run code after the component has finished the initial rendering and created the DOM nodes

## `onBeforeUpdate()`

Registers a hook to be called right before the component is about to update its DOM tree due to a reactive state change.

## `onUpdated()`

Registers a callback to be called after the component has updated its DOM tree due to a reactive state change.

## `onBeforeUnmount()`

Registers a hook to be called right before a component instance is to be unmounted.

## `onUnmounted()`

Registers a callback to be called after the component has been unmounted.


## `onActivated()`

Registers a callback to be called after the component instance is inserted into the DOM as part of a tree cached by `<KeepAlive>`.

## `onDeactivated()`

Registers a callback to be called after the component instance is removed from the DOM as part of a tree cached by `<KeepAlive>`.



::: code-group

```vue [App.vue]
<script setup>
import { ref } from 'vue'
import ParentComp from './ParentComp.vue'

const isShow = ref(false)

const pEl = ref(null)

const update = () => {
  pEl.value.more()
}

</script>

<template>
  <button @click="isShow = true">mounted</button>
  // Parent onBeforeMount
  // ChildComp onBeforeMount
  // ChildComp onMounted
  // Parent onMounted

  <button @click="update">updated</button>
  // Parent onBeforeUpdate
  // ChildComp onBeforeUpdate
  // ChildComp onUpdated
  // Parent onUpdate

  <button @click="isShow = false">unmounted</button>
  // Parent onBeforeUnmount
  // ChildComp onBeforeUnmount
  // ChildComp onUnmounted
  // Parent onUnmounted

  <ParentComp ref="pEl" v-if="isShow"></ParentComp>

</template>

```

```vue [ParentComp.vue]

<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
  reactive
} from 'vue'
import ChildComp from './ChildComp.vue'

const name = ref('Lifecle')

const data = reactive([
    1
])

onBeforeMount(() => {
  console.log('Parent onBeforeMount')
})

onMounted(() => {
  console.log('Parent onMounted')
})

onBeforeUpdate(() => {
  console.log('Parent onBeforeUpdate')
})

onUpdated(() => {
  console.log('Parent onUpdate')
})

onBeforeUnmount(() => {
  console.log('Parent onBeforeUnmount')
})

onUnmounted(() => {
  console.log('Parent onUnmounted')
})

const more = () => {
  data[0] = Math.random() * 1000
}

defineExpose(
  { more }
)

</script>

<template>
  <p>Parent: {{ name }}</p>
  <ul v-for="(item, index) in data" :key="index">
    <ChildComp :name="item + ''"/>
  </ul>

</template>

```

```vue [ChildComp.vue]
<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

const props = defineProps(
 {
    name: String
 }
)
onBeforeMount(() => {
  console.log('ChildComp onBeforeMount')
})

onMounted(() => {
  console.log('ChildComp onMounted')
})

onBeforeUpdate(() => {
  console.log('ChildComp onBeforeUpdate')
})

onUpdated(() => {
  console.log('ChildComp onUpdated')
})

onBeforeUnmount(() => {
  console.log('ChildComp onBeforeUnmount')
})

onUnmounted(() => {
  console.log('ChildComp onUnmounted')
})


</script>
<template>
  <p>ChildComp - {{ props.name }}</p>
</template>

```



