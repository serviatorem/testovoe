<script setup lang="ts">
import SectionIndexSettings from "~/components/section/SectionIndexSettings.vue";
import {useMetricStore} from "~/store/store";
import {storeToRefs} from "pinia";
import SectionIndexTableGeneral from "~/components/section/SectionIndexTableGeneral.vue";
import SectionIndexTableDevice from "~/components/section/SectionIndexTableDevice.vue";

const store = useMetricStore()
const { table, general } = storeToRefs(store)
</script>

<template>
  <section class="index-screen container">
    <SectionIndexSettings />
    <SectionIndexTableGeneral v-if="table && general"/>
    <SectionIndexTableDevice v-if="table && !general"/>
  </section>
</template>

<style scoped lang="scss">
.index-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: adpval(80, 120);
}
</style>
