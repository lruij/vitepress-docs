<script setup>
import { ref } from 'vue'
import ParentComp from './ParentComp.vue'

const isShow = ref(false)
const pEl = ref(null)

const update = () => {
  pEl.value?.more()
}

</script>

<template>
  <button @click="isShow = true">mounted</button>

  <button @click="isShow = false">unmounted</button>

  <button v-show="pEl" @click="update">updated</button>

  <ParentComp ref="pEl" v-if="isShow"></ParentComp>
</template>
