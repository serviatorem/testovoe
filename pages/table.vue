<script setup lang="ts">

import SectionSettings from "~/components/section/SectionSettings.vue";
import BaseTab from "~/components/base/BaseTab.vue";
</script>

<template>
  <div class="table container">
    <SectionSettings/>
    <div class="table__tabs">
      <NuxtLink to="/table/general">
        <BaseTab>
          Общая
        </BaseTab>
      </NuxtLink>
      <NuxtLink to="/table/device">
        <BaseTab>
          Девайсов
        </BaseTab>
      </NuxtLink>
    </div>
    <div class="table__content">
      <NuxtPage/>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .table{
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
