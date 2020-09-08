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
            <textInput />
          </template>
        </div>
      </div>
    </div>
    <div class="app-movie-item-action">
      <button
        v-if="editMode !== movie._id"
        class="app-button__btn app-button__btn_primary"
        @click="changeItem(movie)"
      >
        {{ $t('global.edit') }}
      </button>
      <button
        v-else
        class="app-button__btn app-button__btn_primary"
        @click="saveItem(movie)"
      >
        {{ $t('global.save') }}
      </button>
      <button
        class="app-button__btn app-button__btn_cancel"
        @click="deleteMovie(movie._id)"
      >
        {{ $t('global.delete') }}
      </button>
    </div>
  </div>
</template>

<script>
import moviesApi from '@/api/movies/moviesApi';
import textInput from '@/components/elements/textInput';

export default {
  name: 'MovieItem',
  components: {
    textInput,
  },
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
    inputSettings() {
      return {
        labelText: '',
        typeInput: 'text',
      };
    },
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
    saveItem(movie) {
      this.editMode = -1;
      moviesApi.updateMovie(movie).then((resp) => {
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
  border: 1px solid $color-black;
  margin: 0 10px 20px 10px;
  max-width: 31%;
  height: 300px;

  &-action {
    display: flex;
    justify-content: space-around;
    padding: 20px;
  }

  &-content {

    .row {
      padding: 10px;
      display: flex;
      flex-direction: column;

      &__label {
        font-family: $font-global-medium;
      }

      &__text {

        input {
          margin-top: 5px;
          width: 100%;
        }
      }
    }
  }
}

</style>
