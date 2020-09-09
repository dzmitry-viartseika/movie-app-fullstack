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
            <textInput
              :value.sync="movieInfo.title"
              :autofocus="true"
              :typeInput="'text'"
              :class="{'error': $validator.errors.has('title')}"
              :errorStatus="$validator.errors.has('title')"
            >
            </textinput>
            <transition name="fade-el">
              <span
                v-if="$validator.errors.has('title')"
                class="app__validation"
              >
                {{ $validator.errors.first('title') }}
              </span>
            </transition>
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
            <textInput
              :value.sync="movieInfo.description"
              :typeInput="'text'"
              :class="{'error': $validator.errors.has('description')}"
              :errorStatus="$validator.errors.has('description')"
            >
            </textinput>
            <transition name="fade-el">
              <span
                v-if="$validator.errors.has('description')"
                class="app__validation"
              >
                {{ $validator.errors.first('description') }}
              </span>
            </transition>
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
            <textInput
              :value.sync="movieInfo.year"
              :typeInput="'text'"
              :class="{'error': $validator.errors.has('year')}"
              :errorStatus="$validator.errors.has('year')"
            >
              <textInput />
              <transition name="fade-el">
                <span
                  v-if="$validator.errors.has('year')"
                  class="app__validation"
                >
                  {{ $validator.errors.first('year') }}
                </span>
              </transition>
            </textinput>
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
import validationErrorMessage from '@/locales/validationErrorMessage';

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
  beforeMount() {
    const dict = {
      en: {
        custom: {
          title: {
            required: validationErrorMessage.en.inputRequired,
          },
          description: {
            required: validationErrorMessage.en.inputRequired,
          },
          year: {
            required: validationErrorMessage.en.inputRequired,
          },
        },
      },
      ru: {
        custom: {
          title: {
            required: validationErrorMessage.ru.inputRequired,
          },
          description: {
            required: validationErrorMessage.ru.inputRequired,
          },
          year: {
            required: validationErrorMessage.ru.inputRequired,
          },
        },
      },
    };
    this.$validator.localize(dict);
    this.$validator.attach({ name: 'title', rules: { required: true } });
    this.$validator.attach({ name: 'description', rules: { required: true } });
    this.$validator.attach({ name: 'year', rules: { required: true } });
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
      this.$validator.validateAll({
        title: this.movie.title,
        description: this.movie.description,
        year: this.movie.year,
      }).then((result) => {
        if (result) {
          moviesApi.updateMovie(movie).then(() => {
            this.editMode = -1;
          }).catch((e) => {
            console.log(e);
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../sass/variables";

.app-movie-item {
  min-width: 31%;
  border: 1px solid $color-cornflower-blue;
  margin: 0 10px 20px 10px;
  max-width: 31%;
  height: auto;
  border-radius: $borderRadius;
  box-shadow: 0 0 8px rgba($color-black, .8);

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
        margin-bottom: 5px;
      }

      &__text {

        position: relative;

        .app__validation {
          bottom: -3px;
        }

        input {
          margin-top: 5px;
          width: 100%;
        }
      }
    }
  }
}

</style>
