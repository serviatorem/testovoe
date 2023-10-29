<script setup lang="ts">
import TheHeader from '~/components/header/TheHeader.vue'
useHead({
  meta : [
    {
      "http-equiv": "Content-Security-Policy",
      content: "upgrade-insecure-requests"
    }
  ]
})
</script>

<template>
  <div class="layout-default">
    <TheHeader />
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout-default {
  width: 100dvw;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: $background;
}
.main{
  padding: 30px 0;
  width: 100%;
}
</style>
