<script setup lang="ts">
import type {IVariables} from "~/interfaces/IVariables";
import ScreenIndex from "~/screens/index/ScreenIndex.vue";
definePageMeta({
  layout:'default'
})
const query = gql`
  query GetMetrics($input: GetMetricsInput!) {
      metrics(input: $input) {
        browser
        device
        duration
        id
        isNew
        visitTime
      }
    }
`
const variables:IVariables = {
  input: {
    dateStart: '2023-10-19',
    dateEnd: '2023-10-19'
  }
}
const { data } = await useAsyncQuery(query,variables);
console.log(data.value)
</script>

<template>
  <ScreenIndex />
</template>

<style scoped>

</style>
