<template>
  <div class="app-movies-list">
    <div class="app__container">
      <div class="app-movies-list__title">
        IMDB {{ $t('moviesList.top') }} 250
      </div>
      <div
        class="app-movies-list__row"
      >
        <movieItem
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script>
import movieItem from '@/components/movieItem';
import moviesApi from '@/api/movies/moviesApi';

export default {
  name: 'MoviesList',
  components: {
    movieItem,
  },
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
  },
  beforeMount() {
    moviesApi.getMoviesList().then((resp) => {
      console.log('resp', resp.data);
    }).catch((e) => {
      console.log(e);
    });
  },
};
</script>

<style scoped lang="scss">
@import "../sass/variables";

  .app-movies-list {
    padding-top: 30px;

    &__row {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
    }

    &__title {
      font-size: 40px;
      color: $color-black;
    }
  }
</style>
