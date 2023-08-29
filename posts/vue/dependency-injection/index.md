# Dependenciy Injection

A parent component can serve as a dependency provider for all its descendants. Any component in the descendant tree, regardless of how deep it is, can inject dependencies provided by components up in its parent chain.


![Dependency Chain](https://vuejs.org/assets/provide-inject.3e0505e4.png)


## Provide

To provide data to a component's descendants

- **Type**

```ts

export function provide<T, K = InjectionKey<T> | string | number>(
  key: K,
  value: K extends InjectionKey<infer V> ? V : T
): void

```

- **Demo**

```vue

<script setup>

import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')

</script>

```



## Inject

To inject data provided by an ancestor component

- **Type**

```ts

export function inject<T>(key: InjectionKey<T> | string): T | undefined
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T,
  treatDefaultAsFactory?: false
): T
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T | (() => T),
  treatDefaultAsFactory: true
): T

```

- **Demo**

```vue

<script setup>

import { inject } from 'vue'

const message1 = inject(/* key */ 'message')

const message2 = inject(/* key */ 'message', /* defaultValue */ 'wow')

const message3 = inject(/* key */ 'message', /* defaultValue */ () => {}, /* treatDefaultAsFactory */ true)

</script>

```



## App-level Provide

In addition to providing data in a component, we can also provide at the app level

```js

import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'hello!')

```
