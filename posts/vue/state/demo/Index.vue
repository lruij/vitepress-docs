<script setup>
import { initPlugin } from './app'
import { useCounterStore } from './counter'

initPlugin()

const counter = useCounterStore()
// watch the state and its changes
counter.$subscribe((mutation, state) => {
  console.log(mutation, state);
})

counter.$onAction(({name, store, args, after, onError}) => {
   // a shared variable for this specific action call
  const startTime = Date.now()
  // this will trigger before an action on `store` is executed
  console.log(`Start "${name}" with params [${args.join(', ')}].`)

  // this will trigger if the action succeeds and after it has fully run.
  // it waits for any returned promised
  after((result) => {
    console.log(
      `Finished "${name}" after ${Date.now() - startTime
      }ms.\nResult: ${result}.`
    )
  })
  // this will trigger if the action throws or returns a promise that rejects
  onError((error) => {
    console.warn(
      `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
    )
  })
})

function increment() {
  // value operation
  counter.count++
  // with autocompletion ✨
  counter.$patch({ count: counter.count + 1 })
  // or using an action instead
  counter.increment()
}

</script>

<template>
  <!-- Access the state directly from the store -->
  <div>Current Count: {{ counter.count }} : {{ counter.ncount }}</div>
  <button @click="increment">increment</button>
  <button @click="counter.$reset">reset</button>

</template>
