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
