<script setup lang="ts">
import {useMetricStore} from "~/store/store";
import BaseTableItem from "~/components/base/BaseTableItem.vue";
import type {IMetric} from "~/interfaces/IMetric";

const store = useMetricStore()
const metricsStore = ref<[IMetric] | string>(await store.getMetrics())
const dateStore = ref();
// @ts-ignore
dateStore.value = store.getMetricDate(metricsStore.value)

const error = ref('');
watch([() => store.dateStart, () => store.dateEnd], async () => {
  const metricNewStore = await store.getMetrics()
  const {errorText, metric} = await store.validateMetric(metricNewStore)
  error.value = errorText;
  metricsStore.value = metric;
// @ts-ignore
  dateStore.value = store.getMetricDate(metricsStore.value)
})
</script>

<template>
  <section class="tableDevice">
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
</template>

<style scoped lang="scss">
.tableDevice{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  &__title{
    margin-bottom: 30px;
  }
  &__header,&__body__item, &__footer{
    display: grid;
    grid-template-columns: repeat(5,20%);
  }
}
</style>
