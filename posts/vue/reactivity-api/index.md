# Reactivity API

It allows us to directly create reactive state, computed state, and watchers.

## `ref()`

Refs can hold any value type, including deeply nested objects, arrays, or JavaScript built-in data structures, and will make its value deeply reactive.

::: code-group

```vue [primitive value]
<script setup>

// import
import { ref } from 'vue'

// create
const count = ref(0)

// get
console.log(count.value)

// set
const add = () => count.value++

</script>

<template>
  // using the ref in the template is not need to append .value
  <button @click="add"> {{count}} </button>
</template>
```

```vue [non-primitive value]

<script setup>
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar'],
  maps: new Map([['count', 100]])
})

function mutateDeeply() {
  obj.value.nested.count++
  obj.value.arr.push('baz')
  obj.value.maps.set('count', 1000)
}
</script>

<template>
  <p>{{obj.nested.count}}</p>
  <button @click="mutateDeeply">commit</button>
</template>

```


``` ts [Type]

export function ref<T extends Ref>(value: T): T
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>

```

``` ts [Code]

export function ref(value?: unknown) {
  return createRef(value, false)
}

function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}

class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(
    value: T,
    public readonly __v_isShallow: boolean
  ) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newVal) {
    const useDirectValue =
      this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal)
      triggerRefValue(this, newVal)
    }
  }
}


```

:::

## `reactive()`

Unlike a ref which wraps the inner value in a special object, reactive() makes an object itself reactive

::: code-group

``` vue [non-primitive value]

<script setup>
// import
import { reactive } from 'vue'

// create
const obj = reactive({
  name: 'foo',
  age: 20,
  hobbys: ['biking', ref('swiming')],
  scores: new Map([['math', ref(60)]])
})

// get
console.log(obj.name, obj.age, obj.hobbys[0])

// PS:
// no unwrapping performed when the ref is accessed as
// an element of a reactive array or a native collection type
console.log(obj.hobbys[1].value, obj.scores.get('math').value)

// set
const updateName = (name) => obj.name = name

</script>

<template>
  <p>{{obj.name}}</p>
  <button @click="updateName">update</button>
</template>
```

```ts [Type]
export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

```ts [Code]
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}
```

:::


::: info
If the entire responsive object is modified, the value will be updated, but the interface will not be updated.

``` js [script setup]

import { ref, reactive } from 'vue'

let data = ref([{ id: 0, model: 'login'}])
let user = reactive({id: 1, name: 'admin'})

// Not recommended
data = ref([id: 1, model: 'logout'])
user = reactive({id: 2, name: 'test'})

```
:::

## `computed()`

Takes a getter function and returns a *readonly* reactive ref object for the returned value from the getter. It can also take an object with get and set functions to create a *writable* ref object.

::: code-group

```vue [readonly]

<scirpt setup>

const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

// error
plusOne.value++ //[!code error]
</scirpt>

```

```vue [writable]

<script setup>

const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0

</script>

```

``` ts [Type]

export function computed<T>(
  getter: ComputedGetter<T>,
  debugOptions?: DebuggerOptions
): ComputedRef<T>
export function computed<T>(
  options: WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions
): WritableComputedRef<T>

```

``` ts [Code]

export class ComputedRefImpl<T> {
  public dep?: Dep = undefined

  private _value!: T
  public readonly effect: ReactiveEffect<T>

  public readonly __v_isRef = true
  public readonly [ReactiveFlags.IS_READONLY]: boolean = false

  public _dirty = true
  public _cacheable: boolean

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
    isReadonly: boolean,
    isSSR: boolean
  ) {
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    })
    this.effect.computed = this
    this.effect.active = this._cacheable = !isSSR
    this[ReactiveFlags.IS_READONLY] = isReadonly
  }

  get value() {
    // the computed ref may get wrapped by other proxies e.g. readonly() #3376
    const self = toRaw(this)
    trackRefValue(self)
    if (self._dirty || !self._cacheable) {
      self._dirty = false
      self._value = self.effect.run()!
    }
    return self._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }
}

export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions,
  isSSR = false
) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>

  const onlyGetter = isFunction(getterOrOptions)
  if (onlyGetter) {
    getter = getterOrOptions
    setter = __DEV__
      ? () => {
          console.warn('Write operation failed: computed value is readonly')
        }
      : NOOP
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR)
  if (__DEV__ && debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack
    cRef.effect.onTrigger = debugOptions.onTrigger
  }

  return cRef as any
}

```

:::

## `watch()`

Watches one or more reactive data sources and invokes a callback function when the sources change.

::: code-group

```vue [Demo]

<script setup>

import { ref, reactive, watch } from 'vue'

// A getter function that returns a value
// PS:
// When using a getter source,
// the watcher only fires if the getter's return value has changed
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  },
  { deep: true } // [!code ++] // add deep to fire deep mutations
)

// A ref
const num = ref(0)
watch(
  num,
  (val, oval) => {
    /* ... */
  }
)

// A reactive object
// PS:
// When directly watching a reactive object,
// the watcher is automatically in deep mode `{deep: true}`
const user = reactive({name: 'admin', password: '111'})
watch(
  user,
  (val, oval) => {
    /* ... */
  }
)

