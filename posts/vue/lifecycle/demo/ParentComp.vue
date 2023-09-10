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
  console.log('Parent onUpdated')
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
  <p>ParentComp: {{ name }}</p>
  <ul v-for="(item, index) in data" :key="index">
    <ChildComp :name="item + ''"/>
  </ul>

</template>
