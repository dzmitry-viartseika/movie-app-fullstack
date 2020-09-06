<template>
  <div class="app-movie-item">
    <div class="app-movie-item-content">
      <div class="row">
        <div class="row__label">
          {{ $t('global.titleFieild') }}
        </div>
        <div class="row__text">
          <template v-if="editMode !== movie._id">
            {{ movie.title }}
          </template>
          <template v-else>
            <input
              v-model="movieInfo.title"
              type="text"
            >
          </template>
        </div>
      </div>
      <div class="row">
        <div class="row__label">
          {{ $t('global.descriptionField') }}
        </div>
        <div class="row__text">
          <template v-if="editMode !== movie._id">
            {{ movie.description }}
          </template>
          <template v-else>
            <input
              v-model="movieInfo.description"
              type="text"
            >
          </template>
        </div>
      </div>
      <div class="row">
        <div class="row__label">
          {{ $t('global.year') }}
        </div>
        <div class="row__text">
          <template v-if="editMode !== movie._id">
            {{ movie.year }}
          </template>
          <template v-else>
            <input
              v-model="movieInfo.year"
              type="text"
            >
          </template>
        </div>
      </div>
    </div>
    <div class="app-movie-item-action">
      <button
        v-if="editMode !== movie._id"
        @click="changeItem(movie)"
      >
        {{ $t('global.edit') }}
      </button>
      <button
        v-else
        @click="saveItem(movie)"
      >
        {{ $t('global.save') }}
      </button>
      <button @click="deleteMovie(movie._id)">
        {{ $t('global.delete') }}
      </button>
    </div>
  </div>
</template>

<script>
import moviesApi from '@/api/movies/moviesApi';

export default {
  name: 'MovieItem',
  props: {
    movie: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      editMode: -1,
      movieInfo: {
        title: '',
        description: '',
        year: '',
      },
    };
  },
  computed: {
    moviesList: {
      get() {
        return this.$store.getters.moviesList;
      },
      set(data) {
        this.$store.dispatch('setMoviesList', data);
      },
    },
  },
  methods: {
    deleteMovie(id) {
      moviesApi.deleteMovie(id).then(() => {
        const index = this.moviesList.findIndex((el) => el._id === id);
        if (index !== -1) {
          this.moviesList.splice(index, 1);
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    changeItem(item) {
      this.editMode = item._id;
      this.movieInfo = item;
    },
    saveItem(item) {
      this.editMode = -1;
      moviesApi.updateMovie(item).then((resp) => {
        console.log('resp', resp.data);
      }).catch((e) => {
        console.log(e);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../sass/variables";

.app-movie-item {
  min-width: 31%;
  background: red;
  margin: 0 10px 20px 10px;
  max-width: 31%;
  height: 300px;
}

</style>