// an array of the above
watch(
  [state, num, user],
  ([s, n, u], [ps, pn, pu]) => {
    /* ... */
  }
)

// stopping the watcher when the watcher is no longer needed
const stop = watch(source, callbace)
stop()

</script>



```

```ts [Type]
// watching single source
function watch<T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): StopHandle

// watching multiple sources
function watch<T>(
  sources: WatchSource<T>[],
  callback: WatchCallback<T[]>,
  options?: WatchOptions
): StopHandle

type WatchCallback<T> = (
  value: T,
  oldValue: T,
  onCleanup: (cleanupFn: () => void) => void
) => void

type WatchSource<T> =
  | Ref<T> // ref
  | (() => T) // getter
  | T extends object
  ? T
  : never // reactive object

interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // default: false
  deep?: boolean // default: false
  flush?: 'pre' | 'post' | 'sync' // default: 'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

```

``` ts [Code]
export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: any,
  options?: WatchOptions<Immediate>
): WatchStopHandle {
  if (__DEV__ && !isFunction(cb)) {
    warn(
      `\`watch(fn, options?)\` signature has been moved to a separate API. ` +
        `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
        `supports \`watch(source, cb, options?) signature.`
    )
  }

  return doWatch(source as any, cb, options)
}

function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect | object,
  cb: WatchCallback | null,
  { immediate, deep, flush, onTrack, onTrigger }: WatchOptions = EMPTY_OBJ
): WatchStopHandle{
  //  ...

  const instance =
    getCurrentScope() === currentInstance?.scope ? currentInstance : null
  // const instance = currentInstance
  let getter: () => any
  let forceTrigger = false
  let isMultiSource = false

  if (isRef(source)) {
    getter = () => source.value
    forceTrigger = isShallow(source)
  } else if (isReactive(source)) {
    getter = () => source
    deep = true
  } else if (isArray(source)) {
    isMultiSource = true
    forceTrigger = source.some(s => isReactive(s) || isShallow(s))
    getter = () =>
      source.map(s => {
        if (isRef(s)) {
          return s.value
        } else if (isReactive(s)) {
          return traverse(s)
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, ErrorCodes.WATCH_GETTER)
        } else {
          __DEV__ && warnInvalidSource(s)
        }
      })
  } else if (isFunction(source)) {
    if (cb) {
      // getter with cb
      getter = () =>
        callWithErrorHandling(source, instance, ErrorCodes.WATCH_GETTER)
    } else {
      // no cb -> simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return
        }
        if (cleanup) {
          cleanup()
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          ErrorCodes.WATCH_CALLBACK,
          [onCleanup]
        )
      }
    }
  } else {
    getter = NOOP
    __DEV__ && warnInvalidSource(source)
  }

   // 2.x array mutation watch compat
  if (__COMPAT__ && cb && !deep) {
    const baseGetter = getter
    getter = () => {
      const val = baseGetter()
      if (
        isArray(val) &&
        checkCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance)
      ) {
        traverse(val)
      }
      return val
    }
  }

  if (cb && deep) {
    const baseGetter = getter
    getter = () => traverse(baseGetter())
  }

  let cleanup: () => void
  let onCleanup: OnCleanup = (fn: () => void) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, ErrorCodes.WATCH_CLEANUP)
    }
  }
  // ...
}

```

:::


## `watchEffect()`

Runs a function immediately while reactively tracking its dependencies and re-runs it whenever the dependencies are changed.

::: code-group

```vue [Demo]

<script setup>
import { ref, watchEffect } from 'vue'
const count = ref(0)

// normal use
watchEffect(() => console.log(count.value))
// -> logs 0

count.value++
// -> logs 1

// higher use
watchEffect(async (onCleanup) => {
  const { response, cancel } = doAsyncWork(id.value)
  // `cancel` will be called if `id` changes
  // so that previous pending request will be cancelled
  // if not yet completed
  onCleanup(cancel)
  data.value = await response
})


// option: post
// -> watchPostEffect()

watchEffect(() => {}, {
  flush: 'post'
})

watchPostEffect(() => {})

// option: async
// -> watchAsyncEffect()
watchEffect(() => {}, {
  flush: 'async'
})

watchAsyncEffect(() => {})


</script>

```

```ts [Type]

function watchEffect(
  effect: (onCleanup: OnCleanup) => void,
  options?: WatchEffectOptions
): StopHandle

type OnCleanup = (cleanupFn: () => void) => void

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // default: 'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

type StopHandle = () => void

```

```ts [Code]
// Simple effect.
export function watchEffect(
  effect: WatchEffect,
  options?: WatchOptionsBase
): WatchStopHandle {
  return doWatch(effect, null, options)
}

export function watchPostEffect(
  effect: WatchEffect,
  options?: DebuggerOptions
) {
  return doWatch(
    effect,
    null,
    __DEV__ ? extend({}, options as any, { flush: 'post' }) : { flush: 'post' }
  )
}

export function watchSyncEffect(
  effect: WatchEffect,
  options?: DebuggerOptions
) {
  return doWatch(
    effect,
    null,
    __DEV__ ? extend({}, options as any, { flush: 'sync' }) : { flush: 'sync' }
  )
}


```

:::
