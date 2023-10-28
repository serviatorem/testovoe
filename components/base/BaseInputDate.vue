<script setup lang="ts">
const props = defineProps<{
  dateMax?:string
  dateMin?:string
  modelValue:string
  text?:string
}>()
const emit = defineEmits(['update:modelValue'])
const error = ref<string>('')
const value = ref(props.modelValue);
watch(value, () =>{
  if (value.value){
    error.value = ''
    emit('update:modelValue',value.value)
  }else{
    error.value = 'неверный ввод данных'
  }
})
</script>

<template>
  <label class="label">
    <span class="label__text text">{{ props.text}}</span>
    <input class="input text-mini" type="date" :max="props.dateMax" :min="props.dateMin" v-model="value"/>
  </label>
  <span class="text-mini error">{{error}}</span>
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
