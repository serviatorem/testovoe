<script setup lang="ts">
import SectionIndexSettings from "~/components/section/SectionIndexSettings.vue";
import {useMetricStore} from "~/store/store";
import {storeToRefs} from "pinia";
import SectionIndexTable from "~/components/section/SectionIndexTable.vue";

const store = useMetricStore()
const {table} = storeToRefs(store)
</script>

<template>
  <section class="index-screen container">
    <SectionIndexSettings/>
    <SectionIndexTable/>
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
