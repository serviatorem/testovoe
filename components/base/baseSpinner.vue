<script setup lang="ts">

</script>

<template>
  <div class="app-spinner__overlay" />
  <div class="app-spinner__icon" />
</template>

<style scoped lang="scss">
.app-spinner {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;

  &:focus {
    outline: none;
  }

  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: contain;
    animation: spinnerAnimation 0.6s infinite linear;
    background-image: url("/public/spinner/spinner-icon.svg");
  }

  &__overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(white, 0.7);
  }

  &--fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}

@keyframes spinnerAnimation {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

</style>
