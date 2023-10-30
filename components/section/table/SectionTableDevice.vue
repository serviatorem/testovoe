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
const prevMonth = ref(await store.getPrevMonthMetric(dateStore.value))
const prevError = ref()
watch([() => store.dateStart, () => store.dateEnd], async () => {
  show.value = false;
  const metricNewStore = await store.getMetrics()
  const {errorText, metric} = await store.validateMetric(metricNewStore)
  error.value = errorText;
  metricsStore.value = metric;
  dateStore.value = metricsStore.value ? store.getMetricDate(metricsStore.value) : false
  prevMonth.value = await store.getPrevMonthMetric(dateStore.value)
  show.value = true;
})
</script>

<template>
  <section
      class="tableDevice"
      v-if="show"
  >
    <span class="text error">{{error}}</span>
    <h2 class="tableDevice__title h2">Таблица устройств</h2>
    <div class="tableDevice__header">
      <BaseTableItem text="Дата захода" border="right" />
      <BaseTableItem text="Кол-во пользователей" border="right" />
      <BaseTableItem text="Пк" border="right" />
      <BaseTableItem text="Планшет" border="right" />
      <BaseTableItem text="Телефон" />
    </div>
    <div class="tableDevice__body">
      <div
          class="tableDevice__body__item"
          v-for="date in dateStore"
      >
        <BaseTableItem :text="date" border="top | right" />
        <BaseTableItem :text="store.getMetricUserByDate(metricsStore,date)" border="top | right" />
        <BaseTableItem :text="store.getMetricDeviceByDate(metricsStore,'PC',date)" border="top | right" />
        <BaseTableItem :text="store.getMetricDeviceByDate(metricsStore,'TABLET',date)" border="top | right" />
        <BaseTableItem :text="store.getMetricDeviceByDate(metricsStore,'MOBILE',date)" border="top" />
      </div>
    </div>
    <div class="tableDevice__footer">
      <BaseTableItem text="Итого:" border="right | top" />
      <BaseTableItem :text="store.getMetricAllUser(metricsStore<IMetric>)" border="right | top" />
      <BaseTableItem :text="store.getMetricAllDevice(metricsStore<IMetric>,'PC')" border="right | top" />
      <BaseTableItem :text="store.getMetricAllDevice(metricsStore<IMetric>,'TABLET')" border="right | top" />
      <BaseTableItem :text="store.getMetricAllDevice(metricsStore<IMetric>,'MOBILE')" border="top" />
    </div>
  </section>
  <BaseSpinner v-if="!show"/>
</template>

<style scoped lang="scss">
.tableDevice{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  min-width: 1200px;
  &__title{
    margin-bottom: 30px;
  }
  &__header,&__body__item, &__footer{
    display: grid;
    grid-template-columns: repeat(5,20%);
  }
}
</style>
