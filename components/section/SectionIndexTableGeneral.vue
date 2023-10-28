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
        dateStore.value = store.getMetricDate(metricsStore.value)
      }
      store.switchAfterSearch()
  }

})
</script>

<template>
  <section class="tableGeneral">
    <span class="text error">{{error}}</span>
    <h2 class="tableGeneral__title h2">Общая таблица</h2>
    <div class="tableGeneral__header">
      <BaseTableItem text="Дата захода" border="right" />
      <BaseTableItem text="Кол-во пользователей" />
    </div>
    <div class="tableGeneral__body">
      <div
          class="tableGeneral__body__item"
          v-for="date in dateStore"
      >

        <BaseTableItem :text="date" border="top | right" />
        <!-- @ts-ignore -->
        <BaseTableItem :text="metricsStore && store.getMetricByDate(metricsStore<IMetric>,date)" border="top" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .tableGeneral{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    &__title{
      margin-bottom: 30px;
    }
    &__header{
      display: grid;
      grid-template-columns: repeat(2,50%);
    }
    &__body{
      &__item{
        display: grid;
        grid-template-columns: repeat(2,50%);
      }
    }
  }
</style>
