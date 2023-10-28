<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import {useMetricStore} from "~/store/store";
import {useMetricGraphStore} from "~/store/storeGraph";
import {storeToRefs} from "pinia";
import BaseSpinner from "~/components/base/baseSpinner.vue";

const error = ref<string>('')
const show = ref<boolean>(true)
const store = useMetricStore()
const storeGraph = useMetricGraphStore()
const {chartData, chartOptions} = storeToRefs(storeGraph)
await storeGraph.createChartGlobal()
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
watch([() => store.dateStart, () => store.dateEnd], async () => {
  show.value = false;
  error.value = await storeGraph.updateChartGlobal() ;
  show.value = true;
})
</script>

<template>
  <div class="graphGeneral">
    <div
        class="graphGeneral__line-wrapper"
        v-if="show"
    >
      <span class="graphGeneral__error text error">{{ error }}</span>
      <Line
          id="general-chart"
          :options="chartOptions"
          :data="chartData"
          class="graphGeneral__line"
      />
    </div>
    <BaseSpinner v-if="!show"/>
  </div>
</template>

<style scoped lang="scss">
.graphGeneral {
  position: relative;
  &__line{
    overflow-x: auto;
    max-width: 1200px;
    min-width: 700px;
    background: rgba(255,255,255,0.5);
    height: auto !important;
    width: 100% !important;
    aspect-ratio: 2/1;
  }
}
@media screen and (width < 800px){
  .graphGeneral{
    &__line{
      aspect-ratio: 1.5/1;
      &-wrapper{
        overflow-x: auto;
      }
    }
  }
}
</style>
