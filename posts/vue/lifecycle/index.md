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


## Demo

<script setup>
  import Demo from './demo/Index.vue'
</script>
<DemoContainer>
  <Demo/>
</DemoContainer>


## Usage
::: code-group

<<< ./demo/Index.vue

<<< ./demo/ParentComp.vue

<<< ./demo/ChildComp.vue

:::

