<script setup lang="ts">
import BaseTab from "~/components/base/BaseTab.vue";
import BaseInputDate from "~/components/base/BaseInputDate.vue";
import {useMetricStore} from "~/store/store";
import {storeToRefs} from "pinia";

const store = useMetricStore()
const { dateMax, dateStart, dateEnd } = storeToRefs(store)
</script>

<template>
  <section class="settings">
    <div class="settings__tabs">
      <BaseTab>
        Таблица
      </BaseTab>
      <BaseTab>
        Графики
      </BaseTab>
    </div>
    <div class="settings__filter">
      <BaseInputDate :dateMax="dateEnd" v-model="dateStart" text="Начало"/>
      <BaseInputDate :dateMax="dateMax.slice(0,10)" v-model="dateEnd" text="Конец"/>
    </div>
  </section>
</template>

<style scoped lang="scss">
.settings {
  align-self: flex-start;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  &__tabs {
    display: flex;
    gap: adpval(15, 30);
  }

  &__filter {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
