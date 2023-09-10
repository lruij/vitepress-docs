<script setup>
import { computed } from 'vue'
import { initPlugin } from './app'
import { useRoute, useRouter } from 'vue-router'


initPlugin()

const route = useRoute()
const router = useRouter()

const key = computed(() => {
  return route.path + Math.random()
})

const toPath = (p) => router.push({
  name: p
})
</script>

<template>
  <button @click="toPath('Home')">Home</button>
  <button @click="toPath('About')">About</button>
  <hr />
  <router-view :key="key"></router-view>
</template>
