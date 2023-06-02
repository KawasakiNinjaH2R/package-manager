<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div style="display: flex">
      <!-- <BaseSide /> -->
      <div class="app-container-view">
        <!-- <HelloWorld msg="Hello Vue 3.0 + Element Plus + Vite" /> -->
        <router-view v-if="isRouterAlive"></router-view>
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
  import { nextTick, provide, ref } from 'vue';

  const isRouterAlive=ref(true)
  const reload = ()=>{
    isRouterAlive.value=false
    location.reload()
    nextTick(()=>{
      isRouterAlive.value=true
    })
  }
  provide('reload',reload)
</script>

<style>
  #app {
    text-align: center;
    color: var(--ep-text-color-primary);
  }

  .app-container-view{
    width: 100%;
    background:url('./assets/website1.jpg') repeat-x top center,linear-gradient(105deg,#ffffff 0%,#b4ffb1 79%);
    background-size: auto 29vh;
  }

  .element-plus-logo {
    width: 50%;
  }
</style>
