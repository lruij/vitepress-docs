<script setup>
import { inject, ref, watchEffect, toValue } from 'vue'
import { initPlugin } from './app'

initPlugin()

const i18n = inject('i18n')
console.log(i18n)

const lang = ref('en')
const name = ref('hello')

function toTranslate(t) {
  lang.value = t
}

watchEffect(() => {
  name.value = lang.value === 'zh-n' ? instance.proxy.$translate(`${lang.value}.${toValue(name)}`) : 'hello'
})

</script>

<template>
  <button @click="toTranslate('zh-n')">
    zh-n
  </button>
  <button @click="toTranslate('en')">
    en
  </button>
  <div> {{ name }} </div>
</template>
