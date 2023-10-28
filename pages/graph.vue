<script setup lang="ts">

import SectionSettings from "~/components/section/SectionSettings.vue";
import BaseTab from "~/components/base/BaseTab.vue";
</script>

<template>
  <div class="graph container">
    <SectionSettings />
    <div class="graph__tabs">
      <NuxtLink to="/graph/general">
        <BaseTab>
          Общая
        </BaseTab>
      </NuxtLink>
      <NuxtLink to="/graph/device">
        <BaseTab>
          Девайсов
        </BaseTab>
      </NuxtLink>
    </div>
    <div class="graph__content">
      <NuxtPage/>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .graph{
    display: flex;
    flex-direction: column;
    gap: adpval(30, 50);
    &__tabs{
      display: flex;
      align-items: center;
      gap: adpval(15, 30);
    }
  }
</style>
