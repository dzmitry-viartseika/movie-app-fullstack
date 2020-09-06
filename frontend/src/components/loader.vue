<template>
  <div class="app-loader">
    <div class="app-loader__elem"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style scoped lang="scss">
@import "../sass/variables";

  .app-loader {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 1000;

    &__elem {
      width: 28px;
      height: 28px;
      border: 4px solid transparent;
      border-top-color: $color-dodger-blue;
      border-bottom-color: $color-dodger-blue;
      border-radius: 50%;
      animation: loader-rotate 1s linear infinite;
      margin: -28px auto 0;
    }
  }

@keyframes loader-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
