<script setup lang="ts">
const props = defineProps<{
  text?:string | number | boolean,
  border?:'right' | 'left' | 'bottom' | 'top'
}>()
</script>

<template>
  <div class="tableItem" :class="props.border">
    <p class="tableItem__text text" v-if="props.text">{{ props.text }}</p>
  </div>
</template>

<style scoped lang="scss">
  .tableItem{
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    background: rgba(255,255,255,0.5);
    border: 2px solid $violet;
    &__text{
      color:$violet;
    }
  }
  .right{
    border-right: none;
  }
  .left{
    border-left: none;
  }
  .top{
    border-top: none;
  }
  .bottom{
    border-bottom: none;
  }
</style>
