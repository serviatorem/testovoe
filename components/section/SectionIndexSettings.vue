<script setup lang="ts">
import BaseTab from "~/components/base/BaseTab.vue";
import BaseInputDate from "~/components/base/BaseInputDate.vue";
import {useMetricStore} from "~/store/store";
import {storeToRefs} from "pinia";

const store = useMetricStore()
const { dateMax, dateStart, dateEnd, table } = storeToRefs(store)

</script>

<template>
  <section class="settings">
    <div class="settings__tabs">
      <BaseTab @click="store.switchTable()">
        Таблица
      </BaseTab>

      <BaseTab @click="store.switchGraphics()">
        Графики
      </BaseTab>
    </div>
    <div class="settings__filter">
      <BaseInputDate :dateMax="dateEnd" v-model="dateStart" text="Начало" />
      <BaseInputDate :dateMax="dateMax.slice(0,10)" :dateMin="dateStart" v-model="dateEnd" text="Конец" />
    </div>
    <div class="settings__tabs__table">
      <BaseTab v-if="table" @click="store.switchGeneral()">
        Общая
      </BaseTab>
      <BaseTab v-if="table" @click="store.switchDevice()">
        Устройств
      </BaseTab>
    </div>
    <button class="settings__button text" @click="store.switchToSearch()">
      Показать
    </button>
  </section>
</template>

<style scoped lang="scss">
.settings {
  align-self: flex-start;
  display: grid;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  grid-template-columns: repeat(2,30%);

  &__tabs {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: adpval(15, 30);
    &__table{
      display: flex;
      align-items: center;
      gap: adpval(15, 30);
    }
  }

  &__filter {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__button{
    width: fit-content;
    justify-self: end;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: box-shadow .2s linear;
    &:hover{
      -webkit-box-shadow: 0 5px 10px 1px $shadow;
      -moz-box-shadow: 0 5px 10px 1px $shadow;
      box-shadow: 0 5px 10px 1px $shadow;
    }
  }
}
</style>
