<template>
  <div class="app-movie-item">
    {{ movie }}
  </div>
</template>

<script>
export default {
  name: 'MovieItem',
  props: {
    movie: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
@import "../sass/variables";

.app-movie-item {
  min-width: 33%;
  background: red;
}

</style>
