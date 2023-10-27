<script setup lang="ts">
const props = defineProps<{
  dateMax?:string
  modelValue:string
  text?:string
}>()
const emit = defineEmits(['update:modelValue'])
const value = ref(props.modelValue);
watch(value, () =>{
  emit('update:modelValue',value.value)
})
</script>

<template>
  <label class="label">
    <span class="label__text text">{{ props.text }}</span>
    <input class="input text-mini" type="date" :max="props.dateMax" v-model="value"/>
  </label>
</template>

<style scoped lang="scss">
.label{
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2,1fr);
  gap:15px;
}
.input{
  border-radius: 5px;
  padding: 5px 10px;
}
</style>
