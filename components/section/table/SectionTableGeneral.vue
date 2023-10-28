<script setup lang="ts">
import {useMetricStore} from "~/store/store";
import BaseTableItem from "~/components/base/BaseTableItem.vue";
import type {IMetric} from "~/interfaces/IMetric";
import BaseSpinner from "~/components/base/baseSpinner.vue";

const store = useMetricStore()
const metricsStore = ref(await store.getMetrics())
const dateStore = ref();
if (metricsStore.value) {
  dateStore.value = store.getMetricDate(metricsStore.value)
}
const show = ref<boolean>(true)
const error = ref('');
watch([() => store.dateStart, () => store.dateEnd], async () => {
  show.value = false;
  const metricNewStore = await store.getMetrics()
  const {errorText, metric} = await store.validateMetric(metricNewStore)
  error.value = errorText;
  metricsStore.value = metric;
  dateStore.value = metricsStore.value ? store.getMetricDate(metricsStore.value) : false
  show.value = true;
})
</script>

<template>
  <section
      class="tableGeneral"
      v-if="show"
  >
    <span class="text error">{{ error }}</span>
    <div class="tableGeneral__title__wrapper">
      <h2 class="tableGeneral__title h2">Общая таблица</h2>

    </div>
    <div class="tableGeneral__header">
      <BaseTableItem text="Дата захода" border="right"/>
      <BaseTableItem text="Кол-во пользователей" border="right"/>
      <BaseTableItem text="Кол-во новых пользователей"/>
    </div>
    <div class="tableGeneral__body">
      <div
          class="tableGeneral__body__item"
          v-for="date in dateStore"
      >

        <BaseTableItem :text="date" border="top | right"/>
        <BaseTableItem :text="store.getMetricUserByDate(metricsStore<IMetric>,date)" border="top | right"/>
        <BaseTableItem :text="store.getMetricNewUserByDate(metricsStore<IMetric>, date)" border="top"/>
      </div>
    </div>
    <div class="tableGeneral__footer">
      <BaseTableItem text="Итого:" border="right | top"/>
      <BaseTableItem :text="store.getMetricAllUser(metricsStore<IMetric>)" border="right | top"/>
      <BaseTableItem :text="store.getMetricAllNewUser(metricsStore<IMetric>)" border="top"/>
    </div>
  </section>
  <BaseSpinner v-if="!show"/>
</template>

<style scoped lang="scss">
.tableGeneral {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  &__title {
    margin-bottom: 30px;
  }

  &__header, &__footer, &__body__item {
    display: grid;
    grid-template-columns: repeat(3, 33.3%);
  }
}
</style>
