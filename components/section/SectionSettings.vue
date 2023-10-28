<script setup lang="ts">
import BaseTab from "~/components/base/BaseTab.vue";
import BaseInputDate from "~/components/base/BaseInputDate.vue";
import {useMetricStore} from "~/store/store";
import {storeToRefs} from "pinia";

const store = useMetricStore()
const { dateMax, dateStart, dateEnd } = storeToRefs(store)
const newDateStart = ref(dateStart.value);
const newDateEnd = ref(dateEnd.value);
watch([() => store.dateStart,()=> store.dateEnd], ()=>{
    newDateStart.value = store.dateStart;
    newDateEnd.value = store.dateEnd;
})
</script>

<template>
  <section class="settings">
    <div class="settings__tabs">
      <NuxtLink to="/table/">
        <BaseTab>
        Таблица
      </BaseTab>
      </NuxtLink>

      <NuxtLink to="/graph">
        <BaseTab>
        Графики
      </BaseTab>
      </NuxtLink>
    </div>
    <div class="settings__filter">
      <BaseInputDate :dateMax="newDateEnd" v-model="newDateStart" text="Начало" />
      <BaseInputDate :dateMax="dateMax.slice(0,10)" :dateMin="newDateStart" v-model="newDateEnd" text="Конец" />
      <button class="settings__button text" @click="store.newDate(newDateStart,newDateEnd)">
        Показать
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.settings {
  align-self: flex-start;
  display: grid;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  grid-template-columns: repeat(2,1fr);

  &__tabs {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: adpval(15, 30);
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
@media screen and (width < 700px){
  .settings{
    align-self: center;
    grid-template-columns: 1fr;
    gap:30px 0;
    align-items: center;
  }
}
</style>
