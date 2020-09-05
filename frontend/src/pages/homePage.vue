<template>
  <div class="app-main">
    <headerTemplate />
    <moviesList :movies="movies" />
  </div>
</template>

<script>
import headerTemplate from '@/components/headerTemplate';
import moviesList from '@/components/moviesList';

export default {
  name: 'HomePage',
  components: {
    headerTemplate,
    moviesList,
  },
  data() {
    return {
      movies: [
        {
          id: 1,
          text: 1,
        },
        {
          id: 2,
          text: 2,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "../sass/variables";

  .app-main {
    width: 100%;
  }
</style>
