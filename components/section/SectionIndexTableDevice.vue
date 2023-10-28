<script setup lang="ts">
import {useMetricStore} from "~/store/store";
import BaseTableItem from "~/components/base/BaseTableItem.vue";
import type {IMetric} from "~/interfaces/IMetric";
import {storeToRefs} from "pinia";
const store = useMetricStore()
const metricsStore = ref<[IMetric] | false>(await store.getMetrics())
const dateStore = ref();
const error = ref();
const { search } = storeToRefs(store)
if (metricsStore.value){
  dateStore.value = store.getMetricDate(metricsStore.value)
}
watch(() => store.search, async () => {
  if (search.value){
    metricsStore.value = await store.getNewMetric();
    if (metricsStore.value){
      error.value = '';
      dateStore.value = store.getMetricDate(metricsStore.value)
    }else{
      error.value = 'Некорректно выбрана дата'
      metricsStore.value = await store.getDefaultMetric();
      if (metricsStore.value){
        dateStore.value = store.getMetricDate(metricsStore.value)
      }
    }
    store.switchAfterSearch()
  }

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
        <BaseTableItem :text="metricsStore && store.getMetricByDate(metricsStore,date)" border="top | right" />
        <BaseTableItem :text="metricsStore && store.getMetricDeviceByDate(metricsStore,'PC',date)" border="top | right" />
        <BaseTableItem :text="metricsStore && store.getMetricDeviceByDate(metricsStore,'TABLET',date)" border="top | right" />
        <BaseTableItem :text="metricsStore && store.getMetricDeviceByDate(metricsStore,'MOBILE',date)" border="top" />
      </div>
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
  &__header,&__body__item{
    display: grid;
    grid-template-columns: repeat(5,20%);
  }
}
</style>
