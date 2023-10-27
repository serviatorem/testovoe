<script setup lang="ts">

</script>

<template>
  <button class="button text">
    <slot />
  </button>
</template>

<style scoped lang="scss">
  .button{
    outline: none;
    padding: adpval(5, 10) adpval(10,15);
    border: 1px solid $lightGrey;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color, color .2s linear;
    &:hover{
      background: $violet;
      color:$lightGrey;
    }
  }
</style>
